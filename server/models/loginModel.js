import pool from '../db/conexion.js';

// Modelo para interactuar con el login

// Obtener usuario por correo (para validación de login)
export const obtenerUsuarioPorCorreoLogin = async (correo) => {
    const [rows] = await pool.query('CALL pa_buscar_usuario_por_correo(?)', [correo]);
    return rows[0]?.[0] || rows[0];
};
