const express = require('express');
const frutasQuerys = require('../querys/frutas');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const frutas = await frutasQuerys.getAllFrutas();
    res.json(frutas);
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const existeFruta = await frutasQuerys.existeFruta(name);
    if (existeFruta) {
      return res.status(400).json({ error: 'La fruta ya existe.' });
    }
    const nuevaFruta = await frutasQuerys.insertarFruta(name);
    res.status(200).json(nuevaFruta);
  } catch (error) {
    console.error('Error al agregar la fruta:', error);
    res.status(500).send('Error en el servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const frutaId = req.params.id;
  try {
    const fruta = await frutasQuerys.getFrutaById(frutaId);
    if (!fruta) {
      return res.status(404).json({ error: 'Fruta no encontrada.' });
    }
    await frutasQuerys.eliminarFruta(frutaId);
    res.status(204).send('Eliminado');
  } catch (error) {
    console.error('Error al eliminar la fruta:', error);
    res.status(500).send('Error en el servidor');
  }
});

router.put('/:id', async (req, res) => {
  const frutaId = req.params.id;
  const { name } = req.body;

  try {
    const fruta = await frutasQuerys.getFrutaById(frutaId);
    if (!fruta) {
      return res.status(404).json({ error: 'Fruta no encontrada.' });
    }
    const frutaActualizada = await frutasQuerys.editarFruta(frutaId, name);
    res.json(frutaActualizada);
  } catch (error) {
    console.error('Error al editar la fruta:', error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
