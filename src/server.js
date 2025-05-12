require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = express.Router();

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

const setupSwagger = require("./config/swagger");
const mongoose = require("mongoose");
const checkRole = require("./middlewares/roleMiddleware");
const authenticateToken = require("./middlewares/authMiddleware");
const connectDB = require("./database/db");

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Registrar rutas primero
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Definir rutas usando el router
routes.post(
  "/",
  authenticateToken,
  checkRole(["admin"]),
  async (req, res) => {
    res.status(201).json({ message: "Producto creado" });
  }
);
app.use("/products", routes);

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