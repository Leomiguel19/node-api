'use strict'

let mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api_rest_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('La conexión a la base de datos correcta!!!')
}).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
});