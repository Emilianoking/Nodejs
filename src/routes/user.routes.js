const express = require("express");
const router = express.Router();
const { getAllUsers, getCurrentUser } = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router.get("/", authenticateToken, checkRole(["admin"]), getAllUsers); // Responde en "/users"
router.get("/me", authenticateToken, getCurrentUser); // Nueva ruta para datos del usuario autenticado

module.exports = router;