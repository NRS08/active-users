const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const Socket = require("socket.io");

const io = new Socket.Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 4000;
let users = 0;

app.get("/", (req, res) => {
  res.send(`Active user count - ${users}`);
});

io.on("connection", (socket) => {
  console.log("Connection");
  var online = Object.keys(io.engine.clients);
  io.emit("server message", JSON.stringify(online));

  socket.on("disconnect", function () {
    var online = Object.keys(io.engine.clients);
    io.emit("server message", JSON.stringify(online));
  });
});

const start = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is listining on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
