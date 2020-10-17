const { BrowserWindow, app } = require("electron");

class MemoApp {
   constructor() {
    this.onReady = () => {

      this.mainWindow = new BrowserWindow();

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
