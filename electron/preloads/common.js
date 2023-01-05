const {
  /** @type {import("electron").IpcRenderer} */
  ipcRenderer,
  /** @type {import("electron").ContextBridge} */
  contextBridge,
} = require("electron");

const callbacks = {
  storeConfig: [],
};
ipcRenderer.on("store:syncConfig", (event, config) => {
  for (const callback of callbacks.storeConfig) {
    callback(config);
  }
});
/** Configure auto update apply **/
contextBridge.exposeInMainWorld("applyUpdate", () => {
  return ipcRenderer.invoke("autoUpdate:apply");
});

contextBridge.exposeInMainWorld("getCurrentVersion", () => {
  return ipcRenderer.invoke("common:appVersion");
});

contextBridge.exposeInMainWorld("onUpdateAvailable", (cb) => {
  ipcRenderer.on("autoUpdate:updateAvailable", (_e, version) => cb(version));
});

/** Configure the firebase config on the main process */


contextBridge.exposeInMainWorld("setElectronStoreKey", (key, value) => {
  return ipcRenderer.invoke("store:setConfig", key, value);
});

contextBridge.exposeInMainWorld("getElectronStoreKey", async (key) => {
  return await ipcRenderer.invoke("store:getConfig", key).then((v) => v);
});

contextBridge.exposeInMainWorld("listenElectronStore", (callback) => {
  if (typeof callback !== "function") {
    throw new Error("callback must of callable type");
  }
  callbacks.storeConfig.push(callback);
});

/** Open Blitzit Tower */
contextBridge.exposeInMainWorld("openTower", () => {
  return ipcRenderer.invoke("common:openWindow","data");
});
contextBridge.exposeInMainWorld("conteentR", {ping:()=>ipcRenderer.invoke('ping')});

/** Open Blitzit Tower */

