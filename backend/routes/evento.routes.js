const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/crear', verificarToken, eventoController.crearEvento);
router.put('/:id', verificarToken, eventoController.editarEvento);
router.delete('/:id', verificarToken, eventoController.eliminarEvento);
router.get('/',  verificarToken,eventoController.obtenerEventos);
router.get('/:id',  verificarToken,eventoController.obtenerEventoPorId);

module.exports = router;
