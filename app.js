const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const connect = require('./schemas');
connect();

const postsRouter = require('./routes/posts');
app.use('/posts', [postsRouter]);

// const commentsRouter = require('./routes/comments');
// app.use('/comments', [commentsRouter]);

app.listen(port, () => {
  console.log(`${port} 포트 서버`);
});
