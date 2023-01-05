import { ipcMain, BrowserWindow, screen, shell, app } from "electron";
ipcMain.handle("common:openWindow", (event,options) => {
console.log(options);
});
