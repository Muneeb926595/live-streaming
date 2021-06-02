const express = require("express");
const config = require("config");
const admin = require("firebase-admin");
require("express-async-errors");
const path = require("path");
const socketio = require("socket.io");

const errorController = require("./controllers/error");
const routes = require("./routes");
const DBConnection = require("./startup/dbConnection");
const errors = require("./middleware/errors");
const http = require("http");

DBConnection();
const app = express();
require("./startup/prod")(app);
app.use(express.json());

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://foodbook-beta-1p5.firebaseio.com",
// });

app.use("/api/images", express.static(path.join(__dirname, "public/uploads")));
app.use(
  "/api/videos",
  express.static(path.join(__dirname, "public/uploads/videos"))
);
app.use("/api", routes);
app.use(errors);
app.use(errorController.get404);

const port = process.env.PORT || config.get("port");

var httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log("[ Http server running at port ] ", port);
});

const io = socketio(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (roomNo) => {
    socket.join(roomNo);
  });

  socket.on("broadcaster", ({ broadcasterId }) => {
    socket.broadcast.emit("broadcaster", {
      broadcasterId,
    });
  });

  socket.on("new-watcher-joined", ({ broadcasterId, watchersCount }) => {
    io.emit("new-watcher-joined", {
      broadcasterId,
      watchersCount,
    });
  });
  socket.on("watcher", (broadcasterId, watcherId) => {
    socket.to(broadcasterId).emit("watcher", broadcasterId, watcherId);
  });
  socket.on("offer", (broadcasterId, watcherId, message) => {
    socket.to(watcherId).emit("offer", broadcasterId, message);
  });
  socket.on("answer", (broadcasterId, watcherId, message) => {
    socket.to(broadcasterId).emit("answer", watcherId, message);
  });
  socket.on("candidate", (broadcasterId, watcherId, message) => {
    socket.to(watcherId).emit("candidate", broadcasterId, message);
  });

  socket.on("new-broadcaster", (broadcaster) => {
    socket.broadcast.emit("active-broadcaster", broadcaster);
  });

  socket.on("watcher-disconnect", (watcherId) => {
    socket.emit("disconnectPeer", watcherId);
  });
});
