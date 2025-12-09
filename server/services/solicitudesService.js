import SolicitudesModel from '../models/solicitudesModel.js';

export const getSolicitudes = async (estado) => {
	return SolicitudesModel.getSolicitudes(estado);
};

export const getSolicitudesPorUsuario = async (usuarioId) => {
	return SolicitudesModel.getSolicitudesPorUsuario(usuarioId);
};

export const getSolicitudPorId = async (id) => {
	return SolicitudesModel.getSolicitudPorId(id);
};

export const crearSolicitud = async (usuarioId, solicitud) => {
	return SolicitudesModel.crearSolicitud({ id_usuario: usuarioId, ...solicitud });
};

export const actualizarSolicitud = async (id, datos) => {
	return SolicitudesModel.actualizarSolicitud(id, datos);
};

export const desactivarSolicitud = async (id) => {
	return SolicitudesModel.desactivarSolicitud(id);
};
