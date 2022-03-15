import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otf2ttf, ttf2woff, fonts2style } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

global.app = {
  isProd: process.argv.includes("--build"),
  isBuild: !process.argv.includes("--build"),
  path,
  gulp,
  plugins
}

const watcher = () => {
  gulp.watch(path.watch.files, copy);
  // gulp.watch(path.watch.html, gulp.series(html, ftp)); Auto-deploy;
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
};

const fonts = gulp.series(otf2ttf, ttf2woff, fonts2style);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

export const sprite = svgSprite;
export const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
export const build = gulp.series(reset, mainTasks);
export const compress = gulp.series(reset, mainTasks, zip);
export const deploy = gulp.series(reset, mainTasks, ftp);
