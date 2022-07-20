const { app, BrowserWindow, screen } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow;
let presentationWindow;


function createMainWindow(display) {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        x: display != undefined ? display.bounds.x : 0,
        y: display != undefined ? display.bounds.y : 0,
        frame: false,
        icon: path.join(__dirname, "../assets/microphone.png"),
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(
        url.format({
            // pathname: path.join(__dirname, `index.html`),
            pathname: "localhost:4200/admin",
            protocol: "http:",
            slashes: true
        })
    );

    mainWindow.maximize();

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

function createPresentationWindow(display) {

    let config = {
        width: 800,
        height: 600,
        frame: false,
        icon: path.join(__dirname, "../assets/microphone.png"),
        webPreferences: {
            nodeIntegration: true
        }
    };

    console.log(display.bounds);

    let bounds = JSON.parse(JSON.stringify(display.bounds));
    bounds.width += 1;
    bounds.height += 1;

    presentationWindow = new BrowserWindow(config);
    presentationWindow.setBounds(bounds)
    presentationWindow.loadURL(
        url.format({
            // pathname: path.join(__dirname, `index.html`),
            pathname: "localhost:4200/projection",
            protocol: "http:",
            slashes: true
        })
    );

    // presentationWindow.webContents.openDevTools();


    presentationWindow.on('closed', function () {
        presentationWindow = null
    });
}


function onAppReady() {

    let primaryDisplay = screen.getPrimaryDisplay();
    let displays = screen.getAllDisplays();

    console.log("primary display", primaryDisplay);
    createMainWindow(primaryDisplay);

    if (displays.length > 1) {


        let secondDisplay = displays.find((display) => {
            return display.id != primaryDisplay.id;
        });

        if (secondDisplay != undefined) {
            console.log("presentation display", secondDisplay);
            createPresentationWindow(secondDisplay);
        }
    }


}

app.on('ready', onAppReady)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) onAppReady()
})