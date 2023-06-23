import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, Button, Stack } from '@mui/material';
import App from './App';
import TitleBar from './TitleBar';
import Editor from './Editor';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const handleClick = async () => {
  // console.log(1);
  const filePath = await window.electron.openFile();
  console.log(filePath);
};



root.render(
  <StrictMode>
    <CssBaseline enableColorScheme />
    <Stack height="100vh">
      <TitleBar />
      <Editor />
    </Stack>
    {/* <Editor code='12'/> */}
    {/* <Button id='open-file' onclick={handleClick}>Open File</Button> */}
    {/* <Pdf url='compressed.tracemonkey-pldi-09.pdf'/> */}
  </StrictMode>
);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

window.electron.setTitle('Hello from preload');
window.electron.handleCounter((event, value: number) => {
  console.log(value);
  event.sender.send('counter-value', value + 1);
});

// window.addEventListener('DOMContentLoaded', async () => {
//   const filePath = await window.electron.openFile();
//   console.log(filePath);
// });
