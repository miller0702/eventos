const db = require('../config/db');

const Asistente = {
    create: async (nombres, apellidos, fecha_nacimiento, email, celular) => {
        try {
            const [result] = await db.execute(
                `INSERT INTO asistentes (nombres, apellidos, fecha_nacimiento, email, celular)
                VALUES (?, ?, ?, ?, ?)`,
                [nombres, apellidos, fecha_nacimiento, email, celular]
            );
            return result;
        } catch (error) {
            console.error('Error al crear asistente en el modelo:', error);
            throw new Error('Error al crear asistente');
        }
    },
    
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM asistentes');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM asistentes WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, asistenteData) => {
        const { nombres, apellidos, fecha_nacimiento, email, celular } = asistenteData;
        const [result] = await db.execute(
            `UPDATE asistentes SET 
            nombres = ?, 
            apellidos = ?, 
            fecha_nacimiento = ?, 
            email = ?, 
            celular = ? 
            WHERE id = ?`,
            [nombres, apellidos, fecha_nacimiento, email, celular, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM asistentes WHERE id = ?', [id]);
        return result;
    },
};

module.exports = Asistente;
