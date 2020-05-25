// Desktop application
// For browser application, see src/main.js

const { app, BrowserWindow, shell } = require("electron")

app.whenReady().then(() => {
  const win = new BrowserWindow({
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.maximize()
  win.loadFile("./public/desktop.html")

  win.webContents.on("did-fail-load", () => {
    win.loadFile("./public/desktop.html")
  })

  win.webContents.on("new-window", (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  });
})

app.on("window-all-closed", () => {
  app.quit()
})