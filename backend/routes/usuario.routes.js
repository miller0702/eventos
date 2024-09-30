// rutas/usuario.routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/login', usuarioController.loginUsuario);
router.post('/registro', authMiddleware, usuarioController.registrarUsuario);
router.get('/', authMiddleware, usuarioController.obtenerUsuarios);
router.get('/:id', authMiddleware, usuarioController.obtenerUsuarioPorId);
router.put('/:id', authMiddleware, usuarioController.editarUsuario);
router.delete('/:id', authMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
