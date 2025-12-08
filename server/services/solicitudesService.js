import pool from '../db/conexion.js';

export const getSolicitudes = async (estado) => {
	if (estado) {
		const [rows] = await pool.query('SELECT * FROM vw_solicitudes_adopcion_activas WHERE estado = ?', [estado]);
		return rows;
	}
	const [rows] = await pool.query('SELECT * FROM vw_solicitudes_adopcion_activas');
	return rows;
};

export const getSolicitudesPorUsuario = async (usuarioId) => {
	const [rows] = await pool.query('SELECT * FROM vw_solicitudes_adopcion_activas WHERE id_usuario = ?', [usuarioId]);
	return rows;
};

export const getSolicitudPorId = async (id) => {
	const [rows] = await pool.query('CALL pa_buscar_solicitud_adopcion_por_id(?)', [id]);
	return rows?.[0]?.[0] || null;
};

export const crearSolicitud = async (usuarioId, solicitud) => {
	const { id_animal, observaciones, estado } = solicitud;

	const [animalRows] = await pool.query('SELECT estado, activo FROM animales WHERE id_animal = ?', [id_animal]);
	const animal = animalRows?.[0];
	if (!animal || animal.activo !== 1 || animal.estado !== 'DISPONIBLE') {
		const error = new Error('ANIMAL_NO_DISPONIBLE');
		error.statusCode = 400;
		throw error;
	}

	const [result] = await pool.query('CALL pa_crear_solicitud_adopcion(?, ?, ?, ?)', [
		usuarioId,
		id_animal,
		observaciones || null,
		estado || null,
	]);
	return result;
};

export const actualizarSolicitud = async (id, datos) => {
	const { estado, observaciones } = datos;
	const [result] = await pool.query('CALL pa_actualizar_estado_solicitud(?, ?, ?)', [
		id,
		estado,
		observaciones || null,
	]);
	return result;
};

export const desactivarSolicitud = async (id) => {
	const [result] = await pool.query('CALL pa_desactivar_solicitud_adopcion(?)', [id]);
	return result;
};
