
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;   
        this.usuariosPath = '/api/usuarios';
    
        // Conectar a BD
        this.conectarDB();
        

        this.middlewares();
        this.routes();   
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }

}

module.exports = Server;