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
//Covenio
//const conveRoute = require('./api/routes/convenio');
//app.use('/convenio', conveRoute);


module.exports = app;
