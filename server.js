const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const createError = require('http-errors');

//conexion con la bd
mongoose
    //.connect('mongodb://127.0.0.1:27017/empleados') LOCAL
    .connect('mongodb+srv://diegoorti22:rOuOk66JzEl4s9J3@cluster0.by8vvhq.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0')
    .then((x) => {
        console.log(`Conectado a la BD: "${x.connections[0].name}"`);
    })
    .catch((error) => {
        console.log('Error en la conexion:', error.reason)
    })  

//configuracion del servidor web
const empleadoRoutes = require('./routes/empleado.routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false,
}))

app.use(cors())

app.use('/api',empleadoRoutes)

// Ruta raíz para Render
app.get('/', (req, res) => {
  res.send('Servidor backend de empleados activo 🚀');
});

//habilitamos el puerto 
const port = process.env.PORT || 4000
const server = app.listen(port,()=>{
    console.log('Servidor escuchando en el puerto: '+port);
})

//manejador de error 404
app.use((req,res,next)=>{
    next(createError(404))
})

//manejador de errores
app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)    
})