import bcrypt from 'bcrypt';
import * as usuarioModel from '../models/usuarioModel.js';

// Obtener todos los usuarios
export const getUsuarios = async () => {
    return await usuarioModel.obtenerTodosLosUsuarios();
}

// Obtener un usuario por ID
export const getUsuarioPorId = async (id) => {
    return await usuarioModel.obtenerUsuarioPorId(id);
}

// Crear un nuevo usuario
export const crearUsuario = async (usuario) => {
    const { 
        nombre, 
        correo,
        telefono,
        direccion,
        rol,
        password_hash
    } = usuario;
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    return await usuarioModel.insertarUsuario(nombre, correo, telefono, direccion, rol, hashedPassword);
}

// Actualizar un usuario existente
export const actualizarUsuario = async (id, usuario) => {
    const {    
        nombre, 
        correo,
        telefono,
        direccion,
        rol
    } = usuario;
    return await usuarioModel.actualizarUsuarioPorId(id, nombre, correo, telefono, direccion, rol);
}

// Cambiar la contraseña de un usuario
export const cambiarContrasena = async (id, nuevaContrasena) => {
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    return await usuarioModel.actualizarContrasena(id, hashedPassword);
}

// Eliminar un usuario no borrado físicamente, solo cambiar su estado a inactivo
export const eliminarUsuario = async (id) => {
    return await usuarioModel.desactivarUsuarioPorId(id);
}

//funcion para validar un usuario durante el login por correo y password
export const validarUsuario = async (correo, password) => {
    const usuario = await usuarioModel.obtenerUsuarioPorCorreo(correo);
    
    if (!usuario || !usuario.password_hash) {
        return null;
    }
    
    const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
    return passwordMatch ? usuario : null;
}