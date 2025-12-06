import jwt from 'jsonwebtoken';
import { validarUsuario } from './usuariosService.js';

export const login = async (correo, contrasena) => {
    const usuario = await validarUsuario(correo, contrasena);
    if (!usuario) {
        throw new Error('Credenciales inválidas');
    }
    const token = jwt.sign(
        {
            id: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.JWT_EXPIRES_IN) }
    );
    return {token , usuario};
};