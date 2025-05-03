
const {Schema, model}= require("mongoose");
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user"
    }
});

module.exports = model("User", userSchema);




// // models/user.model.js
// const users = []; // Array global compartido

// const createUser = (user) => {
//     const newUser = {
//         id: users.length + 1,
//         ...user,
//         createdAt: new Date()
//     };
//     users.push(newUser);
//     console.log("Usuario registrado:", users); // Debug
//     return newUser;
// };

// const findUserByEmail = (email) => {
//     return users.find(user => user.email === email);
// };

// const getAllUsers = () => {
//     return users.map(({ password, ...user }) => user); // Excluir password
// };

// module.exports = {
//     users, // ¡Exportamos el array para acceso directo si es necesario!
//     createUser,
//     findUserByEmail,
//     getAllUsers
// };