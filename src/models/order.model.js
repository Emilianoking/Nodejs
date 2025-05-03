// esta constante es para crear el modelo de la base de datos
const { Schema, model } = require('mongoose');


// se crea el esquema de la base de datos
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items : [
        {
            product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    total: {
        type: Number,
        required: true
    },
    // esto es para manejar el estado de la orden
    paymentMethod: {
        type: String,
        enum: ['paypal', 'mercadopago', 'wompi'],
        required: true

    },
    isPid: {
        type: Boolean,
        default: false
    },

    paiAt:{
        type: Date,
    },

    createAt:{
        type: Date,
        default: Date.now

    }

});

module.exports = model('Order', orderSchema);