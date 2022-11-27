const mysql = require('mysql');
const {database} = require('./keys');


const mysqlConection = mysql.createConnection(database);

mysqlConection.connect(err =>{
    if(err){
        console.log('Error en BD',err);
        return;
    }else{
        console.log('Conectado a Base de datos');
    }
});

module.exports = mysqlConection;