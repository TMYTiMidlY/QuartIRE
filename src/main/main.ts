/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  session,
  nativeImage,
  protocol,
  dialog,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
// import {
//   setupTitlebar,
//   attachTitlebarToWindow,
// } from 'custom-electron-titlebar/main';
// import { createTray } from './tray';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// ipcMain.on('ipc-example', async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  // const installer = require('electron-devtools-installer');
  // const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  // const extensions = ['REACT_DEVELOPER_TOOLS'];

  // return installer
  //   .default(
  //     extensions.map((name) => installer[name]),
  //     forceDownload
  //   )
  //   .catch(console.log);
  return session.defaultSession.loadExtension(
    'C:/Users/15863/AppData/Roaming/ReactDevTools'
  );
};

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const icon = nativeImage.createFromPath(getAssetPath('icon.ico'));

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    // titleBarOverlay: {
    //   color: '#2f3241',
    //   symbolColor: '#fff',
    // },
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  if (isDebug) {
    await installExtensions();
  }

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // Add icons and context menus to the system's notification area.
  // createTray(icon, mainWindow);

  // When dom content loaded, send the icon to the renderer process.
  mainWindow.webContents.on('did-finish-load', () => {
    // mainWindow?.webContents.send('icon', icon.toDataURL());
    mainWindow?.webContents.send('update-counter', 1);
  });

  ipcMain.on('set-title', (event, title) => {
    console.log(title);
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.setTitle(title);
  });

  ipcMain.on('counter-value', (_event, counter) => {
    console.log(counter);
  });

  ipcMain.handle('open-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
    });
    if (!canceled) {
      return filePaths[0];
    }
  });

  const cachePath = app.getPath('temp');
  console.log(cachePath);


  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('open-url', (event, url) => {
//   event.preventDefault();
//   console.log(url);
// });
// console.log(app.setAsDefaultProtocolClient('qtire'));

// protocol.registerSchemesAsPrivileged([
//   {
//     scheme: 'qtire',
//     privileges: {
//       standard: true,
//       secure: true,
//       allowServiceWorkers: true,
//       supportFetchAPI: true,
//       corsEnabled: true,
//     },
//   },
// ]);

// const additionalData = { myKey: 'myValue' };
// const gotTheLock = app.requestSingleInstanceLock(additionalData);

// if (!gotTheLock) {
//   app.quit();
// } else {
//   app.on(
//     'second-instance',
//     (event, commandLine, workingDirectory, additionalData) => {
//       // 输出从第二个实例中接收到的数据
//       console.log(event);
//       console.log(commandLine);
//       console.log(workingDirectory);
//       console.log(additionalData);

//       // 有人试图运行第二个实例，我们应该关注我们的窗口
//       if (mainWindow) {
//         if (mainWindow.isMinimized()) {
//           mainWindow.restore();
//         }
//         mainWindow.focus();
//       }
//     }
//   );

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  })
  .catch(console.log);
// }
