const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct } = require ("../controllers/product.controller");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const authenticateToken = require("../middlewares/authMiddleware");

const checkRole = require("../middlewares/roleMiddleware");

//Definir rutas
router.get("/", getProducts);


router.get(
    "/:id",
    [check("id", "El ID debe ser un numero válido").isNumeric()],
    validateFields,    
    getProductById
);


router.post(
    "/",
    authenticateToken,
    checkRole(["admin"]),
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("price", "El precio es obligatorio").isFloat({gt: 0}),
        validateFields,
    ],
    createProduct
);


module.exports = router;

/*
GET /products -> Obtener todos los productos
GET /products/:id -> Obtener un producto por ID
POST /products -> Crear un producto
*/