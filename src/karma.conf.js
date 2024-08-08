module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-coverage"),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false,
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      subdir: ".",
      reporters: [
        {
          type: "lcov",
          subdir: "reportes",
        },
        {
          type: "html",
          subdir: "html-report",
        },
      ],
      fixWebpackSourcePaths: true,
      check: {
        global: {
          excludes: ["src/app/domain/**/*.ts"],
        },
      },
      exclude: ["src/app/domain/**/*.ts"],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: true,
    restartOnFileChange: true,
  });
};
