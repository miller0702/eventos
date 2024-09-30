const db = require('../config/db');

const Usuario = {
    create: async (nombre, telefono, email, contraseña) => {
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre, telefono, email, contraseña) VALUES (?, ?, ?, ?)',
            [nombre, telefono, email, contraseña]
        );
        return result;
    },
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM usuarios');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, usuarioData) => {
        const { nombre, telefono, email, contraseña } = usuarioData;
        const [result] = await db.execute(
            `UPDATE usuarios SET nombre = ?, telefono = ?, email = ?, contraseña = ? WHERE id = ?`,
            [nombre, telefono, email, contraseña, id]
        );
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Usuario;
