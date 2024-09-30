const Inscripcion = require('../models/Inscripcion');
const Evento = require('../models/Evento');
const CodigoPromocional = require('../models/CodigoPromocional');

exports.crearInscripcion = async (req, res) => {
    const { id_cliente, id_evento, tipo_entrada, codigo_promocional } = req.body;
    try {
        const evento = await Evento.findById(id_evento);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        if (evento.capacidad <= evento.inscripciones.length) {
            return res.status(400).json({ message: 'Capacidad máxima alcanzada. Agregado a lista de espera.' });
        }

        let valorBase = evento.valor;
        let porcentajeAdicional = 0;

        if (tipo_entrada === 'General') {
            porcentajeAdicional = 0.15;
        } else if (tipo_entrada === 'VIP') {
            porcentajeAdicional = 0.30;
        }

        const valorAdicional = valorBase * porcentajeAdicional;
        const valorTotal = valorBase + valorAdicional;

        if (codigo_promocional) {
            const codigo = await CodigoPromocional.findByCodigo(codigo_promocional);
            if (!codigo || codigo.estado !== 'activo') {
                return res.status(400).json({ message: 'Código promocional no válido o inactivo.' });
            }

            const descuento = valorTotal * (codigo.valor / 100);
            let valorFinal = valorTotal - descuento;

            const limiteInferior = valorBase * 0.7;
            if (valorFinal < limiteInferior) {
                valorFinal = limiteInferior;
            }

            const inscripcion = await Inscripcion.create(id_cliente, id_evento, new Date(), tipo_entrada, valorFinal, evento.categoria, evento.fecha);
            res.status(201).json({ message: 'Inscripción creada con éxito', inscripcion });
        } else {
            const inscripcion = await Inscripcion.create(id_cliente, id_evento, new Date(), tipo_entrada, valorTotal, evento.categoria, evento.fecha);
            res.status(201).json({ message: 'Inscripción creada con éxito', inscripcion });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear inscripción', error });
    }
};

exports.obtenerInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripcion.getAll();
        res.status(200).json(inscripciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener inscripciones', error });
    }
};

exports.editarInscripcion = async (req, res) => {
    const { id } = req.params;
    const { id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento } = req.body;
    try {
        const result = await Inscripcion.update(id, id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }
        res.status(200).json({ message: 'Inscripción actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar inscripción', error });
    }
};

exports.eliminarInscripcion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Inscripcion.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }
        res.status(200).json({ message: 'Inscripción eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar inscripción', error });
    }
};
