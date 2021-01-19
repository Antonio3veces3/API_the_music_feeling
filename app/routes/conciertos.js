const { Router } = require('express');
const { changeUser } = require('../../database/mysql');
var conciertosController= require('../controllers/conciertosController');
var router= require('express').Router()

router.get('/', (req,res)=>{
    conciertosController.list(req,res);
})

router.get('/:id', (req,res)=>{
    conciertosController.searchId(req,res);
})

router.post('/', (req,res)=>{
    conciertosController.create(req,res);
})

router.put('/:id', (req,res)=>{
    conciertosController.update(req,res);
})

router.delete('/:id', (req,res)=>{
    conciertosController.delete(req,res);
})
router.get('/:id/bandas/:banda',(req,res)=>{
    conciertosController.idBanda(req,res);
})
router.post('/:id/bandas/',(req,res)=>{
    conciertosController.addBanda(req,res);
})
router.put('/:id/bandas/:banda',(req,res)=>{
   conciertosController.updateBanda(req,res);
})
router.delete('/:id/bandas/:banda',(req,res)=>{
    conciertosController.deleteBanda(req,res);
})
router.get('/:id/bandas/',(req,res)=>{
    conciertosController.listBandas(req,res);
})

module.exports= router;