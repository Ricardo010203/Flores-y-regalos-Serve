const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');

const mysqlConection = require('../conecctions/conecction');

router.get('/', (req,res) =>{
    mysqlConection.query('select * from users where habilitado = 1', (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/:id', (req,res) =>{
    const {id} = req.params;
    mysqlConection.query(`select * from users where id ='${id}'`, [id],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    mysqlConection.query(`update users set habilitado=0 where id = '${id}'`, [id], (err,rows,fields) =>{
        if(!err){
            res.json('Usuario eliminado');
        }else{
            console.log(err);
        }
    })
});
/*
router.delete('/:id', (req,res) => {
    const {id} = req.params;
    mysqlConection.query(`delete from users where id = '${id}'`, [id], (err,rows,fields) =>{
        if(!err){
            res.json('Usuario eliminado');
        }else{
            console.log(err);
        }
    })
});*/

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const { user, name, lastName, typeID, dni, phone, rol,  password } = req.body;
    mysqlConection.query(`update users set user='${user}', name='${name}', lastName='${lastName}', typeID='${typeID}', dni='${dni}', phone='${phone}', rol='${rol}', password='${password}' where id='${id}'`, [id,user, name, lastName, typeID, dni, phone, rol, password],  (err,rows,fields) =>{
        if(!err){
            res.json('Usuario editado');
        }else{
            console.log(err);
        }
    })
});

router.post('/', async (req,res) => {
    const { user, name, lastName, typeID, dni, phone, rol,  password } = req.body;
    const habilitado = 1;
    const salt = bcrypt.genSaltSync(10);
    let passwordhash = await bcrypt.hash(password,salt);
    mysqlConection.query(`insert into users ( user, name, lastName, typeID, dni, phone, rol, password, habilitado) values ('${user}','${name}','${lastName}','${typeID}','${dni}','${phone}','${rol}','${passwordhash}','${habilitado}')`,[user, name, lastName, typeID, dni, phone, rol, passwordhash, habilitado],
    (err,rows,field) =>{
        if(!err){
            
            res.json('Usuario creado');
            
        }else{
            console.log(err);
        }
    })
});

router.post('/singin', async (req,res) =>{
    const {user, password} = req.body;
    mysqlConection.query('select * from users where user=?',
    [user],
      async (err,rows,field) =>{
            if(rows.length > 0 & ( bcrypt.compareSync(password,rows[0].password))){
                let data = JSON.stringify(rows[0]);
                 console.log(data);
                 token = jwt.sign(data,'stil');
                res.json({token});
            }else{
                res.json('Usuario y/o contraseña incorrectos');
            }
    })
});

router.post('/rol', async (req,res) =>{
    const {user, password} = req.body;
    mysqlConection.query('select * from users where user=?',
    [user],
      (err,rows,field) =>{
            if(rows.length > 0 ){
                let data = JSON.stringify(rows[0].rol);
                 console.log(data);
                res.json(data);
            }else{
                res.json('Usuario y/o contraseña incorrectos');
            }
    })
   
});


router.post('/test', verifyToken,(req,res) =>{
    res.json('Informacion secreta');
});

/*
router.post('/comparar', async(req,res) =>{
    const password = "12345";
    const salt = bcrypt.genSaltSync(10);
    let hash = await bcrypt.hash(password,salt);
    let hashed = '$2a$10$9KYt.D2bW18MSbtj0nsFbejt51nOV/KYliiRXrAVzL0EvQ0KYYy7a';
    console.log(hash);
    let hola = await bcrypt.compare(password, hash);
    console.log( await bcrypt.compare("1234", hashed));
    res.json(hola);
});*/

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');
    
    const token = req.headers.authorization.substr(7);
    if(token !== ""){
        const content = jwt.verify(token,'stil');
        req.data = content;
        next();
    }else{
        res.status(401).json('Token vacio');
    }
}

module.exports = router;