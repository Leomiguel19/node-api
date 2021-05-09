'use strict'

let express = require('express');
let ArticleController = require('../controllers/article');

let router = express.Router();

let multipart = require('connect-multiparty');
let md_upload = multipart({ uploadDir: './upload/articles'});

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id', md_upload, ArticleController.upload);

module.exports = router;