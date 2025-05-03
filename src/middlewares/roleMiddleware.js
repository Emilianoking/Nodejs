const checkRole = (allowedRoles = []) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Acceso denegado. Rol no autorizado" });
      }

      next()
    };
  };
  
  module.exports = checkRole;