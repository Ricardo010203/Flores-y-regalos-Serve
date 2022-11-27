const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const serve = http.createServer(app);

serve.listen(port);