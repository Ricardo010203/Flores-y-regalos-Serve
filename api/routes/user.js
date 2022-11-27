const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');

const mysqlConection = require('../conecctions/conecction');

router.get('/', (req,res) =>{
    mysqlConection.query('select * from users', (err,rows,fields) =>{
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
    mysqlConection.query(`delete from users where id = '${id}'`, [id], (err,rows,fields) =>{
        if(!err){
            res.json('Usuario eliminado');
        }else{
            console.log(err);
        }
    })
});

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
    const salt = bcrypt.genSaltSync(10);
    let passwordhash = await bcrypt.hash(password,salt);
    mysqlConection.query(`insert into users ( user, name, lastName, typeID, dni, phone, rol, password) values ('${user}','${name}','${lastName}','${typeID}','${dni}','${phone}','${rol}','${passwordhash}')`,[user, name, lastName, typeID, dni, phone, rol, passwordhash],
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
      (err,rows,field) =>{
            if(rows.length > 0 /*& !(bcrypt.compareSync(password,rows[0].password))*/){
                let data = JSON.stringify(rows[0]);
                 console.log(data);
                 token = jwt.sign(data,'stil');
                res.json({token});
            }else{
                res.json('Usuario y/o contraseña incorrectos');
            }
    })
    /* const {user, password} = req.body;
    mysqlConection.query('select * from users where user=? and password=?',
    [user,password],
    (err,rows,field) =>{
        if(!err){
            if(rows.length > 0){
                let data = JSON.stringify(rows[0]);
                console.log(data);
                 token = jwt.sign(data,'stil');
                res.json({token});
            }else{
                res.json('Usuario y/o contraseña incorrectos');
            }
            
        }else{
            console.log(err);
        }
    })*/
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

router.post('/comparar', async(req,res) =>{
    const hash = '$2a$10$qy6V.jb1A26qG/H9qzTbveF/n5ugPV9q5';
    const pass = '1234';
    let hola = bcrypt.compareSync(pass, hash);
    console.log( bcrypt.compareSync("1234", hash));
    res.json(hola);
});

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