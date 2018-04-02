const test = require('tape');
const memeRender = require('../src/memeRender');

test('it should render an image', function (t) {
  t.plan(1);
  
  memeRender({top: 'top', bottom: 'bottom'}).then((canvas) => {
    t.true(canvas)
  });
});