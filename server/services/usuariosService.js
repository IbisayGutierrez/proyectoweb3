import pool from '../db/conexion.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsuarios = async () => {
    const [rows] = await pool.query('SELECT * FROM vw_usuarios');
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
        password_hash
    } = usuario;
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const [result] = await pool.query(
        'CALL pa_registrar_usuario(?, ?, ?, ?, ?, ?)',
         [nombre, correo, telefono, direccion, rol, hashedPassword]
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
        rol
    } = usuario;
    const [result] = await pool.query(
        'CALL pa_editar_usuario(?, ?, ?, ?, ?, ?)',
        [id, nombre, correo, telefono, direccion, rol]
    );
    return result;
}

// Cambiar la contraseña de un usuario
export const cambiarContrasena = async (id, nuevaContrasena) => {
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    const [result] = await pool.query(
        'CALL pa_cambiar_contrasena(?, ?)',
        [id, hashedPassword]
    );
    return result;
}

// Eliminar un usuario no borrado físicamente, solo cambiar su estado a inactivo
export const eliminarUsuario = async (id) => {
    const [result] = await pool.query('CALL pa_desactivar_usuario(?)', [id]);
    return result;
}

//funcion para validar un usuario durante el login por correo y password
export const validarUsuario = async (correo, password) => {
    const [rows] = await pool.query('CALL pa_buscar_usuario_por_correo(?)', [correo]);
    
    // Los CALL procedures devuelven array anidado: rows[0] es el resultset, rows[0][0] es el usuario
    const usuario = rows[0]?.[0] || rows[0];
    
    if (!usuario || !usuario.password_hash) {
        return null;
    }
    
    const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
    return passwordMatch ? usuario : null;
}