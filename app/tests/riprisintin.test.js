const test = require('tape');
const riprisintin = require('../src/riprisintin');

test('it should replace all vowers with "i"s', function (t) {
  const result = riprisintin('testing some sentence')

  t.ok(result)
  t.deepEqual(result, "tisting simi sintinci")
  t.end()
});

test('it should keep the U in QU', function (t) {
  const result = riprisintin('Estu es lo que queres?')

  t.ok(result)
  t.deepEqual(result, "isti is li qui quiris?")
  t.end()
});

test('it should even replace tildes', function (t) {
  const result = riprisintin('Vós dècïs')

  t.ok(result)
  t.deepEqual(result, "vís dìcïs")
  t.end()
});