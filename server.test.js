// unit testing difficult because most js contained in Express routing methods

const server = require('./server');

test('Makes sure '/' is at the end of the updated url', () => {
  expect(functions.addSlash("https://api")).toBe("https://api/")
});
