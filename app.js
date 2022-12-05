const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(cors());

//ROUTES
//Usuario
const userRoute = require('./api/routes/user');
app.use('/user',userRoute);
//Proveedor
const proveRoute = require('./api/routes/provider');
app.use('/provider',proveRoute);
//Pago
const pagoRoute = require('./api/routes/pago_proveedor');
app.use('/pago', pagoRoute);
//Producto
const producRoute = require('./api/routes/producto');
app.use('/producto', producRoute);
//Venta
const ventaRoute = require('./api/routes/venta');
app.use('/venta', ventaRoute);
//Domicilio
const domiRoute = require('./api/routes/domicilio');
app.use('/domicilio', domiRoute);
//Ganancias
const gananRoute = require('./api/routes/ganancia');
app.use('/ganancia', gananRoute);


module.exports = app;
