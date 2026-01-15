const express = require("express");
const router = express.Router();

const conversationController = require("./conversation.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware, conversationController.startConversation);
router.get("/me", authMiddleware, conversationController.getMyConversations);

module.exports = router;
