import AnimalesModel from '../models/animalesModel.js';

export const getAnimales = async (estado) => {
	return AnimalesModel.getAnimales(estado);
};

export const getAnimalPorId = async (id) => {
	return AnimalesModel.getAnimalPorId(id);
};

export const crearAnimal = async (animal) => {
	return AnimalesModel.crearAnimal(animal);
};

export const actualizarAnimal = async (id, animal) => {
	return AnimalesModel.actualizarAnimal(id, animal);
};

export const desactivarAnimal = async (id) => {
	return AnimalesModel.desactivarAnimal(id);
};
