const Evento = require('../models/Evento');

exports.crearEvento = async (req, res) => {
    try {
        const evento = await Evento.create(req.body);
        res.status(201).json({ message: 'Evento creado con éxito', evento });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear evento', error });
    }
};

exports.obtenerEventos = async (req, res) => {
    try {
        const eventos = await Evento.getAll();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos', error });
    }
};

// Obtener un evento por ID
exports.obtenerEventoPorId = async (req, res) => {
    const { id } = req.params; // Obtener ID de la solicitud
    try {
        const evento = await Evento.getById(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener evento', error });
    }
};

// Actualizar un evento
exports.editarEvento = async (req, res) => {
    const { id } = req.params; // ID del evento a editar
    try {
        const result = await Evento.update(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar evento', error });
    }
};

// Eliminar un evento
exports.eliminarEvento = async (req, res) => {
    const { id } = req.params; // ID del evento a eliminar
    try {
        const result = await Evento.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar evento', error });
    }
};
