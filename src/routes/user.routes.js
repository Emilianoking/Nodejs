const express = require("express");
const router = express.Router();
const { getAllUsers, getCurrentUser, deleteUser, updateUser, updateProfileImage } = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");

router.get("/", authenticateToken, checkRole(["admin"]), getAllUsers);
router.get("/me", authenticateToken, getCurrentUser);
router.delete("/:id", authenticateToken, checkRole(["admin"]), deleteUser);
router.put("/:id", authenticateToken, checkRole(["admin"]), updateUser);
router.put("/me", authenticateToken, upload.single("profileImage"), updateProfileImage); // Sin checkRole

module.exports = router;