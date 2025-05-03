const { Product } = require("../models/product.model");
// obtener los productos

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); 
  } 
  catch (error){
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};


// Obtener un producto por ID
const getProductById = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  }catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};


// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price, description, imageUrl, stock } = req.body;

  //validar los datos
  if (!name || !price || !description || !imageUrl || !stock) {
    return res.status(400).json({ message: "todos los datos son obligatorios" });
  }

  try {
    const newProduct = new Product({
      name, price, description, imageUrl, stock
    });
    await newProduct.save();
    res.status(201).json(newProduct);

  }catch (error) {  
    console.error("Error al crear el producto", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }

};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};










// // Simulación de base de datos (temporal)
// let products = [
//     { id: 1, name: "Laptop Gamer", price: 1200 },
//     { id: 2, name: "Mouse Inalámbrico", price: 50 }
//   ];
  
//   // Obtener todos los productos
//   const getProducts = (req, res) => {
//     res.json(products);
//   };
  
//   // Obtener un producto por ID
//   const getProductById = (req, res) => {
//     const { id } = req.params;
//     const product = products.find((p) => p.id == id);
  
//     if (!product) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }
  
//     res.json(product);
//   };
  
//   // Crear un nuevo producto
//   const createProduct = (req, res) => {
//     const { name, price } = req.body;
  
//     if (!name || !price) {
//       return res.status(400).json({ message: "Nombre y precio son obligatorios" });
//     }
  
//     const newProduct = {
//       id: products.length + 1,
//       name,
//       price,
//     };
  
//     products.push(newProduct);
//     res.status(201).json(newProduct);
//   };
  
//   module.exports = { getProducts, getProductById, createProduct };
