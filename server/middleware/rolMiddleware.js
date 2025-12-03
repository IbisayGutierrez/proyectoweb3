

export const rolMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ message: 'Token invalido' });

        }
        next();
    };
};
