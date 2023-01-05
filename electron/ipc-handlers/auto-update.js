import { autoUpdater } from "electron-updater";
import { ipcMain } from "electron";

ipcMain.handle("autoUpdate:apply", () => {
  autoUpdater.quitAndInstall(true, true);
});
