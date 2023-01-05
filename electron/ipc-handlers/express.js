import { BrowserWindow, ipcMain } from "electron";
import { getPortPromise } from "portfinder";
import express from "express";

const app = express();
/** @type {import("http").Server} */
let server;

app.get("/", async (req, res) => {
  const host = req.header("host");
  const url = req.url.replace(/^\//, "");

  // noinspection JSUnresolvedVariable
  /** @type {"magic-link"|"password-reset"|"verify-email"} */
  const action = req.query.blitzaction;

  if (!["magic-link", "password-reset", "verify-email"].includes(action)) {
    return res.send('<html lang="en"><script>window.close()</script></html>');
  }

  let _ = action.split("-");
  _[1] = _[1][0].toUpperCase() + _[1].slice(1);

  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send("auth:" + _.join(""), `http://${host}/${url}`);
  }

  res.send('<html lang="en"><script>window.close()</script></html>');
  server.close();
});

ipcMain.handle("express:start", async () => {
  const port = await getPortPromise({ host: "localhost" });
  server = app.listen(port);
  return port;
});
