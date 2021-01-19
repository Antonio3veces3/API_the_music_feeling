var router= require('express').Router()

var conciertos= require('./conciertos')
router.use('/conciertos',conciertos);
var users= require('./users')
router.use('/users',users);

router.get('/',(req,res)=>{
    res.status(200).json({mensaje: "Bienvenido, Estas conectado a la API The Music Feeling"})
})

module.exports= router; 