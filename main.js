// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const ipc = require('electron').ipcMain;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    //autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('./view/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //windowReady();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() });


ipc.on('showOpenDialog', function (event, data) {

  const getFiles = async () => {
    const result = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
    event.sender.send('showOpenDialog-result', result);
  }
  getFiles();
});

ipc.on('showSaveOpenDialog', function (event, data) {

  const getFiles = async () => {
    const result = await dialog.showOpenDialog();
    event.sender.send('showSaveOpenDialog-result', result);
  }
  getFiles();
});