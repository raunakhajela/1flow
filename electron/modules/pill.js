import { app, BrowserWindow } from "electron";
import path from "path";

let pillWindow;
let isPillClosed = false;

/** When user requested for quiting application, close the windows to save resources */
app.on("quit", () => {
  if (pillWindow && !isPillClosed) {
    pillWindow.close();
    isPillClosed = true;
    pillWindow = undefined;
  }
});

/**
 * Show the task pill on the screen
 *
 * @param options Location and width configuration for the window
 * @return {Promise<BrowserWindow>}
 */
export async function openBlitzitPill() {
  if (typeof pillWindow === "undefined" || pillWindow.isDestroyed()) {
    pillWindow = new BrowserWindow({
      title: "BlitzPill",
      width: 300,
      height: 50,
      type: "toolbar",
      alwaysOnTop: true,
      resizable: false,
      skipTaskbar: false,
      frame: false,
      center: true,
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
    pillWindow.hide();
    pillWindow.setAlwaysOnTop(true, "screen-saver");
    pillWindow.addListener("closed", () => {
      isPillClosed = true;
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await pillWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#taskpill`);
      if (!process.env.IS_TEST) pillWindow.webContents.openDevTools({ mode: "undocked" });
    } else {
      await pillWindow.loadURL("app://./index.html/#/taskpill");
    }
  }

  // Show the window on the fixed location
  pillWindow.show();
}
