import HistorialModel from '../models/historialModel.js';

class HistorialController {
  async listar(req, res) {
    try {
      const data = await HistorialModel.getHistorial();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener historial', error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const registro = await HistorialModel.getHistorialPorId(id);
      if (!registro) return res.status(404).json({ success: false, message: 'Historial no encontrado' });
      res.json({ success: true, data: registro });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener historial', error: error.message });
    }
  }

  async listarPorAnimal(req, res) {
    try {
      const { id_animal } = req.params;
      const data = await HistorialModel.getHistorialPorAnimal(id_animal);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener historial del animal', error: error.message });
    }
  }

  async crear(req, res) {
    try {
      const result = await HistorialModel.crearHistorial(req.body);
      res.status(201).json({ success: true, message: 'Historial creado', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear historial', error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const result = await HistorialModel.actualizarHistorial(id, req.body);
      res.json({ success: true, message: 'Historial actualizado', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar historial', error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const result = await HistorialModel.eliminarHistorial(id);
      res.json({ success: true, message: 'Historial eliminado', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar historial', error: error.message });
    }
  }
}

export default new HistorialController();
