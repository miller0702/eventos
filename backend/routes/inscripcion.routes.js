const express = require('express');
const router = express.Router();
const InscripcionController = require('../controllers/inscripcionController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/', verificarToken, InscripcionController.crearInscripcion);
router.get('/', verificarToken, InscripcionController.obtenerInscripciones);
router.put('/:id', verificarToken, InscripcionController.editarInscripcion);
router.delete('/:id', verificarToken, InscripcionController.eliminarInscripcion);

module.exports = router;
