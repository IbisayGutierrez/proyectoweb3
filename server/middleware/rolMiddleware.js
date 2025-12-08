

export const rolMiddleware = (...roles) => {
  const allowedRoles = roles.flat(); // soporta 'ADMIN' o ['ADMIN', 'VOLUNTARIO']
  return (req, res, next) => {
    if (!req.usuario?.rol) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    if (!allowedRoles.includes(req.usuario.rol)) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    next();
  };
};