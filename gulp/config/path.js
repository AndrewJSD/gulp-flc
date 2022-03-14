import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    html: `${buildFolder}/`,
    css:`${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    // html: `${srcFolder}/*.pug`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
    svgIcons: `${srcFolder}/svgIcons/*.svg`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    // html: `${srcFolder}/**/*.pug`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: ".",
}