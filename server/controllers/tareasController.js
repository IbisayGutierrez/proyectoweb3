import TareasModel from '../models/tareasModel.js';

class TareasController {
  async listar(req, res) {
    try {
      const { estado } = req.query;
      const data = estado
        ? await TareasModel.getTareaPorEstado(estado)
        : await TareasModel.getTareas();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener tareas', error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const tarea = await TareasModel.getTareaPorId(id);
      if (!tarea) return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
      res.json({ success: true, data: tarea });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener la tarea', error: error.message });
    }
  }

  async listarPorVoluntario(req, res) {
    try {
      const { id } = req.params;
      const data = await TareasModel.getTareasPorVoluntario(id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener tareas del voluntario', error: error.message });
    }
  }

  async crear(req, res) {
    try {
      const result = await TareasModel.crearTarea(req.body);
      res.status(201).json({ success: true, message: 'Tarea creada', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear la tarea', error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const result = await TareasModel.actualizarTarea(id, req.body);
      res.json({ success: true, message: 'Tarea actualizada', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar la tarea', error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const result = await TareasModel.eliminarTarea(id);
      res.json({ success: true, message: 'Tarea eliminada', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar la tarea', error: error.message });
    }
  }
}

export default new TareasController();
