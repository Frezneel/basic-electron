const { app, BrowserWindow, Menu} = require('electron');
const AutoLaunch = require('auto-launch');

let mainWindow;

const autoLauncher = new AutoLaunch({
  name: app.getName(),
  path: app.getPath('exe')
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For Electron v12+ you need to disable contextIsolation
      enableRemoteModule: true // Enable remote module if needed
    }
  });

  win.loadFile('renderer/index.html');
}

function createMenu() {
  const template = [{
    label: 'Auto Launch',
    submenu: [
      {
        label: 'Enable Auto Launch',
        type: 'checkbox',
        click: (menuItem) => {
          if(menuItem.checked){
            autoLauncher.enable();
          } else{
            autoLauncher.disable();
          }
        },
        checked: autoLauncher.isEnabled()
      }
    ]
  }];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', () =>{
  createWindow();
  createMenu();
  // const autoLauncher = new AutoLaunch({
  //   name: app.getName(),
  //   path: app.getPath('exe')
  // })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
