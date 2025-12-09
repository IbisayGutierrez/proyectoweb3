import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as loginModel from '../models/loginModel.js';

export const login = async (correo, password) => {
    // Obtener usuario desde el modelo
    const usuario = await loginModel.obtenerUsuarioPorCorreoLogin(correo);
    
    if (!usuario || !usuario.password_hash) {
        throw new Error('Credenciales inválidas');
    }
    
    // Validar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
    
    if (!passwordMatch) {
        throw new Error('Credenciales inválidas');
    }
    
    // Verificar que el usuario esté activo
    if (usuario.estado !== 'ACTIVO') {
        throw new Error('Usuario inactivo');
    }
    
    // Generar token JWT
    const token = jwt.sign(
        {
            id: usuario.id_usuario,
            correo: usuario.correo,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.JWT_EXPIRES_IN)}
    );
    
    // Retornar token y datos del usuario (sin password)
    return {
        token,
        usuario: {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            rol: usuario.rol,
            estado: usuario.estado
        }
    };
};