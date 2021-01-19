let database= JSON.parse(localStorage.getItem("bd"));
if(!database || database==undefined){
    database= {token: '',user:''}
} 

document.getElementById('btnlogin').addEventListener('click',()=>{
    let user= document.getElementById('user').value;
    let pass= document.getElementById('contraseña').value;

    var data= {usuario: user, password: pass};
    fetch('http://localhost:1338/login/',{method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
    }).then(response=> response.json())
    .then(json=>{
        console.log(json);
        if(json.mensaje=='Acceso autorizado')
        {
            database.token= json.token;
            database.user=user;
            localStorage.clear();
            localStorage.setItem("bd",JSON.stringify(database));
            alert('ACCESO AUTORIZADO');
            location.replace("index.html")

        }else{
            alert(json.mensaje);
        }
      
    })
});
