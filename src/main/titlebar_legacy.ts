import { NativeImage } from 'electron';

const { TitlebarColor, Titlebar } = require('custom-electron-titlebar');
const path = require('path');

export const setCustomTitlebar = (icon: NativeImage) => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type] as string);
  }
  // eslint-disable-next-line no-new
  new Titlebar({
    backgroundColor: TitlebarColor.fromHex('#6538b9'),
    overflow: 'auto', // hidden | visible | auto
    icon,
    iconSize: 20, // between 16 and 24
    titleHorizontalAlignment: 'left', // left | center | right
    tooltips: {
      minimize: '',
      maximize: '',
      restoreDown: '',
      close: '',
    },
    // icons: path.resolve("example/assets", "icons.json"),
    menuPosition: 'bottom',
    // enableMnemonics: false,
  });
};
