import { app, BrowserWindow, screen } from "electron";
import path from "path";

let towerWindow;
let isClosed = false;

/** When user requested for quiting application, close the windows to save resources */
app.on("quit", () => {
  if (towerWindow && !isClosed) {
    towerWindow.close();
    isClosed = true;
    towerWindow = undefined;
  }
});

/**
 * Show the tower on the pre-defined location passed in the options parameter
 *
 * @param options Location and width configuration for the window
 * @return {Promise<BrowserWindow>}
 */
export async function openBlitzitTower(options) {
  const screenSize = screen.getPrimaryDisplay().bounds;
  if (typeof towerWindow === "undefined" || towerWindow.isDestroyed()) {
    towerWindow = new BrowserWindow({
      title: "BlitzTower",
      width: options.width,
      height: screenSize.height,
      x: options.x,
      y: options.y - 25,
      type: "toolbar",
      alwaysOnTop: true,
      resizable: false,
      skipTaskbar: false,
      frame: false,
      transparent: true,
      roundedCorners: false,
      hasShadow: false,
      acceptFirstMouse: true,
      webPreferences: {
        enableRemoteModule: false,
        preload: path.resolve(__dirname, "common.js"),
        nodeIntegrationInSubFrames: false,
        nodeIntegrationInWorker: false,
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    towerWindow.hide();
    towerWindow.setAlwaysOnTop(true, "screen-saver");
    towerWindow.addListener("closed", () => {
      isClosed = true;
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await towerWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#tower`);
      if (!process.env.IS_TEST) towerWindow.webContents.openDevTools({ mode: "undocked" });
    } else {
      await towerWindow.loadURL("app://./index.html/#/tower");
    }
  }

  // Show the window on the fixed location
  const mainWindow = BrowserWindow.fromId(1);
  if (mainWindow) mainWindow.minimize();
  towerWindow.show();
  return towerWindow.id;
}
