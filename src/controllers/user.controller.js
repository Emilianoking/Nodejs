const User = require("../models/user.model");

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; // Viene del middleware authenticateToken
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

module.exports = {
  getAllUsers: getAllUsersHandler,
  getCurrentUser,
};