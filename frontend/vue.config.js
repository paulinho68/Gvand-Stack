export const css = {
  loaderOptions: {
    sass: {
      prependData: `
          @import "./scss/_variables.scss";
        `
    }
  }
};