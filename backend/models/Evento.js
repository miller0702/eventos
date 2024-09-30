const db = require('../config/db');

const Evento = {
    create: async (eventoData) => {
        const { titulo, descripcion, fecha, hora, lugar, cupo_disponible, tipo, valor_base, fecha_apertura_inscripciones, fecha_cierre_inscripciones, categoria } = eventoData;
        const [result] = await db.execute(
            `INSERT INTO eventos (titulo, descripcion, fecha, hora, lugar, cupo_disponible, tipo, valor_base, fecha_apertura_inscripciones, fecha_cierre_inscripciones, categoria)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, descripcion, fecha, hora, lugar, cupo_disponible, tipo, valor_base, fecha_apertura_inscripciones, fecha_cierre_inscripciones, categoria]
        );
        return result;
    },
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM eventos');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM eventos WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, eventoData) => {
        const { titulo, descripcion, fecha, hora, lugar, cupo_disponible, tipo, valor_base, fecha_apertura_inscripciones, fecha_cierre_inscripciones, categoria } = eventoData;
        const [result] = await db.execute(
            `UPDATE eventos SET 
            titulo = ?, 
            descripcion = ?, 
            fecha = ?, 
            hora = ?, 
            lugar = ?, 
            cupo_disponible = ?, 
            tipo = ?, 
            valor_base = ?, 
            fecha_apertura_inscripciones = ?, 
            fecha_cierre_inscripciones = ?, 
            categoria = ?
            WHERE id = ?`,
            [titulo, descripcion, fecha, hora, lugar, cupo_disponible, tipo, valor_base, fecha_apertura_inscripciones, fecha_cierre_inscripciones, categoria, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM eventos WHERE id = ?', [id]);
        return result;
    },
};

module.exports = Evento;
