'use strict'

let validator = require('validator');
let Article = require('../models/article');

let controller = {

    save: (req, res) => {
        // Recoger parámetros por post
        let params = req.body;

        // Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_description = !validator.isEmpty(params.description);
        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar!!'
            })
        }

        if (validate_title && validate_description) {
            // Crear el objeto a guardar
            let article = new Article();

            // Asignar valores
            article.title = params.title;
            article.description = params.description;
            article.image = null;

            // Guardar el artículo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
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

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos!!'
            })
        }


    },

    getArticles: (req, res) => {

        var query = Article.find({});

        var last = req.params.last;
        if (last || req.params.last != undefined) {
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos !!!'
                })
            }

            if (!articles) {
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
    },

    getArticle: (req, res) => {

        // Recoger el id de la url
        let articleId = req.params.id;

        // Comprobar que existe

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el artículo !!!'
            })
        }

        // Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo !!!'
                })
            }

            // Devolver en json
            return res.status(404).send({
                status: 'success',
                article
            })
        });

    },

    update: (req, res) => {
        // Recoger el id del articulo por la url
        let articleId = req.params.id;

        // Recoger los datos que llegan por put
        let params = req.body;

        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_description = !validator.isEmpty(params.description);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            })
        }

        if (validate_title && validate_description) {
            // Find and update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    })
                }

                if (!articleUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                })
            })
        } else {
            // Devolver respuesta
            return res.status(404).send({
                status: 'error',
                message: 'La validacion no es correcta !!!'
            })
        }

    },

    delete: (req, res) => {
        // Recoger el id de la url
        let articleId = req.params.id;

        // Find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                })
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el artículo, posiblemente no exista !!!'
                })
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            })
        })
 
    },

    upload: (req, res) => {
        // Configurar el módulo connect multiparty router/article.js
        

        // Recoger el fichero de la petición

        // Conseguir el nombre y la extension del archivo

        // Comprobar la extension, solo imágenes, si es válida borrar el fichero

        // Si todo es válido

        // Buscar el artículo, asignarle el nombre de la imagen y actualizarlo

        return res.status(200).send({
            status: 'success',
            message: 'Soy el método upload !!!'
        })
    }
};

module.exports = controller;