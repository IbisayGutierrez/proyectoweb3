import pool from '../db/conexion.js';
import bycrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsuarios = async () => {
    const [rows] = await pool.query('CALL vw_usuarios()');
    return rows;
}

// Obtener un usuario por ID
export const getUsuarioPorId = async (id) => {
    const [rows] = await pool.query('CALL pa_buscar_usuario_por_id(?)', [id]);
    return rows[0];
}

// Crear un nuevo usuario
export const crearUsuario = async (usuario) => {
    const { 
        nombre, 
        correo,
        telefono,
        direccion,
        rol,
        password_hash,
        estado
    } = usuario;
    const hashedPassword = await bycrypt.hash(password_hash, 10);
    const [result] = await pool.query(
        'CALL pa_crear_usuario(?, ?, ?, ?, ?, ?, ?, ?)',
         [nombre, correo, telefono, direccion, rol, hashedPassword, estado]
        );
    return result;
}

// Actualizar un usuario existente
export const actualizarUsuario = async (id, usuario) => {
    const {    
        nombre, 
        correo,
        telefono,
        direccion,
        rol,
        password_hash,
        estado 
    } = usuario;
    const hashedPassword = await bycrypt.hash(password_hash, 10);
    const [result] = await pool.query(
        'CALL pa_editar_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, nombre, correo, telefono, direccion, rol, hashedPassword, estado]
    );
    return result;
}

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
    const [result] = await pool.query('CALL pa_eliminar_usuario(?)', [id]);
    return result;
}

//funcion para validar un usuario durante el login por correo y password
export const validarUsuario = async (correo, password) => {
    const [rows] = await pool.query('CALL pa_buscar_usuario_por_correo(?)', [correo]);
    const usuario = rows[0];
    if (usuario && await bycrypt.compare(password, usuario.password_hash)) {
        return usuario;
    }
    return null;
}