const User = require("../models/user.model");

const getAllUsersHandler = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos, excluyendo el campo password
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

module.exports = {
  getAllUsers: getAllUsersHandler,
};