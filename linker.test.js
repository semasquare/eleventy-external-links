const {transformLinks} = require('./linker')

test('two plus two is four', () => {
    transformLinks("", {})
    expect(2 + 2).toBe(4);
});