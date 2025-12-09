import SolicitudesModel from '../models/solicitudesModel.js';

class SolicitudesController {
  async listar(req, res) {
    try {
      const { estado } = req.query;
      const solicitudes = await SolicitudesModel.getSolicitudes(estado);
      res.json({ success: true, data: solicitudes });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener solicitudes', error: error.message });
    }
  }

  async listarMias(req, res) {
    try {
      const usuarioId = req.usuario?.id;
      const solicitudes = await SolicitudesModel.getSolicitudesPorUsuario(usuarioId);
      res.json({ success: true, data: solicitudes });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener mis solicitudes', error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const solicitud = await SolicitudesModel.getSolicitudPorId(id);
      if (!solicitud) return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
      res.json({ success: true, data: solicitud });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener solicitud', error: error.message });
    }
  }

  async crear(req, res) {
    try {
      const id_usuario = req.usuario?.id;
      const { id_animal, observaciones, estado } = req.body;
      const result = await SolicitudesModel.crearSolicitud({ id_usuario, id_animal, observaciones, estado });
      res.status(201).json({ success: true, message: 'Solicitud creada', data: result });
    } catch (error) {
      const status = error.code === 'ANIMAL_NO_DISPONIBLE' ? 400 : 500;
      res.status(status).json({ success: false, message: error.message || 'Error al crear solicitud' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { estado, observaciones } = req.body;
      const result = await SolicitudesModel.actualizarSolicitud(id, { estado, observaciones });
      res.json({ success: true, message: 'Solicitud actualizada', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar solicitud', error: error.message });
    }
  }

  async desactivar(req, res) {
    try {
      const { id } = req.params;
      const result = await SolicitudesModel.desactivarSolicitud(id);
      res.json({ success: true, message: 'Solicitud desactivada', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al desactivar solicitud', error: error.message });
    }
  }
}

export default new SolicitudesController();
