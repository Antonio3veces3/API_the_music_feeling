var loginController=require('../controllers/loginController');
var router= require('express').Router();
router.post('/login',(req,res)=>{
    loginController.validarLogin(req,res);
})

module.exports= router;