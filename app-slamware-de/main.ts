import { app, BrowserWindow, screen, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import * as url from 'url';

let windowAdmin: BrowserWindow = null;
let windowPresentation: BrowserWindow = null;



const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createPresentationWindow() {
  let presentationScreen = screen.getAllDisplays().length > 1 ? screen.getAllDisplays().find(m => m.id != screen.getPrimaryDisplay().id) : screen.getPrimaryDisplay();

  windowPresentation = new BrowserWindow({
    x: presentationScreen.bounds.x,
    y: presentationScreen.bounds.y,
    fullscreen: true,
    width: presentationScreen.bounds.width,
    height: presentationScreen.bounds.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  windowPresentation.setMenuBarVisibility(false);

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    windowPresentation.loadURL('http://localhost:4200#/presentation');
  } else {
    windowPresentation.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html#/presentation'),
      protocol: 'file:',
      slashes: true
    }));
  }

  windowPresentation.webContents.on('did-finish-load', () => {
    console.log("window loaded");
    windowPresentation.webContents.send('updateData','This is a test');
  });

  if (serve) {
    windowPresentation.webContents.openDevTools();
  }
}

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  windowAdmin = new BrowserWindow({
    titleBarStyle: 'hidden',
    frame: false,
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    windowAdmin.loadURL('http://localhost:4200');
  } else {
    windowAdmin.loadURL(url.format({
      pathname: 'index.html',
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    windowAdmin.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  windowAdmin.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    windowAdmin = null;
  });

  windowAdmin.setMenuBarVisibility(false);

  windowAdmin.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  autoUpdater.on('update-available', () => {
    windowAdmin.webContents.send('update_available');
  });
  
  autoUpdater.on('update-downloaded', () => {
    windowAdmin.webContents.send('update_downloaded');
  });


  return windowAdmin;
}

function appReady() {
  console.log("path");
  console.log(path);

  createWindow();

  // if (screen.getAllDisplays().length > 1) {
  //   createPresentationWindow();
  // }

  // ipcMain.on('openPresentation', (event, arg) => {
  //   if ( !windowPresentation ) {
  //     createPresentationWindow();
  //   }
  // });

  ipcMain.on('updateData', (event, arg) => {

    console.log(arg);

    if (windowPresentation) {
      windowPresentation.webContents.send("updateData", arg);
    } else {
      console.log("presentation window closed");
    }
  });

  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });



}


try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', appReady);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (windowAdmin === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
