const { parse } = require("node-html-parser");

module.exports = {
  transformLinks: (content, options) => {
    const root = parse(content);
    const links = root.querySelectorAll("a");
    links.forEach((link) => {
      const href = link.getAttribute("href");

      options.rules.every((rule) => {
        if (href && rule.regex.test(href)) {
          if (rule.endUrlWith == "slash") {
            if (href.slice(-1) != "/") {
              link.setAttribute("href", href + "/")
            }
          } else if (rule.endUrlWith == "without-slash") {
            if (href.slice(-1) == "/") {
              link.setAttribute("href", href.slice(0, -1))
            }
          }

          if (rule.target != "") {
            link.setAttribute("target", rule.target);
          } else {
            link.removeAttribute("target")
          }
          
          if (rule.rel != "") {
            link.setAttribute("rel", rule.rel);
          } else {
            link.removeAttribute("rel")
          }
          return false;
        }

        return true;
      });
    });

    const newContent = root.toString();

    return newContent;
  },
};
