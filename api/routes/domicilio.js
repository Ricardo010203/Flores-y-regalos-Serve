const express = require('express');
const mysqlConection = require('../conecctions/conecction');
const router = express.Router();
/*
router.post('/', async (req,res) => {
    const { codigo, cantidad, token} = req.body;
    mysqlConection.query(`call add_detalle_temp('${codigo}','${cantidad}','${token}')`,[ codigo, cantidad, token],
    (err,rows,field) =>{
        if(!err){
            
            res.json('orden tomada');
            
        }else{
            console.log(err);
        }
    })
});*/

router.post('/', async (req,res) => {
    const { tipo, nombre, direccion, telefono} = req.body;
    mysqlConection.query(`call proceso_domicilio('${tipo}','${nombre}','${direccion}','${telefono}')`,[ tipo, nombre, direccion, telefono],
    (err,rows,field) =>{
        if(!err){
            
            res.json('orden tomada');
            
        }else{
            console.log(err);
        }
    })
});

router.get('/', (req,res) =>{
    // const {token} = req.body;
     mysqlConection.query(`SELECT domicilio.idD, venta.id, domicilio.nombre, domicilio.direccion, domicilio.telefono, venta.total FROM domicilio INNER join venta on domicilio.idVenta = venta.id`, (err,rows,fields) =>{
         if(!err){
             res.json(rows);
         }else{
             console.log(err);
         }
     })
});

router.get('/:id', (req,res) =>{
    const {id} = req.params;
    mysqlConection.query(`select * from domicilio where idD ='${id}'`, [id],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const { nombre, direccion, telefono} = req.body;
    mysqlConection.query(`update domicilio set nombre='${nombre}', direccion='${direccion}', telefono='${telefono}' where idD='${id}'`, [id,nombre, direccion, telefono],  (err,rows,fields) =>{
        if(!err){
            res.json('Domicilio editado');
        }else{
            console.log(err);
        }
    })
});

module.exports = router;