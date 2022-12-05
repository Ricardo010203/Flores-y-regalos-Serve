const express = require('express');
const router = express.Router();

const mysqlConection = require('../conecctions/conecction');


router.get('/', (req,res) =>{
    mysqlConection.query('select pagoxproveedor.id, pagoxproveedor.totalPago, pagoxproveedor.descripcion, providers.name FROM pagoxproveedor inner join providers on pagoxproveedor.idProvider = providers.id', 
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
    mysqlConection.query(`select * from pagoxproveedor where id ='${id}'`, [id],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/:id', async (req,res) => {
    const { id } = req.params;
    const { totalPago, fecha, descripcion} = req.body;
    mysqlConection.query(`insert into pagoxproveedor ( idProvider, totalPago, fecha, descripcion) values ('${id}','${totalPago}','${fecha}','${descripcion}')`,[id, totalPago, fecha, descripcion],
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
    const { totalPago, fecha, descripcion} = req.body;
    mysqlConection.query(`update pagoxproveedor set totalPago='${totalPago}', fecha='${fecha}', descripcion='${descripcion}' where id='${id}' `,[id, totalPago, fecha, descripcion],
    (err,rows,field) =>{
        if(!err){
            
            res.json('pago actualizado');
            
        }else{
            console.log(err);
        }
    })
});

router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    mysqlConection.query(`delete from pagoxproveedor where id='${id}' `,[id],
    (err,rows,field) =>{
        if(!err){
            
            res.json('pago eliminado');
            
        }else{
            console.log(err);
        }
    })
});


module.exports = router;