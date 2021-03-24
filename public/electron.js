const { app, BrowserWindow } = require('electron');
require('./electron/main');

const path = require('path');
const isDev = require('electron-is-dev');

const Startup = require('./electron/utils/startup');
const Shutdown = require('./electron/utils/shutdown');
const startup = new Startup();
const shutdown = new Shutdown();

let mainWindow;

function createWindow() {
    startup.init().then((dims) => {
        const windowConfig = {
            width: dims.width,
            height: dims.height,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'preload.js')
            }
        };
        if (dims.x) windowConfig.x = dims.x;
        if (dims.y) windowConfig.y = dims.y;
        mainWindow = new BrowserWindow(windowConfig);
        mainWindow.loadURL(
            isDev
                ? 'http://localhost:3000'
                : `file://${path.join(__dirname, '../build/index.html')}`
        );
        mainWindow.setMenu(null);
        mainWindow.on('close', () => {
            shutdown.storeBounds(mainWindow.getBounds())
            .then(() => {
                mainWindow = null;
            })
            .catch((error) => {
                console.log(error);
                mainWindow = null;
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin' ) {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


