// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  nativeImage,
} from 'electron';
// import { setCustomTitlebar } from './titlebar';

// window.addEventListener("DOMContentLoaded", () =>{
// 	ipcRenderer.on("icon", (event, imageAsBase64) => {
// 		const icon = nativeImage.createFromDataURL(imageAsBase64);
// 		setCustomTitlebar(icon);
// 	})
// })

// export type Channels = 'ipc-example';

// const electronHandler = {
//   ipcRenderer: {
//     sendMessage(channel: Channels, ...args: unknown[]) {
//       ipcRenderer.send(channel, ...args);
//     },
//     on(channel: Channels, func: (...args: unknown[]) => void) {
//       const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
//         func(...args);
//       ipcRenderer.on(channel, subscription);

//       return () => {
//         ipcRenderer.removeListener(channel, subscription);
//       };
//     },
//     once(channel: Channels, func: (...args: unknown[]) => void) {
//       ipcRenderer.once(channel, (_event, ...args) => func(...args));
//     },
//   },
// };

// contextBridge.exposeInMainWorld('electron', electronHandler);
// export type ElectronHandler = typeof electronHandler;

const electronHandler = {
  setTitle: (title: String) => ipcRenderer.send('set-title', title),
  handleCounter: (func: (event: any, counter: number) => void) => {
    ipcRenderer.on('update-counter', func);
  },
  openFile: () => ipcRenderer.invoke('open-file'),
}


contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler;
