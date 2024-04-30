var express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');


var app = express();

var postRoute = require("./routes/post.route");

var userRoute = require("./routes/user.route");

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));




const logStream = fs.createWriteStream('log.txt', { flags: 'a' });
app.use(morgan((tokens, req, res) => {
  return [
    new Date().toISOString(), // Hora a la que fue llamado
    'Endpoint:', req.method, req.url, // Método y URL del endpoint
    'Payload:', JSON.stringify(req.body), // Payload con el que se llamó
    'Respuesta:', res.statusCode // Código de respuesta del endpoint
  ].join(' ');
}, { stream: logStream }));

app.use(cors({
    credentials:true,
    origin:'*',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
}));
app.use(express.json());



app.use("/",postRoute);
app.use("/",userRoute);


function methodNotImplemented(req, res, next) {
    res.status(501).send('Not Implemented');
}
  
  // Implementa el middleware en tu aplicación
app.use(methodNotImplemented);


function notFoundHandler(req, res, next) {
    res.status(404).send('Not Found');
}
  
// Middleware para validar el formato del cuerpo de las solicitudes PUT y POST
function validateRequestBody(req, res, next) {
    // Si es una solicitud PUT o POST y no hay datos en el cuerpo o no es un objeto JSON válido
    if ((req.method === 'PUT' || req.method === 'POST') && (!req.body || typeof req.body !== 'object')) {
        res.status(400).send('Bad Request: Request body must be a valid JSON object');
    } else {
        next(); // Pasar al siguiente middleware
    }
}

app.use(notFoundHandler);
app.use(validateRequestBody);


module.exports = app;