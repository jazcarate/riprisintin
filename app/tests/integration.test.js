const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

const TOKEN = '1234567';
const env = Object.assign({}, process.env, {PORT: 5000, token: TOKEN});

test('can render an image', (t) => {
  const child = spawn('node', ['app/index.js'], {env});
  t.plan(4);

  child.stdout.on('data', _ => {
    request('http://localhost:5000/test/', (error, response, body) => {
      child.kill();

      t.false(error);
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'image/png');
      t.true(body);
    });
  });
});

test('responds to GET request to the home page', (t) => {
  const child = spawn('node', ['app/index.js'], {env});
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

const slaskSlash = {
  token: TOKEN,
  team_id: 'T0001',
  team_domain: 'example',
  enterprise_id: 'E0001',
  enterprise_name: 'Globular%20Construct%20Inc',
  channel_id: 'C2147483705',
  channel_name: 'test',
  user_id: 'U2147483697',
  user_name: 'Steve',
  command: '/iify',
  text: 'this is a test',
  response_url: '//nowhere/commands/1234/5678',
  trigger_id: '13345224609.738474920.8088930838d88f008e0'
}

test('responds to a Slash Command', (t) => {
  const child = spawn('node', ['app/index.js'], {env});
  t.plan(2);

  child.stdout.on('data', _ => {
    request.post({
      url: 'http://localhost:5000/generate',
      method: 'POST',
      json: slaskSlash
    },
    (error, response, body) => {
      child.kill();

      t.false(error);
      t.equal(response.statusCode, 200);
    });
  });
});