const {transformLinks} = require('./linker')
const {HtmlDiffer} = require('html-differ')

const inputHTML = `
<!DOCTYPE html>
<html>
  <body>
    <a href="https://www.out.com">Click me!</a>
    <a href="https://www.blank.com" target="_blank">Click me!</a>
    <a href="https://www.rel.com" rel="noopener">Click me!</a>
    <a href="/blog/">Click me!</a>
    <p>heelo</p>
  </body>
</html>`;

const expectedHTML = `
<!DOCTYPE html>
<html>
  <body>
    <a href="https://www.out.com" target="_blank" rel="noopener">Click me!</a>
    <a href="https://www.blank.com" target="_blank" rel="noopener">Click me!</a>
    <a href="https://www.rel.com" target="_blank" rel="noopener">Click me!</a>
    <a href="/blog/">Click me!</a>
    <p>heelo</p>
  </body>
</html>`;

const htmlDiffer = new HtmlDiffer()

test('links should be transformed', () => {
    const options = {
        name: "external-links",
        regex: new RegExp("^(([a-z]+:)|(//))", "i"),
        target: "_blank",
        rel: "noopener",
        extensions: [".html"],
        includeDoctype: true,
    };

    expect(htmlDiffer.isEqual(transformLinks(inputHTML, options), expectedHTML)).toBe(true)
});