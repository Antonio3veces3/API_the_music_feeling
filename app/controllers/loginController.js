let mysql= require('../../database/mysql');
var jwt= require('jsonwebtoken');
var config= require('../config/config');
var express= require('express')
var app= express();
app.set('llave',config.llave);
module.exports={
    validarLogin: (req,res)=>{
        let user= req.body.usuario;
        let pass= req.body.password;
        if(!user || !pass)
        res.json({mensaje: 'Datos incompletos'});
        else{
            mysql.query('SELECT * FROM administradores WHERE usuario=? AND password=?',[user,pass],(err,rows,fields)=>{
                if(!err){
                    if(rows.length!=0){
                        const payload= {check: true};
                        const token= jwt.sign(payload, app.set('llave'),{expiresIn: 5000});
                        res.json({mensaje: 'Acceso autorizado', rows: rows, token: token});
                    }else{
                        res.json({mensaje: 'El usuario no existe'});
                    }
                }
            })
        }
    }
}