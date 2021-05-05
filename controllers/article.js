'use strict'

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
    }
};

module.exports = controller;