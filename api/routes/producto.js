const express = require('express');
const mysqlConection = require('../conecctions/conecction');
const router = express.Router();

router.get('/', (req,res) =>{
    mysqlConection.query('SELECT producto.id, producto.price, producto.nombre, producto.stock, providers.name FROM `producto` INNER join providers on producto.idProvider = providers.id', 
    (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/:id', (req,res) =>{
    const {id} = req.params;
    mysqlConection.query(`select * from producto where id ='${id}'`, [id],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/name', (req,res) =>{
    const {nombre} = req.body;
    mysqlConection.query(`SELECT producto.id, producto.price, producto.nombre,producto.stock,providers.name FROM producto inner join providers on producto.idProvider = providers.id WHERE producto.nombre = '${nombre}'`, [nombre],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/:id', async (req,res) => {
    const { id } = req.params;
    const { nombre, description, price, stock} = req.body;
    mysqlConection.query(`insert into producto ( nombre, description, price, stock, idProvider) values ('${nombre}','${description}','${price}','${stock}','${id}')`,[id, nombre, description, price, stock],
    (err,rows,field) =>{
        if(!err){
            
            res.json('pago realizado');
            
        }else{
            console.log(err);
        }
    })
});

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const { nombre, description, price, stock} = req.body;
    mysqlConection.query(`update producto set nombre='${nombre}', description='${description}', price='${price}', stock='${stock}' where id='${id}' `,[id, nombre, description, price, stock],
    (err,rows,field) =>{
        if(!err){
            
            res.json('producto actualizado');
            
        }else{
            console.log(err);
        }
    })
});

router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    mysqlConection.query(`delete from producto where id='${id}' `,[id],
    (err,rows,field) =>{
        if(!err){
            
            res.json('producto eliminado');
            
        }else{
            console.log(err);
        }
    })
});



module.exports = router;