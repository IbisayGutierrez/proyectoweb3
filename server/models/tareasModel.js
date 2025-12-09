import pool from '../db/conexion.js';

class TareasModel {
  async getTareas() {
    const [rows] = await pool.query('SELECT * FROM vw_tareas');
    return rows;
  }

  async getTareaPorId(id) {
    const [rows] = await pool.query('SELECT * FROM vw_tareas WHERE id_tarea = ?', [id]);
    return rows[0] || null;
  }

  async getTareaPorEstado(estado) {
    const [rows] = await pool.query('SELECT * FROM vw_tareas WHERE estado = ?', [estado]);
    return rows;
  }

  async getTareasPorVoluntario(voluntarioId) {
    const [rows] = await pool.query('SELECT * FROM vw_tareas WHERE id_voluntario = ?', [voluntarioId]);
    return rows;
  }

  async crearTarea(tarea) {
    const { titulo, descripcion, estado, prioridad, fecha_limite, id_voluntario } = tarea;
    const [result] = await pool.query(
      'CALL pa_insertar_tarea_voluntario(?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, estado, prioridad, fecha_limite, id_voluntario]
    );
    return result;
  }

  async actualizarTarea(id, tarea) {
    const { id_voluntario, titulo, descripcion, estado, prioridad, fecha_limite } = tarea;
    const [result] = await pool.query(
      'CALL pa_editar_tarea_voluntario(?, ?, ?, ?, ?, ?, ?)',
      [id, id_voluntario, titulo, descripcion, estado, prioridad, fecha_limite]
    );
    return result;
  }

  async eliminarTarea(id) {
    const [result] = await pool.query('CALL pa_eliminar_tarea_voluntario(?)', [id]);
    return result;
  }
}

export default new TareasModel();
