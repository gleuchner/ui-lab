const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron')

let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});


ipcMain.on('relaunch-message', (event, arg) => {
    app.relaunch();
    app.quit();
});

ipcMain.on('quit-message', (event, arg) => {
    app.quit();
});

ipcMain.on('border-message', (event, arg) => {

    // Create the browser window using the BrowserWindow Module.
    mainWindow = new BrowserWindow({width: 350, height: 400, frame:true});

    // disable the menu
    mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/app/views/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

    // Create the browser window using the BrowserWindow Module.
    mainWindow = new BrowserWindow({width: 350, height: 400, frame:false});

    // disable the menu
    mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/app/views/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
