const express = require('express');
const router = express.Router();

const mysqlConection = require('../conecctions/conecction');

router.get('/', (req,res) =>{
    mysqlConection.query('select * from providers where habilitado = 1', (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/:id', (req,res) =>{
    const {id} = req.params;
    mysqlConection.query(`select * from providers where id ='${id}'`, [id],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});
/*
router.delete('/:id', (req,res) => {
    const {id} = req.params;
    mysqlConection.query(`delete from providers where id = '${id}'`, [id], (err,rows,fields) =>{
        if(!err){
            res.json('Proveedor eliminado');
        }else{
            console.log(err);
        }
    })
});*/

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    mysqlConection.query(`update providers set habilitado=0 where id = '${id}'`, [id], (err,rows,fields) =>{
        if(!err){
            res.json('Usuario eliminado');
        }else{
            console.log(err);
        }
    })
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const { name, nit, typeProduct, phone} = req.body;
    mysqlConection.query(`update providers set name='${name}', nit='${nit}', typeProduct='${typeProduct}', phone='${phone}' where id='${id}'`, [id,name, nit, typeProduct, phone],  (err,rows,fields) =>{
        if(!err){
            res.json('Proveedor editado');
        }else{
            console.log(err);
        }
    })
});

router.post('/', async (req,res) => {
    const { name, nit, typeProduct, phone } = req.body;
    mysqlConection.query(`insert into providers ( name, nit, typeProduct, phone) values ('${name}','${nit}','${typeProduct}','${phone}')`,[name, nit, typeProduct, phone],
    (err,rows,field) =>{
        if(!err){
            
            res.json('Proveedor creado');
            
        }else{
            console.log(err);
        }
    })
});


module.exports = router;