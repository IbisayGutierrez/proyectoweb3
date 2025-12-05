import pool from '../db/conexion.js';

// Obtener todo el historial
export const getHistorial = async () => {
    const [rows] = await pool.query('SELECT * FROM vw_historial');
    return rows;
}

// Obtener un registro del historial por ID
export const getHistorialPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM vw_historial_por_id WHERE id_historial = ?', [id]);
    return rows[0];
}

export const getHistorialPorAnimal = async (animalId) => {
    const [rows] = await pool.query('SELECT * FROM vw_historial_por_animal WHERE id_animal = ?', [animalId]);
    return rows;
}

export const crearHistorial = async (historial) => {
    const {    
        animal_id,
        fecha,
        descripcion,
        tratamiento,
        veterinario,
        notas_adicionales
    } = historial;
    const [result] = await pool.query('CALL pa_insertar_historial_medico(?, ?, ?, ?, ?, ?)', [
        animal_id,
        fecha,
        descripcion,
        tratamiento,
        veterinario,
        notas_adicionales
    ]);
    return result;
}

export const actualizarHistorial = async (id, historial) => {
    const {    
        animal_id,
        fecha,
        descripcion,
        tratamiento,
        veterinario,
        notas_adicionales
    } = historial;
    const [result] = await pool.query('CALL pa_editar_historial_medico(?, ?, ?, ?, ?, ?, ?)', [
        id,
        animal_id,
        fecha,
        descripcion,
        tratamiento,
        veterinario,
        notas_adicionales
    ]);
    return result;
}

export const eliminarHistorial = async (id) => {
    const [result] = await pool.query('CALL pa_eliminar_historial_medico(?)', [id]);
    return result;
}

