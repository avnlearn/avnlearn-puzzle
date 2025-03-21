// webpack.mix.js

let mix = require('laravel-mix');

mix.typeScript('src/js/wordsearch.ts', "public/js");
mix.typeScript('src/js/sudoku.ts', "public/js");
// mix.postCss('src/css/style.css', "public/css", [
//     require("@tailwindcss/postcss")]);