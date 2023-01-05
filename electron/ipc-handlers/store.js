import Store from "electron-store";
import { app, BrowserWindow, ipcMain } from "electron";

const store = new Store({
  name: app.getName().toLowerCase(),
  fileExtension: "conf",
});

store.onDidAnyChange((newConfig) => {
  for (const browser of BrowserWindow.getAllWindows()) {
    browser.webContents.send("store:syncConfig", newConfig);
  }
});

ipcMain.handle("store:setConfig", function (_event, key, value) {
  if (["function", "symbol"].includes(typeof value)) {
    throw new Error(`Invalid typeof value: ${typeof value}`);
  }

  if (typeof key !== "string") {
    throw new Error("key must be string");
  }

  if (typeof value === "undefined") {
    store.delete(key);
  } else {
    store.set(key, value);
  }
});

ipcMain.handle("store:getConfig", function (_event, key, defaultValue) {
  if (typeof key !== "string") {
    throw new Error("key must be string");
  }

  if (["function", "symbol"].includes(typeof defaultValue)) {
    throw new Error(`Invalid typeof defaultValue: ${typeof defaultValue}`);
  }

  return store.get(key, defaultValue);
});
