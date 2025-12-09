import TareasModel from '../models/tareasModel.js';

export const getTareas = async () => TareasModel.getTareas();
export const getTareaPorId = async (id) => TareasModel.getTareaPorId(id);
export const getTareaPorEstado = async (estado) => TareasModel.getTareaPorEstado(estado);
export const getTareasPorVoluntario = async (voluntarioId) => TareasModel.getTareasPorVoluntario(voluntarioId);
export const crearTarea = async (tarea) => TareasModel.crearTarea(tarea);
export const actualizarTarea = async (id, tarea) => TareasModel.actualizarTarea(id, tarea);
export const eliminarTarea = async (id) => TareasModel.eliminarTarea(id);