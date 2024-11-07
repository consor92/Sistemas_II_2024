const express = require('express');
const router = express.Router();
const Perfume = require('../schemas/perfumes');


router.post('/',add);

router.get('/',getAll);
router.get('/:id', getId);
router.get('/codigo/:codigo',getCodigo);
router.get('/marca/:marca',getMarca);
router.get('/precio/:precio',getPrecio);
router.get('/stock/:stock',getStock);
router.get('/categoria/:categoria',getCategoria);
router.get('/tamanio/:tamanio',getTamaño);

//router.delete('/:id',deleteId);
router.delete('/:codigo',deleteCodigo);
router.delete('/', deleteArray);

router.put('/:id',updateFull);
router.patch('/:id',updatePartial);

// Buscar un perfume por código
async function getCodigo(req, res,next) {
    try {
      const perfume = await Perfume.findOne({ codigo: req.params.codigo });
      if (!perfume) {
        return res.status(404).json({ message: 'Perfume no encontrado' });
      }
      res.json(perfume);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

// Crear un nuevo perfume
async function add(req, res,next) {
  try {
    console.log( req.body  )
    const perfume = new Perfume(req.body);
    await perfume.save();
    res.status(201).json(perfume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Obtener todos los perfumes
async function getAll(req, res,next) {  try {
    const perfumes = await Perfume.find();
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar un perfume por código (ID)
async function getId (req, res,next) {  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: 'Perfume no encontrado' });
    }
    res.json(perfume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar perfumes por marca
async function getMarca(req, res,next) {  try {
    console.log(req.params.marca);
    const perfumes = await Perfume.find({ marca: req.params.marca });
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar perfumes por precio
async function getPrecio(req, res,next) {  try {
    const perfumes = await Perfume.find({ precio: { $lte: req.params.precio } });
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar perfumes por stock
async function getStock(req, res,next) {  try {
    const perfumes = await Perfume.find({ stock: { $gte: req.params.stock } });
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar perfumes por categoría
async function getCategoria(req, res,next) {  try {
    const perfumes = await Perfume.find({ categoria: req.params.categoria });
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar perfumes por tamaño
async function getTamaño (req, res,next) {  try {
    const perfumes = await Perfume.find({ tamaño: req.params.tamanio });
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



// Eliminar un perfume por ID
async function deleteId (req, res,next) {  try {
    const perfume = await Perfume.findByIdAndDelete(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: 'Perfume no encontrado' });
    }
    res.json({ message: 'Perfume eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar un perfume por código
async function deleteCodigo (req, res,next) {  
    try {
      const perfume = await Perfume.findOneAndDelete({ codigo: req.params.codigo });
      if (!perfume) {
        return res.status(404).json({ message: 'Perfume no encontrado' });
      }
      res.json({ message: 'Perfume eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

// Eliminar un perfume por código
async function deleteArray (req, res,next) {  
  try {
    const codigos = req.body;

    if (!Array.isArray(codigos) || codigos.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar al menos un código válido' });
    }

    const result = await Perfume.deleteMany({ codigo: { $in: codigos } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No se encontraron perfumes con los códigos proporcionados' });
    }

    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Actualizar un perfume completo (PUT)
async function updateFull(req, res,next) {  
    try {
    const perfume = await Perfume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!perfume) {
      return res.status(404).json({ message: 'Perfume no encontrado' });
    }
    res.json(perfume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar un perfume parcialmente (PATCH)
async function updatePartial(req, res,next) {  try {
    const perfume = await Perfume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!perfume) {
      return res.status(404).json({ message: 'Perfume no encontrado' });
    }
    res.json(perfume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = router;
