const test = require('tape');
const riprisintin = require('../src/riprisintin');

test('it should replace all vowers with "i"s', function (t) {
  const result = riprisintin('Testing some sentence')

  t.ok(result)
  t.deepEqual(result, "Tisting simi sintinci")
  t.end()
});