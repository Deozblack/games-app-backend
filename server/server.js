const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            products:  '/api/products',
            search:     '/api/search',
            histories:     '/api/histories',
        }
        // Conectar a base de datos
        this.connection();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async connection() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // Directorio Público
        this.app.use( express.static('public') );
        // Fileupload - Carga de archivos
        // this.app.use( fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));

    }

    routes() {
        this.app.use( this.paths.products, require('../routes/product.routes'));
        this.app.use( this.paths.search, require('../routes/search.routes'));
        this.app.use( this.paths.histories, require('../routes/histories.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port: ', this.port );
        });
    }

}




module.exports = Server;
