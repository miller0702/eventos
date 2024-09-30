const express = require('express');
const router = express.Router();
const asistenteController = require('../controllers/asistenteController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/crear', verificarToken, asistenteController.crearAsistente);
router.get('/', verificarToken, asistenteController.obtenerAsistentes);
router.get('/:id', verificarToken, asistenteController.obtenerAsistentePorId);
router.put('/:id', verificarToken, asistenteController.editarAsistente);
router.delete('/:id', verificarToken, asistenteController.eliminarAsistente);

module.exports = router;
