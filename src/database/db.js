const mongoose = require('mongoose');

// Usar la variable de entorno MONGO_URI, con un valor por defecto si no está definida
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/commerceDB'; // Valor por defecto por si acaso

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    setTimeout(connectDB, 5000); // Reintentar cada 5 segundos
  }
};

// Iniciar la conexión
connectDB();

module.exports = connectDB;