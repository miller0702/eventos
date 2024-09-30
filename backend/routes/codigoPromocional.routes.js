const express = require('express');
const router = express.Router();
const codigoPromocionalController = require('../controllers/codigoPromocionalController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/crear', verificarToken, codigoPromocionalController.crearCodigoPromocional);
router.get('/', verificarToken, codigoPromocionalController.obtenerCodigosPromocionales);
router.get('/:id', verificarToken, codigoPromocionalController.obtenerCodigoPromocionalPorId);
router.put('/:id', verificarToken, codigoPromocionalController.editarCodigoPromocional);
router.delete('/:id', verificarToken, codigoPromocionalController.eliminarCodigoPromocional);

module.exports = router;
