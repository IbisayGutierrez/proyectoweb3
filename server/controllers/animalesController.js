import AnimalesModel from '../models/animalesModel.js';

class AnimalesController {
  async listar(req, res) {
    try {
      const { estado } = req.query;
      const animales = await AnimalesModel.getAnimales(estado);
      res.json({ success: true, data: animales });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener animales', error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const animal = await AnimalesModel.getAnimalPorId(id);
      if (!animal) return res.status(404).json({ success: false, message: 'Animal no encontrado' });
      res.json({ success: true, data: animal });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener animal', error: error.message });
    }
  }

  async crear(req, res) {
    try {
      const result = await AnimalesModel.crearAnimal(req.body);
      res.status(201).json({ success: true, message: 'Animal creado', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear animal', error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const result = await AnimalesModel.actualizarAnimal(id, req.body);
      res.json({ success: true, message: 'Animal actualizado', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar animal', error: error.message });
    }
  }

  async desactivar(req, res) {
    try {
      const { id } = req.params;
      const result = await AnimalesModel.desactivarAnimal(id);
      res.json({ success: true, message: 'Animal desactivado', data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al desactivar animal', error: error.message });
    }
  }
}

export default new AnimalesController();
