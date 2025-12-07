import pool from '../db/conexion.js';

// Obtener todos los animales activos; permite filtro opcional por estado
export const getAnimales = async (estado) => {
	if (estado) {
		const [rows] = await pool.query('SELECT * FROM vw_animales_activos WHERE estado = ?', [estado]);
		return rows;
	}
	const [rows] = await pool.query('SELECT * FROM vw_animales_activos');
	return rows;
};

// Obtener un animal por ID solo si está activo
export const getAnimalPorId = async (id) => {
	const [rows] = await pool.query('CALL pa_buscar_animal_por_id(?)', [id]);
	return rows?.[0]?.[0] || null;
};

// Crear un nuevo animal
export const crearAnimal = async (animal) => {
	const {
		nombre,
		especie,
		raza,
		edad,
		sexo,
		descripcion,
		estado,
		foto_url,
		fecha_ingreso
	} = animal;

	const [result] = await pool.query(
		'CALL pa_insertar_animal(?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[nombre, especie, raza, edad, sexo, descripcion, estado, foto_url, fecha_ingreso]
	);

	return result;
};

// Actualizar un animal existente
export const actualizarAnimal = async (id, animal) => {
	const {
		nombre,
		especie,
		raza,
		edad,
		sexo,
		descripcion,
		estado,
		foto_url,
		fecha_ingreso
	} = animal;

	const [result] = await pool.query(
		'CALL pa_editar_animal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[id, nombre, especie, raza, edad, sexo, descripcion, estado, foto_url, fecha_ingreso]
	);

	return result;
};

// Desactivar (borrado lógico) un animal
export const desactivarAnimal = async (id) => {
	const [result] = await pool.query('CALL pa_desactivar_animal(?)', [id]);
	return result;
};
