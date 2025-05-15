const Product = require("../models/product.model");

// Obtener los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price, description, imageUrl, stock } = req.body;

  // Validar los datos
  if (!name || !price || !description || !imageUrl || !stock) {
    return res.status(400).json({ message: "todos los datos son obligatorios" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      stock,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { name, price, description, imageUrl, stock } = req.body;

  if (!name || !price || !description || !imageUrl || !stock) {
    return res.status(400).json({ message: "todos los datos son obligatorios" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, imageUrl, stock },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};