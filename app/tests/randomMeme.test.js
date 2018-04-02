const test = require('tape');
const randomMeme = require('../src/randomMeme');

test('it should select an image', function (t) {
  t.plan(1);
  
  randomMeme().then((x) => t.true(x))
});