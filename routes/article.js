'use strict'

let express = require('express');
let ArticleController = require('../controllers/article');

let router = express.Router();

// Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test', ArticleController.test);

// Rutas útiles
router.post('/save', ArticleController.save);

module.exports = router;