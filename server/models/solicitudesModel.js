import pool from '../db/conexion.js';

class SolicitudesModel {
  async getSolicitudes(estado) {
    if (estado) {
      const [rows] = await pool.query(
        'SELECT * FROM vw_solicitudes_adopcion_activas WHERE estado = ?',
        [estado]
      );
      return rows;
    }
    const [rows] = await pool.query('SELECT * FROM vw_solicitudes_adopcion_activas');
    return rows;
  }

  async getSolicitudesPorUsuario(idUsuario) {
    const [rows] = await pool.query(
      'SELECT * FROM vw_solicitudes_adopcion_activas WHERE id_usuario = ?',
      [idUsuario]
    );
    return rows;
  }

  async getSolicitudPorId(id) {
    const [rows] = await pool.query('CALL pa_buscar_solicitud_adopcion_por_id(?)', [id]);
    return rows?.[0]?.[0] || null;
  }

  async crearSolicitud({ id_usuario, id_animal, observaciones, estado }) {
    const [result] = await pool.query(
      'CALL pa_crear_solicitud_adopcion(?, ?, ?, ?)',
      [id_usuario, id_animal, observaciones || null, estado || null]
    );
    return result;
  }

  async actualizarSolicitud(id, { estado, observaciones }) {
    const [result] = await pool.query(
      'CALL pa_actualizar_estado_solicitud(?, ?, ?)',
      [id, estado, observaciones || null]
    );
    return result;
  }

  async desactivarSolicitud(id) {
    const [result] = await pool.query('CALL pa_desactivar_solicitud_adopcion(?)', [id]);
    return result;
  }
}

export default new SolicitudesModel();
