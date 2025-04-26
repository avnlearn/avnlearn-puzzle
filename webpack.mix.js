// webpack.mix.js

let mix = require("laravel-mix");

mix.setPublicPath("avn_puzzle/static/assets");
mix
  .typeScript("src/app_sudoku.ts", "js")
  .typeScript("src/app_wordsearch.ts", "js")
  .typeScript("src/app_randmath.ts", "js")
  .postCss("src/css/style.css", "css", [require("@tailwindcss/postcss")()]);
mix.browserSync({
  proxy: "127.0.0.1:8080",
  files: [
    "src/**/*.css",
    "avn_puzzle/**/*.tpl",
    "avn_puzzle/**/*.html",
    "avn_puzzle/**/*.py",
  ],
  watch: true,
  browser: ["firefox"],
  // https : true
});
