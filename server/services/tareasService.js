import pool from '../db/conexion.js';



// Obtener todas las tareas
export const getTareas = async () => {
    const [rows] = await pool.query('SELECT * FROM vw_tareas');
    return rows;
}

export const getTareaPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM vw_tareas WHERE id_tarea = ?', [id]);
    return rows[0];
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
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite,
        id_voluntario
    } = tarea;
    const [result] = await pool.query('CALL pa_insertar_tarea_voluntario(?, ?, ?, ?, ?, ?)',
        [titulo, descripcion, estado, prioridad, fecha_limite, id_voluntario]
    );
    return result;
}

// Actualizar una tarea existente
export const actualizarTarea = async (id, tarea) => {
    const {
        id_voluntario,
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite
    } = tarea;
    console.log("ID:", id);
    console.log("Data:", id_voluntario, titulo, descripcion, estado, prioridad, fecha_limite);

    const [result] = await pool.query('CALL pa_editar_tarea_voluntario(?, ?, ?, ?, ?, ?, ?)',
        [id, id_voluntario, titulo, descripcion, estado, prioridad, fecha_limite]
    );
    return result;
}

// Eliminar una tarea 
export const eliminarTarea = async (id) => {
    const [result] = await pool.query('CALL pa_eliminar_tarea_voluntario(?)', [id]);
    return result;
}