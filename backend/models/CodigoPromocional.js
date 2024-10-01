const db = require('../config/db');

const CodigoPromocional = {
    create: async (codigo, valor, fecha_inicio, fecha_cierre, estado) => {
        const [result] = await db.execute(
            `INSERT INTO codigos_promocionales (codigo, valor, fecha_inicio_codigo_promocional, fecha_cierre_codigo_promocional, estado)
            VALUES (?, ?, ?, ?, ?)`,
            [codigo, valor, fecha_inicio, fecha_cierre, estado]
        );
        return result;
    },
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM codigos_promocionales');
        return rows;
    },
    findByCodigo: async (codigo) => {
        const [rows] = await db.execute('SELECT * FROM codigos_promocionales WHERE codigo = ?', [codigo]);
        return rows[0];
    },
    update: async (id, codigoPromocionalData) => {
        const { codigo, valor, fecha_inicio, fecha_cierre, estado } = codigoPromocionalData;
        const [result] = await db.execute(
            `UPDATE codigos_promocionales SET 
            codigo = ?, 
            valor = ?, 
            fecha_inicio_codigo_promocional = ?, 
            fecha_cierre_codigo_promocional = ?, 
            estado = ? 
            WHERE id = ?`,
            [codigo, valor, fecha_inicio, fecha_cierre, estado, id]
        );
        return result;
    },
    // Eliminar código promocional
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM codigos_promocionales WHERE id = ?', [id]);
        return result;
    },
};

module.exports = CodigoPromocional;
