import pool from '../db/conexion.js';

class HistorialModel {
  async getHistorial() {
    const [rows] = await pool.query('SELECT * FROM vw_historial');
    return rows;
  }

  async getHistorialPorId(id) {
    const [rows] = await pool.query('SELECT * FROM vw_historial WHERE id_historial = ?', [id]);
    return rows[0] || null;
  }

  async getHistorialPorAnimal(animalId) {
    const [rows] = await pool.query('SELECT * FROM vw_historial WHERE id_animal = ?', [animalId]);
    return rows;
  }

  async crearHistorial(historial) {
    const { animal_id, fecha, diagnostico, tratamiento, veterinario, notas } = historial;
    const [result] = await pool.query(
      'CALL pa_insertar_historial_medico(?, ?, ?, ?, ?, ?)',
      [animal_id, fecha, diagnostico, tratamiento, veterinario, notas]
    );
    return result;
  }

  async actualizarHistorial(id_historial, historial) {
    const { animal_id, fecha, diagnostico, tratamiento, veterinario, notas } = historial;
    const [result] = await pool.query(
      'CALL pa_editar_historial_medico(?, ?, ?, ?, ?, ?, ?)',
      [id_historial, animal_id, fecha, diagnostico, tratamiento, veterinario, notas]
    );
    return result;
  }

  async eliminarHistorial(id_historial) {
    const [result] = await pool.query('CALL pa_eliminar_historial_medico(?)', [id_historial]);
    return result;
  }
}

export default new HistorialModel();
