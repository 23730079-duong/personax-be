const express = require("express");
const router = express.Router();

const messageController = require("./message.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware, messageController.sendMessage);
router.get(
  "/:conversation_id",
  authMiddleware,
  messageController.getMessages
);

module.exports = router;
