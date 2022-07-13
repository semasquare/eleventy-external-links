const { extname } = require("path");
const { transformLinks } = require("./linker");

module.exports = (eleventyConfig, userOptions = {}) => {
  const options = {
    extensions: [".html"],
    rules: [
      {
        name: "external links",
        regex: new RegExp("^(([a-z]+:)|(//))", "i"),
        target: "_blank",
        rel: "noopener",
        endUrlWith: "do-not-modify" // options: do-not-modify, slash, without-slash
      },
    ],
    ...userOptions,
  };

  eleventyConfig.addTransform(options.extensions, (content, outputPath) => {
    if (outputPath && options.extensions.includes(extname(outputPath))) {
      return transformLinks(content, options);
    }
    return content;
  });
};
