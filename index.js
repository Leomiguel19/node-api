'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api_rest_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('La conexión a la base de datos correcta!!!');

    // Crear servidor y ponerme a escuchar peticiones HTTP
    app.listen(port, () => {
        console.log('Servidor corriendo em http://localhost:'+port)
    })

}).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
});