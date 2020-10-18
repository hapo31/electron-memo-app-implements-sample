const { BrowserWindow, app, Menu, dialog, ipcMain } = require("electron");
const fs = require("fs");

class MemoApp {
  constructor() {

    const menu = Menu.buildFromTemplate([
      {
        label: "ファイル",
        submenu: [
          {
            label: "ファイルを開く...",
            click: (window) => {
              dialog.showOpenDialog(window, {
                title: "ファイルを開く",
                defaultPath: "."
              }).then(({ canceled, filePaths }) => {
                console.log({ canceled, filePaths });
                if (!canceled) {
                  const [ path ] = filePaths;
                  const buffer = fs.readFileSync(path);
                  const content = buffer.toString("utf-8");
                  this.mainWindow.webContents.send("LOAD_FILE", content);
                }
              })
            }
          }
        ]
      }
    ]);


    this.onReady = () => {

      this.mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
        }
      });

      this.mainWindow.setMenu(menu);

      const mainURL = `file://${__dirname}/index.html`;

      this.mainWindow.loadURL(mainURL);
      this.mainWindow.webContents.openDevTools();

    }

    this.onWindowAllClosed = () => {
      app.quit();
    }

    app.on("ready", this.onReady);
    app.on("window-all-closed", this.onWindowAllClosed);

  }
}

new MemoApp();
