const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "src/renderer.js"),
    },
  });

  win.loadFile("src/index.html");
}

app.whenReady().then(() => {
  createWindow();
});
