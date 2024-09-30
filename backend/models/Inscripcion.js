const db = require('../config/db');

const Inscripcion = {
    create: async (id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento) => {
        const [result] = await db.execute(
            `INSERT INTO inscripciones (id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento]
        );
        return result;
    },
    getByEventId: async (id_evento) => {
        const [rows] = await db.execute('SELECT * FROM inscripciones WHERE id_evento = ?', [id_evento]);
        return rows;
    },
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM inscripciones');
        return rows;
    },
    getByClientId: async (id_cliente) => {
        const [rows] = await db.execute('SELECT * FROM inscripciones WHERE id_cliente = ?', [id_cliente]);
        return rows;
    },
    countByEventId: async (id_evento) => {
        const [rows] = await db.execute('SELECT COUNT(*) AS count FROM inscripciones WHERE id_evento = ?', [id_evento]);
        return rows[0].count;
    },
    update: async (id, id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento) => {
        const [result] = await db.execute(
            `UPDATE inscripciones SET 
            id_cliente = ?, 
            id_evento = ?, 
            fecha_inscripcion = ?, 
            tipo_entrada = ?, 
            valor = ?, 
            categoria_evento = ?, 
            fecha_evento = ?
            WHERE id = ?`,
            [id_cliente, id_evento, fecha_inscripcion, tipo_entrada, valor, categoria_evento, fecha_evento, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM inscripciones WHERE id = ?', [id]);
        return result;
    },
};

module.exports = Inscripcion;
