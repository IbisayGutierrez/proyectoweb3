import pool from '../db/conexion.js';

// Obtener todos los usuarios desde la vista
export const obtenerTodosLosUsuarios = async () => {
    const [rows] = await pool.query('SELECT * FROM vw_usuarios');
    return rows;
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (id) => {
    const [rows] = await pool.query('CALL pa_buscar_usuario_por_id(?)', [id]);
    return rows[0];
};

// Obtener usuario por correo
export const obtenerUsuarioPorCorreo = async (correo) => {
    const [rows] = await pool.query('CALL pa_buscar_usuario_por_correo(?)', [correo]);
    return rows[0]?.[0] || rows[0];
};

// Insertar nuevo usuario
export const insertarUsuario = async (nombre, correo, telefono, direccion, rol, passwordHash) => {
    const [result] = await pool.query(
        'CALL pa_registrar_usuario(?, ?, ?, ?, ?, ?)',
        [nombre, correo, telefono, direccion, rol, passwordHash]
    );
    return result;
};

// Actualizar usuario existente
export const actualizarUsuarioPorId = async (id, nombre, correo, telefono, direccion, rol) => {
    const [result] = await pool.query(
        'CALL pa_editar_usuario(?, ?, ?, ?, ?, ?)',
        [id, nombre, correo, telefono, direccion, rol]
    );
    return result;
};

// Cambiar contraseña de usuario
export const actualizarContrasena = async (id, passwordHash) => {
    const [result] = await pool.query(
        'CALL pa_cambiar_contrasena(?, ?)',
        [id, passwordHash]
    );
    return result;
};

// Desactivar usuario (cambio de estado a INACTIVO)
export const desactivarUsuarioPorId = async (id) => {
    const [result] = await pool.query('CALL pa_desactivar_usuario(?)', [id]);
    return result;
};


