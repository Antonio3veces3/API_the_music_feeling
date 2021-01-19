var mysql= require('mysql');
var musicFeelingConnection=  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'the_music_feeling'
});

musicFeelingConnection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Database is connected');
    }
})
module.exports= musicFeelingConnection; 