const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const personaRoutes = require("./modules/personas/persona.routes");
const messageRoutes = require("./modules/messages/message.routes");
const conversationRoutes = require("./modules/conversations/conversation.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/personas", personaRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

app.use(errorMiddleware);


module.exports = app;
