'use strict'

// Cargar módulos de node para crear el servidor
let express = require('express');
let bodyParser = require('body-parser');

// Ejecutar express (http)
let app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas


// Ruta o método de prueba
/*
app.get('/probando', (req,res) =>{
    
    return res.status(200).send({
        area: 'Practicando nodeJS',
        autor: 'Leonardo Guilarte',
        url: 'leomiguel.com'
    })
})
*/

// Exportar modulo (fichero actual)
module.exports = app;