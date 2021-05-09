'use strict'

let validator = require('validator');
let Article = require('../models/article');

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
            let article = new Article();
            
            // Asignar valores
            article.title = params.title;
            article.description = params.description;
            article.image = null;

            // Guardar el artículo
            article.save((err, articleStored) => {
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El artículo no se ha guardado'
                    })
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                })                
            })

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos!!'
            })
        }


    }, 

    getArticles: (req, res) => {
        // Find
        Article.find({}.sort('id')).exec((err, articles) => {
            
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos !!!'
                })
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar !!!'
                })
            }

            return res.status(200).send({
                status: 'success',
                articles
            })
        })
    }
};

module.exports = controller;