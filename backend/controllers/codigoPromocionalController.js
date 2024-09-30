const CodigoPromocional = require('../models/CodigoPromocional');

exports.crearCodigoPromocional = async (req, res) => {
    const { codigo, valor, fecha_inicio, fecha_cierre, estado } = req.body;
    try {
        const codigoPromocional = await CodigoPromocional.create(codigo, valor, fecha_inicio, fecha_cierre, estado);
        res.status(201).json({ message: 'Código promocional creado con éxito', codigoPromocional });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear código promocional', error });
    }
};

exports.obtenerCodigosPromocionales = async (req, res) => {
    try {
        const codigos = await CodigoPromocional.getAll();
        res.status(200).json(codigos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener códigos promocionales', error });
    }
};

// Obtener un código promocional por ID
exports.obtenerCodigoPromocionalPorId = async (req, res) => {
    const { id } = req.params; // Obtener ID de la solicitud
    try {
        const codigoPromocional = await CodigoPromocional.findByCodigo(id);
        if (!codigoPromocional) {
            return res.status(404).json({ message: 'Código promocional no encontrado' });
        }
        res.status(200).json(codigoPromocional);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener código promocional', error });
    }
};

// Editar un código promocional
exports.editarCodigoPromocional = async (req, res) => {
    const { id } = req.params; // ID del código promocional a editar
    try {
        const result = await CodigoPromocional.update(id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Código promocional no encontrado' });
        }
        res.status(200).json({ message: 'Código promocional actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar código promocional', error });
    }
};

// Eliminar un código promocional
exports.eliminarCodigoPromocional = async (req, res) => {
    const { id } = req.params; // ID del código promocional a eliminar
    try {
        const result = await CodigoPromocional.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Código promocional no encontrado' });
        }
        res.status(200).json({ message: 'Código promocional eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar código promocional', error });
    }
};
