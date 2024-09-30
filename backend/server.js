const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

db.getConnection()
    .then((connection) => {
        console.log('Conectado a la Base de Datos');

        app.use(express.json());

        app.use('/api/usuarios', require('./routes/usuario.routes'));
        app.use('/api/eventos', require('./routes/evento.routes'));
        app.use('/api/asistentes', require('./routes/asistente.routes'));
        app.use('/api/inscripciones', require('./routes/inscripcion.routes'));
        app.use('/api/codigos-promocionales', require('./routes/codigoPromocional.routes'));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    });
