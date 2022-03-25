const {transformLinks} = require('./linker')
const {HtmlDiffer, isEqual} = require('html-differ')

const inputHtml = `
<!DOCTYPE html>
<html>
  <body>
    <a href="https://www.out.com">Click me!</a>
    <a href="https://www.blank.com" target="_blank">Click me!</a>
    <a href="https://www.rel.com" rel="noopener">Click me!</a>
    <a href="/blog/">Click me!</a>
    <a href="/books/" rel="noopener" target="_blank">Click me!</a>
    <p>heelo</p>
  </body>
</html>`;

const expectedHtml = `
<!DOCTYPE html>
<html>
  <body>
    <a href="https://www.out.com" target="_blank" rel="noopener">Click me!</a>
    <a href="https://www.blank.com" target="_blank" rel="noopener">Click me!</a>
    <a href="https://www.rel.com" target="_blank" rel="noopener">Click me!</a>
    <a href="/blog/">Click me!</a>
    <a href="/books/">Click me!</a>
    <p>heelo</p>
  </body>
</html>`;

const htmlDiffer = new HtmlDiffer()

test('links should be transformed', () => {
    const options = {
        rules: [
            {
                name: "external links",
                regex: new RegExp("^(([a-z]+:)|(//))", "i"),
                target: "_blank",
                rel: "noopener",
            },
            {
                name: "internal links",
                regex: new RegExp(".*", "i"),
                target: "",
                rel: "",
            }
        ]
    };

    transformedHtml = transformLinks(inputHtml, options)

    const isHtmlEqual = htmlDiffer.isEqual(transformedHtml, expectedHtml)

    expect(isHtmlEqual).toBe(true)
});