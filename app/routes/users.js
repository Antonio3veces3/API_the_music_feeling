var usersController= require('../controllers/usersControllers');
var router= require('express').Router()

router.get('/',(req,res)=>{
    usersController.listar(req,res);
})

router.get('/:id',(req,res)=>{
    usersController.buscarId(req,res);
})

router.get('/:id/entradas',(req,res)=>{
    usersController.entradasUser(req,res);
})

router.post('/', (req,res)=>{
    usersController.agregarUser(req,res);
})

router.put('/:id',(req,res)=>{
    usersController.updateUser(req,res);
})

router.delete('/:id',(req,res)=>{
    usersController.deleteUser(req,res);
})

router.post('/:id/entradas/',(req,res)=>{
    usersController.addEntrada(req,res);
})
router.get('/:id/entradas/:iden',(req,res)=>{
    usersController.verEntrada(req,res);
})
router.delete('/:id/entradas/:iden',(req,res)=>{
    usersController.deleteEntrada(req,res);
})

module.exports= router;