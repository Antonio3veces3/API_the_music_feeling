const { json } = require('body-parser');
let mysql= require('../../database/mysql');
module.exports={
    listar: (req,res)=>{
        mysql.query('SELECT * FROM users WHERE usuario!="" ',(err,rows,fields)=>{
            if(!err)
            res.json(rows);
            else
            res.json(err);
        })
    },
    buscarId: (req,res)=>{
        let id= req.params.id;
        console.log('buscas id: '+id);
        mysql.query('SELECT * FROM users WHERE id_user=?',id,(err,rows,fields)=>{
            if(!err)
            res.json(rows);
            else
            res.json(err);
        })
    },
    entradasUser: (req,res)=>{
        let id= req.params.id;
        console.log('entradas de user: '+id);
        mysql.query('CALL mostrar_entradas_de_user(?)',id,(err,rows,fields)=>{
            if(!err){
                rows.pop();
                res.json(rows);
            }
            else
            res.json(err);
        })
    },
    agregarUser: (req,res)=>{
        mysql.query('INSERT INTO users SET ?',req.body,(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: "User agregado correctamente"});
            else
            res.json(err);
        })
    },
    deleteUser: (req,res)=>{
        let id= req.params.id;
        mysql.query('UPDATE users SET usuario="", password="", tipo="",celular="" WHERE id_user=?',id,(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: "User eliminado correctamente"});
            else
            res.json(err);
        })
    },
    updateUser: (req,res)=>{
        let id= req.params.id;
        let b= req.body; 
        mysql.query('CALL update_user(?,?,?,?,?)',[b.usuario,b.password,b.tipo,b.celular,id],(err,rows,fields)=>{
            if(!err){
                res.json({mensaje: "User actualizado correctamente"});
            }else
            res.json(err);
        })
    },
    addEntrada: (req,res)=>{
        let id= parseInt(req.params.id); 
        let concierto= parseInt(req.body.id_concierto);
        console.log(concierto,' ',id);
        mysql.query('INSERT INTO entradas (id_concierto,id_user) VALUES(?,?)',[concierto,id],(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: "Entrada agregada correctamente"});
            else
            res.json(err);
        });
    },
    verEntrada: (req,res)=>{
        let idUser= req.params.id;
        let idEntrada= req.params.iden;
        console.log(idUser,idEntrada);
        mysql.query('CALL ver_entrada(?,?)',[idUser,idEntrada],(err,rows,fields)=>{
            if(!err){
                rows.pop();
                res.json(rows);
            }
            else
            res,json(err);
        });
    },
    deleteEntrada: (req,res)=>{
        let idUser= req.params.id;
        let idEntrada= req.params.iden;
        mysql.query('DELETE FROM entradas WHERE id_user=? AND id_entrada=?;',[idUser,idEntrada],(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: "Entrada eliminada correctamente"});
            else
            res.json(err);
        })
    }
}
