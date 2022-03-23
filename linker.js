const { parse } = require("node-html-parser");

module.exports = {
  transformLinks: (content, options) => {
    const root = parse(content);
    const links = root.querySelectorAll("a");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && options.regex.test(href)) {
        link.setAttribute("target", options.target);
        link.setAttribute("rel", options.rel);
      }
    });

    const newContent = root.toString();

    return options.includeDoctype ? `<!DOCTYPE html>${newContent}` : newContent;
  },
};
