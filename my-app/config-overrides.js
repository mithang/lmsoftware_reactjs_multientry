// myapp/config_overrides.js

/* global require, __dirname, process */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const getPublicUrlOrPath = require("react-dev-utils/getPublicUrlOrPath");
const appPackagePath = path.resolve(__dirname, "package.json");
const appPackageJson = require(appPackagePath);
const appBuild = path.resolve(__dirname, "./build/");
const appSrc = path.resolve(__dirname, "src/");
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  require(appPackagePath).homepage,
  process.env.PUBLIC_URL
);

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    const isEnvDevelopment = env === "development";
    const isEnvProduction = env === "production";

    config.entry = {
      trade: [
        isEnvDevelopment &&
          require.resolve("react-dev-utils/webpackHotDevClient"),
        path.resolve(__dirname, "src/trade/index.js")
      ].filter(Boolean),
      rate: [
        isEnvDevelopment &&
          require.resolve("react-dev-utils/webpackHotDevClient"),
        path.resolve(__dirname, "src/rate/index.js")
      ].filter(Boolean)
    };

    config.output = {
      path: isEnvProduction ? appBuild : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDevelopment && "static/js/[name].bundle.js",
      futureEmitAssets: true,
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDevelopment && "static/js/[name].chunk.js",
      publicPath: publicUrlOrPath,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path.relative(appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      globalObject: "this"
    };

    // NOTE: it is necessary to remove default ManifestPlugin
    config.plugins = config.plugins.filter(
      p => !/ManifestPlugin/.test(p.constructor)
    );

    config.plugins = [
      ...config.plugins,
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ["trade"],
        template: path.resolve(__dirname, "public/trade.html"),
        filename: "trade.html"
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ["rate"],
        template: path.resolve(__dirname, "public/rate.html"),
        filename: "rate.html"
      }),
      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          const entrypointFiles = {};
          Object.keys(entrypoints).forEach(entrypoint => {
            entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(
              fileName => !fileName.endsWith(".map")
            );
          });

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles
          };
        }
      })
    ];
    return config;
  },

  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.historyApiFallback = {
        disableDotRule: true,
        rewrites: [
          { from: /^\/trade.html/, to: "/build/trade.html" },
          { from: /^\/rate.html/, to: "/build/rate.html" }
        ]
      };
      return config;
    };
  }
};