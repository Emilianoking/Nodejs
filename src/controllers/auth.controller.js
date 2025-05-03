const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try{
    const { name, email, password, role } = req.body;  // Agregamos el role 
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser){
      return res.status(400).json({ message: "El email ya está registrado" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
      name,
      email,
      password: hashedPassword,
      role,
    })

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });


  }catch (error){

    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};


//Iniciar sesión
const login = async (req, res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user){
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    //agragar token
    const token = jwt.sign(
      { id: user._id, 
        name: user.name, 
        role: user.role },  
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json ({
      token,
      user:{
        id: user._id, 
        name: user.name,
        email: user.email, 
        role: user.role
      }
    });






  }catch (error){
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};


module.exports = { register, login };








// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { createUser, findUserByEmail } = require("../models/user.model");



// // Registrar usuario
// const register = async (req, res) => {
 
//   const { name, email, password, role } = req.body;  // Agregamos el role para que se valide y poder registrar datos siempre y cuando sea admin

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Todos los campos son obligatorios" });
//   }

//   if (findUserByEmail(email)) {
//     return res.status(400).json({ message: "El email ya está registrado" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = { id: Date.now(), name, email, password: hashedPassword, role: role }; // insertar el role para ser tomado 

//   createUser(newUser);
//   res.status(201).json({ message: "Usuario registrado con éxito" });
// };




// // Iniciar sesión
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = findUserByEmail(email);

//   if (!user) {
//     return res.status(400).json({ message: "Usuario no encontrado" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: "Contraseña incorrecta" });
//   }

//   console.log({user});
//   // Agregar el rol al token 
//   const token = jwt.sign(
//     { id: user.id, name: user.name, role: user.role},  //Role para tomarlo al login
//     process.env.JWT_SECRET, 
//     { expiresIn: "1h" }
//   );
//   res.json({ token });
// };

// module.exports = { register, login };