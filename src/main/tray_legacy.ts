import { dialog, Tray, Menu } from 'electron';
import path from 'path';

export const createTray = (icon16Path, mainWindow) => {
  const tray = new Tray(icon16Path);
  tray.on("click", () => {
    mainWindow.show();
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("This is my application");
  tray.setTitle("This is my title");

  mainWindow.on("close", async (event) => {
    event.preventDefault();
    const result = await dialog.showMessageBox(mainWindow, {
      type: "question",
      buttons: ["保持后台运行", "关闭"],
      defaultId: 0,
      title: "关闭窗口",
      message: "您想要将应用程序保持在后台运行还是关闭？",
    });
    console.log(result)
    result.response ? mainWindow.destroy() : mainWindow.hide();
  });
};
