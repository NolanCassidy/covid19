//test.test.js file.
const calculateRates = require('./public/js/singleView');
test('1/1 calculateRates successful', () => {expect(calculateRates(1,1)).toBe(Math.round(1/1*100));});
test('1/100 calculateRates successful', () => {expect(calculateRates(1,100)).toBe(Math.round(1/100*100));});
test('1234/5678 calculateRates successful', () => {expect(calculateRates(1234,5678)).toBe(Math.round(1234/5678*100));});
