const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
    const { nombre, telefono, email, contraseña } = req.body;

    if (!req.user) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const usuario = await Usuario.create(nombre, telefono, email, hashedPassword);
        res.status(201).json({ message: 'Usuario creado con éxito', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

exports.editarUsuario = async (req, res) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    try {
        const result = await Usuario.update(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    if (!req.user || req.user.id === id) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    try {
        const result = await Usuario.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};
