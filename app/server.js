var express= require('express')
var app= express()
var cors= require('cors')
var bodyParser= require('body-parser')
const { Router } = require('express')
var mysql= require('../database/mysql');
var jwt= require('jsonwebtoken');
var config= require('./config/config');
app.set('llave',config.llave);
var port= process.env.PORT || 1338

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const rutasProtegidas= express.Router();
rutasProtegidas.use((req,res,next)=>{
    const token= req.headers['access-token'];
    console.log(req.headers);
    if(token){
        jwt.verify(token, app.get('llave'),(err,decoded)=>{
            if(err)
            return res.json({mensaje: 'token invalido'});
            else{
                req.decoded= decoded;
                next();
            }
        })
    }else{
        res.json({mensaje: 'token invalido'});
    }
})

var router= require('./routes')
var login= require('./routes/login');
app.use('/',login);
const { json } = require('body-parser')
app.use('/themusicfeeling',rutasProtegidas,router)
app.listen(port,()=>console.log('Listening on: '+port));
/*
var rutaValidar= require('express').Router();
rutaValidar.post('/login',(req,res)=>{
    let user= req.body.usuario;
    let pass= req.body.password;
    if(!user || !pass)
    res.json({mensaje: 'Datos incompletos'});
    else{
        mysql.query('SELECT * FROM administradores WHERE usuario=? AND password=?',[user,pass],(err,rows,fields)=>{
            if(!err){
                if(rows.length!=0){
                    const payload= {check: true};
                    const token= jwt.sign(payload, app.set('llave'),{expiresIn: 1440});
                    res.json({mensaje: 'Acceso autorizado', rows: rows, token: token});
                }else{
                    res.json({mensaje: 'El usuario no existe'});
                }
            }
        })
    }
})
*/
