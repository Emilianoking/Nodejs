// controllers/user.controller.js
const { getAllUsers } = require('../models/user.model');

const getAllUsersHandler = async (req, res) => {
    try {
        const users = getAllUsers(); // Obtiene usuarios SIN contraseñas
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

module.exports = {
    getAllUsers: getAllUsersHandler
};