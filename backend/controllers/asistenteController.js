const Asistente = require('../models/Asistente');

exports.crearAsistente = async (req, res) => {
    const { nombres, apellidos, fecha_nacimiento, email, celular } = req.body;

    if (!nombres || !apellidos || !fecha_nacimiento || !email || !celular) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const asistente = await Asistente.create(nombres, apellidos, fecha_nacimiento, email, celular);
        res.status(201).json({ message: 'Asistente creado con éxito', asistente });
    } catch (error) {
        console.error('Error al crear asistente:', error); // Registrar el error
        res.status(500).json({ message: 'Error al crear asistente', error });
    }
};


exports.obtenerAsistentes = async (req, res) => {
    try {
        const asistentes = await Asistente.getAll();
        res.status(200).json(asistentes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asistentes', error });
    }
};

// Obtener un asistente por ID
exports.obtenerAsistentePorId = async (req, res) => {
    const { id } = req.params; // Obtener ID de la solicitud
    try {
        const asistente = await Asistente.findById(id);
        if (!asistente) {
            return res.status(404).json({ message: 'Asistente no encontrado' });
        }
        res.status(200).json(asistente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asistente', error });
    }
};

// Editar un asistente
exports.editarAsistente = async (req, res) => {
    const { id } = req.params; // ID del asistente a editar
    try {
        const result = await Asistente.update(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Asistente no encontrado' });
        }
        res.status(200).json({ message: 'Asistente actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar asistente', error });
    }
};

// Eliminar un asistente
exports.eliminarAsistente = async (req, res) => {
    const { id } = req.params; // ID del asistente a eliminar
    try {
        const result = await Asistente.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Asistente no encontrado' });
        }
        res.status(200).json({ message: 'Asistente eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar asistente', error });
    }
};
