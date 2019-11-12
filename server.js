const express = require("express");

const userRouter = require("./users/userRouter");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
  name: 'Damilola',
  secret: 'make it a little long and keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60, // you need it if the cookie is to survive !!
    secure: false, // with secure, the cookie only gets set when https !!
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('../database/dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});

module.exports = server;