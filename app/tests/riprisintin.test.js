const test = require('tape');
const riprisintin = require('../src/riprisintin');

test('it should replace all vowers with "i"s', function (t) {
  const result = riprisintin('Testing some sentence')

  t.ok(result)
  t.deepEqual(result, "Tisting simi sintinci")
  t.end()
});

test('it should keep the vowel\'s upper-caseness', function (t) {
  const result = riprisintin('And so it is')

  t.ok(result)
  t.deepEqual(result, "Ind si it is")
  t.end()
});