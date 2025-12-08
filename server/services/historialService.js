import pool from '../db/conexion.js';

// Obtener todo el historial
export const getHistorial = async () => {
    const [rows] = await pool.query('SELECT * FROM vw_historial');
    return rows;
}

// Obtener un registro del historial por ID
export const getHistorialPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM vw_historial WHERE id_historial = ?', [id]);
    return rows[0];
}

export const getHistorialPorAnimal = async (animalId) => {
    const [rows] = await pool.query('SELECT * FROM vw_historial WHERE id_animal = ?', [animalId]);
    return rows;
}

export const crearHistorial = async (historial) => {
    const {    
        animal_id,
        fecha,
        diagnostico,
        tratamiento,
        veterinario,
        notas
    } = historial;
    const [result] = await pool.query('CALL pa_insertar_historial_medico(?, ?, ?, ?, ?, ?)', [
        animal_id,fecha,diagnostico,tratamiento,veterinario,notas]
    );
    return result;
}

export const actualizarHistorial = async (id_historial, historial) => {
    const {    
        animal_id,
        fecha,
        diagnostico,
        tratamiento,
        veterinario,
        notas
    } = historial;

       console.log("Valores enviados al SP:", [
        id,
        animal_id,
        fecha,
        diagnostico,
        tratamiento,
        veterinario,
        notas
    ]);


    const [result] = await pool.query('CALL pa_editar_historial_medico(?, ?, ?, ?, ?, ?, ?)', [
        id_historial,
        animal_id,
        fecha,
        diagnostico,
        tratamiento,
        veterinario,
        notas
    ]);
    return result;
}

export const eliminarHistorial = async (id_historial) => {
    const [result] = await pool.query('CALL pa_eliminar_historial_medico(?)', [id_historial]);
    return result;
}

