const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
// 	res.send("API is Running");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ------------------------Deployment----------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname1, "/frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}
// ------------------------Deployment----------------------------

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started at PORT ${PORT}`));

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: [
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			"http://localhost:5000",
			"http://127.0.0.1:5000",
			"https://chatspot-production.up.railway.app",
			"https://chatspot-prod.onrender.com",
		],
	},
});

io.on("connection", (socket) => {
	console.log("connected to socket.io");
	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User Joined Room: " + room);
	});
	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;

		if (!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user) => {
			if (user._id == newMessageRecieved.sender._id) return;

			socket.in(user._id).emit("message recieved", newMessageRecieved);
		});
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
});
