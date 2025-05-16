require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./database/db");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const setupSwagger = require("./config/swagger");

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Servir archivos estáticos desde la carpeta uploads
app.use("/uploads", express.static("uploads"));

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API Ecommerce funcionando 🚀");
});

// Montar Swagger después de las rutas de la API
setupSwagger(app);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});