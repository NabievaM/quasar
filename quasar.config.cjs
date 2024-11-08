// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require("quasar/wrappers");
const create = async () => {
  const { create } = await import("./src-ssr/server.js");
  return create;
};

module.exports = configure(function (/* ctx */) {
  return {
    // Prefetch feature
    preFetch: true,

    // Boot files
    boot: ["pinia", "axios"],

    // CSS files
    css: ["app.scss", "tailwind.css"],

    // Extra icons
    extras: [
      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // Build options
    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node20",
      },
      vueRouterMode: "history",
      vitePlugins: [
        [
          "vite-plugin-checker",
          {
            eslint: {
              lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
      ],
    },

    // Development server options
    devServer: {
      open: true, // Automatically opens the browser
    },

    // Quasar framework options
    framework: {
      config: {},
      plugins: [],
    },

    animations: [],

    // SSR options
    ssr: {
      serverMiddleware: [{ path: "/api", handler: create() }],
      pwa: false,
      prodPort: 3000,
      middlewares: ["render"],
      manualStoreHydration: true,
    },

    // PWA configuration
    pwa: {
      workboxMode: "generateSW",
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
    },

    // Capacitor configuration
    capacitor: {
      hideSplashscreen: true,
    },

    // Electron configuration
    electron: {
      inspectPort: 5858,
      bundler: "packager",
      packager: {},
      builder: {
        appId: "store-finder-quasar",
      },
    },

    // BEX (browser extension) configuration
    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
