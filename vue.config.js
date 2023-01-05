const { defineConfig } = require("@vue/cli-service");
const { EnvironmentPlugin } = require("webpack");

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      preload: {
        common: "electron/preloads/common.js",
      },
      mainProcessFile: "electron/background.js",
      builderOptions: {
        appId: "com.blitzit.app",
        productName: "Blitzit",
        artifactName: "${productName}-v${version}.${ext}",
        win: {
          target: ["nsis"],
        },
        linux: {
          target: ["AppImage"],
          category: "Utility",
        },
        mac: {
          target: ["dmg"],
          icon: "electron/build-rsrc/icon.png",
        },
        dmg: {
          title: "Install ${productName} v${version}",
        },
        publish: {
          provider: "github",
          repo: "desktop-releases",
          owner: "blitzit-hq",
          vPrefixedTagName: true,
          private: false,
          releaseType: "release",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("process.env").use(EnvironmentPlugin);
  },
  transpileDependencies: true,
  lintOnSave: false,
});
