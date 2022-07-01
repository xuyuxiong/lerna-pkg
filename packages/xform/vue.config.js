const path = require("path");
const config = {
  publicPath: "./",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 200 * 1024 }));
  },
  configureWebpack: {
    externals:
      process.env.NODE_ENV === "development"
        ? {}
        : [
            function (ctx, request, callback) {
              const match = (pkgs) => {
                for (const pkg of pkgs) {
                  const re = new RegExp(`^${pkg}`);
                  if (re.test(request)) {
                    callback(null, request, "commonjs");
                    return true;
                  }
                }
              };
              if (
                !match(["vant", "axios", "core-js", "x-design-vue", "dayjs"])
              ) {
                callback();
              }
            },
          ],
  },
};

if (process.env.NODE_ENV === "development") {
  config.chainWebpack = (config) => {
    config
      .entry("app")
      .clear()
      .add(path.resolve(__dirname, "src/main.js"))
      .end();
    config.plugin("html").tap((args) => {
      args[0].template = path.resolve(__dirname, "public/index.html");
      return args;
    });
  };
}

module.exports = config;
