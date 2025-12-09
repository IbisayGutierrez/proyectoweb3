import HistorialModel from '../models/historialModel.js';

export const getHistorial = async () => HistorialModel.getHistorial();
export const getHistorialPorId = async (id) => HistorialModel.getHistorialPorId(id);
export const getHistorialPorAnimal = async (animalId) => HistorialModel.getHistorialPorAnimal(animalId);
export const crearHistorial = async (historial) => HistorialModel.crearHistorial(historial);
export const actualizarHistorial = async (id_historial, historial) => HistorialModel.actualizarHistorial(id_historial, historial);
export const eliminarHistorial = async (id_historial) => HistorialModel.eliminarHistorial(id_historial);

