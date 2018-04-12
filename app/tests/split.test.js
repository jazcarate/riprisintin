const test = require('tape');
const split = require('../src/split');

test('it should not split short strings', function (t) {
  const result = split('small')

  t.ok(result)
  t.deepEqual(result.top, "")
  t.deepEqual(result.bottom, "small")
  t.end()
});

test('it should split long strings to the middle', function (t) {
  const result = split('this is a long string. ' + 'It should be split there')

  t.ok(result)
  t.deepEqual(result.top, "this is a long string.")
  t.deepEqual(result.bottom, "It should be split there")
  t.end()
});