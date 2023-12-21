const Fruta = require('../models/Fruta');
const getAllFrutas = async () => {
  try {
    const frutas = await Fruta.findAll();
    return frutas;
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    throw error;
  }
};

const existeFruta = async (name) => {
  try {
    const fruta = await Fruta.findOne({ where: { name } });
    return fruta !== null;
  } catch (error) {
    console.error('Error al verificar si la fruta existe:', error);
    throw error;
  }
};


const insertarFruta = async (name) => {
  try {
    const nuevaFruta = await Fruta.create({ name });
    return nuevaFruta;
  } catch (error) {
    console.error('Error al insertar la fruta:', error);
    throw error;
  }
};

const getFrutaById = async (id) => {
  try {
    const fruta = await Fruta.findByPk(id);
    return fruta;
  } catch (error) {
    console.error('Error al obtener la fruta por ID:', error);
    throw error;
  }
};

const eliminarFruta = async (id) => {
  try {
    await Fruta.destroy({ where: { id } });
  } catch (error) {
    console.error('Error al eliminar la fruta:', error);
    throw error;
  }
};

const editarFruta = async (id, name) => {
  try {
    const fruta = await getFrutaById(id);
    if (!fruta) {
      throw new Error('Fruta no encontrada.');
    }
    await Fruta.update({ name }, { where: { id } });
    const frutaActualizada = await getFrutaById(id);
    return frutaActualizada;
  } catch (error) {
    console.error('Error al editar la fruta:', error);
    throw error;
  }
};

module.exports = {
  getAllFrutas,
  existeFruta,
  insertarFruta,
  getFrutaById,
  eliminarFruta,
  editarFruta,
};
