const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  profileImage: {
    type: String,
    default: "", // Para almacenar la ruta de la imagen
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);