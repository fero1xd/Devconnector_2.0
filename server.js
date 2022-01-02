const express = require('express');
const app = express();
const server = require('http').Server(app);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require('dotenv').config();
const connectDb = require('./utilsServer/connectDb');
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDb();

// Importing Routes
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/posts');

nextApp.prepare().then(() => {
  // Define routes
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/profile', profileRoute);
  app.use('/api/posts', postRoute);

  app.all('*', (req, res) => handle(req, res));
});

server.listen(PORT, (err) => {
  if (err) throw err;

  console.log('Express server Started on port ' + PORT);
});

