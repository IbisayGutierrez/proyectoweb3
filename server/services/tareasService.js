import pool from '../db/conexion.js';



// Obtener todas las tareas
export const getTareas = async () => {
    const [rows] = await pool.query('SELECT * FROM vw_tareas');
    return rows;
}

// Obtener una tarea por estado
export const getTareaPorEstado = async (estado) => {
    const [rows] = await pool.query('SELECT * FROM vw_tareas WHERE estado = ?', [estado]);
    return rows;
}

// obtener tareas por voluntario
export const getTareasPorVoluntario = async (voluntarioId) => {
    const [rows] = await pool.query('SELECT * FROM vw_tareas WHERE id_voluntario = ?', [voluntarioId]);
    return rows;
}


// Crear una nueva tarea
export const crearTarea = async (tarea) => {
    const {
        id_voluntario,
        descripcion,
        fecha_limite,
        estado,
        prioridad
    } = tarea;
    const [result] = await pool.query('CALL pa_insertar_tarea_voluntario(?, ?, ?, ?, ?)', [
        id_voluntario,
        descripcion,
        fecha_limite,
        estado,
        prioridad
    ]);
    return result;
}

// Actualizar una tarea existente
export const actualizarTarea = async (id, tarea) => {
    const {
        id_voluntario,
        descripcion,
        fecha_limite,
        estado,
        prioridad
    } = tarea;
    const [result] = await pool.query('CALL pa_editar_tarea_voluntario(?, ?, ?, ?, ?, ?)', [
        id,
        id_voluntario,
        descripcion,
        estado,
        prioridad,
        fecha_limite
    ]);
    return result;
}

// Eliminar una tarea 
export const eliminarTarea = async (id) => {
    const [result] = await pool.query('CALL pa_eliminar_tarea_voluntario(?)', [id]);
    return result;
}