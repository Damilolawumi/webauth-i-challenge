const express = require("express");

const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use("/", userRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});

module.exports = server;