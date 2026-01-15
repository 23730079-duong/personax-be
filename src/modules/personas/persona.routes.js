const express = require("express");
const router = express.Router();

const personaController = require("./persona.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware, personaController.createPersona);
router.get("/me", authMiddleware, personaController.getMyPersonas);

module.exports = router;
