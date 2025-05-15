const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const authenticateToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

//Definir rutas
router.get("/", getProducts); // Público: todos pueden ver productos

router.get(
  "/:id",
  [check("id", "El ID debe ser un número válido").isMongoId()],
  validateFields,
  getProductById
);

router.post(
  "/",
  authenticateToken,
  checkRole(["admin"]),
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("price", "El precio es obligatorio").isFloat({ gt: 0 }),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("imageUrl", "La URL de la imagen es obligatoria").not().isEmpty(),
    check("stock", "El stock es obligatorio").isInt({ gt: -1 }),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  authenticateToken,
  checkRole(["admin"]),
  [
    check("id", "El ID debe ser un número válido").isMongoId(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("price", "El precio es obligatorio").isFloat({ gt: 0 }),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("imageUrl", "La URL de la imagen es obligatoria").not().isEmpty(),
    check("stock", "El stock es obligatorio").isInt({ gt: -1 }),
    validateFields,
  ],
  updateProduct
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole(["admin"]),
  [check("id", "El ID debe ser un número válido").isMongoId(), validateFields],
  deleteProduct
);

module.exports = router;

/*
GET /products -> Obtener todos los productos
GET /products/:id -> Obtener un producto por ID
POST /products -> Crear un producto
PUT /products/:id -> Actualizar un producto
DELETE /products/:id -> Eliminar un producto
*/