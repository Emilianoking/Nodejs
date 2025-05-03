const Order = require("../models/order.model");


//los metodo async y await son para manejar las promesas de forma mas sencilla y evitar el uso de then y catch
const createOrder = async (req, res) => {
    const { items, total, paymentMethod } = req.body;
    const user = req.uid; // el uid viene del middleware validateJWT
    
    
    
    try {
        const neworder = new Order({ user, items, total, paymentMethod });
        await neworder.save();
        res.status(201).json({ok: true, neworder});
    } catch (error) {
        res.status(500).json({ok: false, msg: "Error al crear la orden", error});
    }

};

const getOrders = async (req, res) => {
    try{
        const orders = await Order.find({ user: req.uid }).sort({createAt: -1});
        res.json({ok: true, orders});
    }catch (error){
        res.status(500).json({ok: false, msg: "Error al obtener las ordenes", error});
    }
};

module.exports = {
    createOrder,
    getOrders
};
