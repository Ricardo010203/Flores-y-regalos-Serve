const express = require('express');
const mysqlConection = require('../conecctions/conecction');
const router = express.Router();

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
});

router.delete('/todo', async (req,res) => {
    mysqlConection.query(`delete from detalle_temp`,
    (err,rows,field) =>{
        if(!err){
            
            res.json('orden eliminada');
            
        }else{
            console.log(err);
        }
    })
});

router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    mysqlConection.query(`delete from detalle_temp where id='${id}' `,[id],
    (err,rows,field) =>{
        if(!err){
            
            res.json('orden eliminada');
            
        }else{
            console.log(err);
        }
    })
});

router.get('/', (req,res) =>{
   // const {token} = req.body;
    mysqlConection.query(`SELECT detalle_temp.id, detalle_temp.cantidad, detalle_temp.precio, producto.nombre FROM detalle_temp INNER join producto on detalle_temp.idProducto = producto.id`, (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/factura', async (req,res) => {
    const { tipo, token} = req.body;
    mysqlConection.query(`call proceso_venta('${tipo}','${token}')`,[ tipo, token],
    (err,rows,field) =>{
        if(!err){
            
            res.json('orden tomada');
            
        }else{
            console.log(err);
        }
    })
});

router.get('/ventas', async (req,res) => {
    mysqlConection.query(`SELECT venta.id, venta.fecha, venta.total, ventaxproducto.idProducto, ventaxproducto.cantidad FROM venta INNER join ventaxproducto on venta.id = ventaxproducto.idVenta`
    //mysqlConection.query('select * from venta'
    , (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/fecha', async (req,res) => {
    const {fecha} = req.body;
    mysqlConection.query(`SELECT venta.id, venta.fecha, venta.total, ventaxproducto.idProducto, ventaxproducto.cantidad FROM venta INNER join ventaxproducto on venta.id = ventaxproducto.idVenta where fecha ='${fecha}'`, [fecha], (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});


module.exports = router;