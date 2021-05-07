'use strict'

let validator = require('validator');
var Article = require('../models/article');

let controller = {
    
    datosCurso: (req, res) => {
        let hola = req.body.hola;

        return res.status(200).send({
            area: 'Aprendiendo nodeJS',
            autor: 'Leonardo Guilarte',
            url: 'leomiguel.com',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test del controlador de articulos'
        })
    },
    
    save: (req, res) => {
        // Recoger parámetros por post
        let params = req.body; 

        // Validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_description = !validator.isEmpty(params.description);
        }catch(err){
            return res.status(200).send({
                message: 'Faltan datos por enviar!!'
            })
        }

        if(validate_title && validate_description){            
            // Crear el objeto a guardar

            // Asignar valores

            // Guardar el artículo

            // Devolver una respuesta

            return res.status(200).send({
                article: params
            })
        }else{
            return res.status(200).send({
                message: 'Los datos no son válidos!!'
            })
        }


    }
};

module.exports = controller;