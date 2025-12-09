import pool from '../db/conexion.js';

class AnimalesModel {
  async getAnimales(estado) {
    if (estado) {
      const [rows] = await pool.query(
        'SELECT * FROM vw_animales_activos WHERE estado = ?',
        [estado]
      );
      return rows;
    }
    const [rows] = await pool.query('SELECT * FROM vw_animales_activos');
    return rows;
  }

  async getAnimalPorId(id) {
    const [rows] = await pool.query('CALL pa_buscar_animal_por_id(?)', [id]);
    return rows?.[0]?.[0] || null;
  }

  async crearAnimal(animal) {
    const {
      nombre,
      especie,
      raza,
      edad,
      sexo,
      descripcion,
      estado,
      foto_url,
      fecha_ingreso,
    } = animal;

    const [result] = await pool.query(
      'CALL pa_insertar_animal(?, ?, ?, ?, ?, ?, ?, ?, ?) ',
      [nombre, especie, raza, edad, sexo, descripcion, estado, foto_url, fecha_ingreso]
    );
    return result;
  }

  async actualizarAnimal(id, animal) {
    const {
      nombre,
      especie,
      raza,
      edad,
      sexo,
      descripcion,
      estado,
      foto_url,
      fecha_ingreso,
    } = animal;

    const [result] = await pool.query(
      'CALL pa_editar_animal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, nombre, especie, raza, edad, sexo, descripcion, estado, foto_url, fecha_ingreso]
    );
    return result;
  }

  async desactivarAnimal(id) {
    const [result] = await pool.query('CALL pa_desactivar_animal(?)', [id]);
    return result;
  }
}

export default new AnimalesModel();
