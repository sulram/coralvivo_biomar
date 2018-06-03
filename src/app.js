import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

import Store from './scripts/store'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

global.screensaver_seconds = 120;
global.store = new Store({
  configName: 'settings',
  defaults: process.platform == "win32" ? {
      "dataPath": "D:/Documentos/GitHub/coralvivo_biomar/data/",
      "uLogoPath": "D:/CORALVIVO_BIOMAR_FILES/LOGOS/",
      "pGalleryPath": "D:/CORALVIVO_BIOMAR_FILES/FOTOS_PROJETOS/",
      "uGalleryPath": "D:/CORALVIVO_BIOMAR_FILES/FOTOS_UCS/",
      "pGeoPath": "D:/CORALVIVO_BIOMAR_FILES/KMZ_PROJETOS/",
      "uGeoPath": "D:/CORALVIVO_BIOMAR_FILES/KMZ_UCS/",

      "screensaver_seconds": 100
  }
  : {
      "dataPath": "/Users/marlus/Documents/coralvivo_biomar/data/",
      "uLogoPath": "/Users/marlus/Documents/CORALVIVO_FILES/LOGOS/",
      "pGalleryPath": "/Users/marlus/Documents/CORALVIVO_FILES/FOTOS_PROJETOS/",
      "uGalleryPath": "/Users/marlus/Documents/CORALVIVO_FILES/FOTOS_UCS/",
      "pGeoPath": "/Users/marlus/Documents/CORALVIVO_FILES/KMZ_PROJETOS/",
      "uGeoPath": "/Users/marlus/Documents/CORALVIVO_FILES/KMZ_UCS/",

      "screensaver_seconds": 120
  }
});


if (isDevMode) enableLiveReload();

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    //kiosk: true
  });

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(VUEJS_DEVTOOLS);
    //mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
//app.on('window-all-closed', () => {
app.on('window-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


