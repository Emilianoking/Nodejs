require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = express.Router();

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes"); // Importar las rutas de usuarios

const setupSwagger = require("./config/swagger"); // Importar la configuración de Swagger

const app = express();

const orderRoutes = require("./routes/order.routes"); // Importar las rutas de ordenes

const mongoose = require("mongoose"); // Importar BD

const checkRole = require("./middlewares/roleMiddleware"); // Importar middleware de rol
const authenticateToken = require("./middlewares/authMiddleware"); // Importar middleware de autenticación


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerceDB",{

    useNewUrlParser: true,
    useUnifiedTopology: true,
} )

    .then(() => {console.log("Conectado a la base de datos MongoDB")})
    .catch((error) => console.error("Error al conectar a la base de datos MongoDB", error));


connectDB ();

// Middleware
app.use(express.json());
app.use(cors());

setupSwagger(app);


app.use(morgan("dev"));

app.use("/api/orders", orderRoutes); // Registrar las rutas de ordenes


// Rutas
app.get("/", (req, res) => {
    res.send("API Ecommerce funcionando 🚀");
});

//crear producto - solo admin
router.post("/", authenticateToken, checkRole(["admin"]), async (req, res) => {
res.status(201).json({message: "Producto creado"});
});



// Registrar rutas
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes); // Registrar rutas de usuarios

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});







/*
Metodo POST
URL -> http://localhost:5000/auth/register

JSON -> 

{
    "name": "Juan Perez",
    "email": "juan@example.com",
    "password": "123456"   
}           
    
// Admin
{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "123456",
    "role": "admin"
}

//
*/