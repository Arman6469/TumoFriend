var socketIO = require("socket.io");
var db = require("./db");

function connect(server) {
  const io = socketIO(server);

  // TODO: Create namespaces
  usersNamespace(io);
}

// TODO: List namespace will provide list of logged in users
function usersNamespace(io) {
  const users = io.of("/users");
  users.on("connection", socket => {
    socket.on("start-chat", (toUser, fromUser) => {
      if (toUser) {
        users.in(toUser.email).emit("start-chat", fromUser);
      }
    });

    socket.on("chat", (toUser, fromUser) => {
      if (toUser) {
        users.in(toUser.email).emit("chat", fromUser);
      }
    });
    // TODO: add listener for starting chat

    // TODO: add listener to chat message

    // TODO: add listener for editor message WYSIWIG

    // TODO: add listener for drawing

    // TODO: add listener for logging in, update flag loggedIn in Database, join room
    socket.on("login", user => {
      socket.join(user.email);

      db.getClient()
        .collection("students")
        .findOneAndUpdate(
          { email: user.email },
          { $set: { loggedIn: true } },
          { returnOrigignal: false },
          function(err, results) {
            if (err) {
              socket.emit("list error", err);
            } else if (results.value == null) {
              socket.emit("list error", { error: "Student with email " });
            } else {
              users.emit("logged in", results.value);
            }
          }
        );
    });

    // TODO: add listener on 'disconnect' to log out user, and emit
    socket.on("disconnect", user => {
      socket.leave(user.email);

      db.getClient()
        .collection("students")
        .findOneAndUpdate(
          { email: user.email },
          { $set: { loggedIn: false } },
          { returnOrigignal: false },
          function(err, results) {
            if (err) {
              socket.emit("list error", err);
            } else if (results.value == null) {
              socket.emit("list error", { error: "Student with email " });
            } else {
              users.emit("disconnected", results.value);
            }
          }
        );
    });
    // TODO: add listener for logout message, update db, emit
    socket.on("logout", user => {
      socket.leave(user.email);
      console.log("logged out");

      db.getClient()
        .collection("students")
        .findOneAndUpdate(
          { email: user.email },
          { $set: { loggedIn: false } },
          { returnOrigignal: false },
          function(err, results) {
            if (err) {
              socket.emit("list error", err);
            } else if (results.value == null) {
              socket.emit("list error", { error: "Student with email " });
            } else {
              users.emit("logged out", results.value);
            }
          }
        );
    });
    // TODO: add listener to search query
    socket.on("search", (data, fn) => {
      let criteria = {};
      if (data) {
        const textCriterias = { $text: { $search: data } };
        const learningTargets = { learningTargets: data };
        criteria = { $or: [textCriterias, learningTargets] };
      }

      db.getClient()
        .collection("students")
        .find(criteria)
        .sort()
        .toArray((err, result) => {
          if (!err) {
            fn(result);
          } else {
            fn(err);
          }
        });
    });
  });
}

module.exports = {
  connect
};
