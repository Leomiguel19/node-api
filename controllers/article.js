'use strict'

let validator = require('validator');
let fs = require('fs');
let path = require('path');

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
        let file_name = 'Imagen no subida'

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            })
        }

        // Conseguir el nombre y la extension del archivo
        let file_path = req.files.file0.path;

        // * ADVERTENCIA * En caso de estar linux o mac, esta línea va así :
        let file_split = file_path.split('/');
        // * ADVERTENCIA * En caso de estar windows, iria así :
        // let file_split = file_path.split('\');

        // Nombre del archivo
        file_name = file_split[2];

        // Extension del fichero 
        let extension_split  = file_name.split('\.');
        let file_ext = extension_split[1];

        // Comprobar la extension, solo imágenes, si es válida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            // Borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status: 'error',
                    message: 'La extensión del archivo no es válida !!!'
                })
            })
        }else{
            // Si todo es válido, sacando id de la url
            let articleId = req.params.id;

            // Buscar el artículo, asignarle el nombre de la imagen y actualizarlo
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdated) =>{
                
                if(err || !articleUpdated){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al guardar la imagen del articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated 
                });    
            });
        }
    },// end upload method

    getImage: (req, res) => {
         let file = req.params.image;
         let path_file = './upload/articles/'+file;

         fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendfile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                })
            }
         });
    },
};

module.exports = controller;