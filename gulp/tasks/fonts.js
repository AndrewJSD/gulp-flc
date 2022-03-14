import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otf2ttf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>",
      })
    ))
    .pipe(fonter({formats: ["ttf"]}))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttf2woff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>",
      })
    ))
    .pipe(fonter({formats: ["woff"]}))
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
}

export const fonts2style = () => {
  const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  fs.readdir(app.path.build.fonts, (_, files) => {
    if (files) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", (err) => err && console.log(err));
        let newFileOnly;
        for (let i = 0; i < files.length; i++) {
          const fileName = files[i].split(".")[0];
          if (newFileOnly !== fileName) {
            const fontName = fileName.split("-")[0] || fileName;
            let fontWeight = fileName.split("-")[1] || fileName;
            switch(fontWeight.toLowerCase()) {
              case "thin": fontWeight = 100;
                break;
              case "extralight": fontWeight = 200;
                break;
              case "light": fontWeight = 300;
                break;
              case "medium": fontWeight = 500;
                break;
              case "semibold": fontWeight = 600;
                break;
              case "bold": fontWeight = 700;
                break;
              case "extrabold" || "heavy": fontWeight = 800;
                break;
              case "black": fontWeight = 900;
                break;
              default: fontWeight = 400;
            }
            const content = `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fileName}.woff2") format("woff2"), url("../fonts/${fileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`;
            fs.appendFile(fontsFile, content, (err) => err && console.log(err));
            newFileOnly = fileName;
          }
        }
      } else {
        console.log("File scss/fonts.scss already exists.")
      }
    }
  });
  return app.gulp.src(app.path.srcFolder);
}