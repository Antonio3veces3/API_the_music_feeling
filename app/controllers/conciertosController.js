let mysql= require('../../database/mysql');
module.exports={
    list: (req,res)=>{
        mysql.query('SELECT * FROM conciertos WHERE estado="DISPONIBLE"',(err,rows,fields)=>{
            if(!err)
            res.json(rows);
            else
            res.json(err);
        })
    },
    create: (req,res)=>{
        console.log(req.body);
        mysql.query('INSERT INTO conciertos SET ?',req.body,(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: "Evento creado correctamente"});
            else
            res.json(err);
        })
    },
    searchId: (req,res)=>{
        let id= req.params.id; 
        console.log('El id que buscas es: '+id);
        mysql.query('SELECT * FROM conciertos WHERE id_concierto=?',id,(err,rows,fields)=>{
            if(!err)
            res.json(rows);
            else
            res.json(err); 
        }); 
    },
    delete: (req,res)=>{
        let id= req.params.id;
        console.log('vas a eliminar el id: '+id);
        mysql.query('UPDATE  conciertos SET estado="ELIMINADO" where id_concierto=?',id,(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: "Concierto eliminado correctamente"});
            else
            res.json(err);
        })
    },
    update: (req,res)=>{
        let id= req.params.id;
        let body= req.body; 
        console.log('vas a editar concierto id: '+id)
        mysql.query('CALL update_concierto(?,?,?,?,?,?,?,?,?)',[body.estado,body.nombre,body.lugar,body.ciudad,body.pais,body.fecha,body.hora,body.precio,id],(err,rows,field)=>{
            if(!err)
            res.json({mensaje: "Concierto actualizado correctamente"});
            else
            res.json(err);
        })
    },
    listBandas: (req,res)=>{
        let id= req.params.id; 
        mysql.query('SELECT * from bandas WHERE id_concierto=? AND nombre_banda!="";',id,(err,rows,fields)=>{
            if(!err)
            res.json(rows);
            else
            res.json(err);
        })
    },
    addBanda: (req,res)=>{
        let id= req.params.id; 
        let banda= req.body.nombre_banda;
        mysql.query('INSERT INTO bandas (nombre_banda,id_concierto) VALUES (?,?)',[banda,id],(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: 'agregada correctamente'});
            else
            res.json(err);
        })
    },
    updateBanda: (req,res)=>{
        let idbanda= req.params.banda;
        let nombre= req.body.nombre_banda; 
        mysql.query('UPDATE bandas SET nombre_banda=? where id_banda=?',[nombre,idbanda],(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: 'Actualizado correctamente'});
            else
            res.json(err);
        })
    },
    deleteBanda: (req,res)=>{
        let id= req.params.banda; 
        mysql.query('UPDATE bandas SET nombre_banda="" where id_banda=?',id,(err,rows,fields)=>{
            if(!err)
            res.json({mensaje: 'Eliminada correctamente'});
            else
            res.json(err);
        })
    },
    idBanda: (req,res)=>{
        let id= req.params.banda; 
        mysql.query('SELECT * FROM bandas where id_banda=?',id,(err,rows,fields)=>{
            if(!err)
            res.json(rows);
            else
            res.json(err);
        })
    }

}
