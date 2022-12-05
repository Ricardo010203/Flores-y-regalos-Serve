const express = require('express');
const mysqlConection = require('../conecctions/conecction');
const router = express.Router();


router.get('/mes', async (req,res) => {
    mysqlConection.query(`call total_ganancias()`,
    (err,rows,field) =>{
        if(!err){
            const gastos = rows[0][0].totalGastos;
            const ganancia = rows[1][0].totalVentas;
            const total = ganancia - gastos;
            res.json(total);
            
        }else{
            console.log(err);
        }
    })
});

router.get('/dia', async (req,res) => {
    mysqlConection.query(`call total_ganancias_dia()`,
    (err,rows,field) =>{
        if(!err){
            const gastos = rows[0][0].totalGastos;
            const ganancia = rows[1][0].totalVentas;
            const total = ganancia - gastos;
            res.json(total);
            
        }else{
            console.log(err);
        }
    })
});

router.get('/semana', async (req,res) => {
    mysqlConection.query(`call total_ganancias_semana()`,
    (err,rows,field) =>{
        if(!err){
            const gastos = rows[0][0].totalGastos;
            const ganancia = rows[1][0].totalVentas;
            const total = ganancia - gastos;
            res.json(total);
            
        }else{
            console.log(err);
        }
    })
});

module.exports = router;