const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const connect = require('./schemas');
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

const postsRouter = require('./routes/posts');
app.use('/posts', [postsRouter]);

const commentsRouter = require('./routes/comments');
app.use('/comments', [commentsRouter]);

const usersRouter = require('./routes/users');
app.use('/api', [usersRouter]);

const likesRouter = require('./routes/likes');
app.use('/likes', [likesRouter]);

app.listen(port, () => {
  console.log(`${port} 포트 서버`);
});
