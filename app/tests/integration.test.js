const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(3);

  child.stdout.on('data', _ => {
    request('http://localhost:5000/', (error, response, body) => {
      child.kill();

      t.false(error);
      t.equal(response.statusCode, 200);
      t.notEqual(body.indexOf("<h1>Hi!</h1>"), -1);
    });
  });
});
