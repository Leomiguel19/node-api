'use strict'

let express = require('express');
let ArticleController = require('../controllers/article');

let router = express.Router();

router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test', ArticleController.test);

module.exports = router;