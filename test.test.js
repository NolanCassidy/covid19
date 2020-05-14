//test.test.js file.
const testData = require('./tests');
test('getData() made successful call to the API', () => {expect(testData()).toBe(true);});
