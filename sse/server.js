const { Transform } = require('stream');
const SseStream = require('ssestream').default;
const express = require('express');

const app = express();

app.use(express.static(__dirname));
app.listen(3000, () => {
  console.log('server open in 3000');
});

app.get('/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
  });
  const sse = new Transform({ objectMode: true });

  sse.pipe(res);
});

app.get('/sse-stream', (req, res) => {
  const sse = new SseStream(req);

  sse.pipe(res);

  const message = {
    data: `hello\nworld${Date.now()}`,
    event: 'push',
    id: Date.now(),
    retry: '',
    comment: '测试',
  };

  setInterval(() => {
    sse.write(message);
  }, 1000);
});
