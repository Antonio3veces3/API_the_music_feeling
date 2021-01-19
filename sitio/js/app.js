//-------------------------------------------------FUNCION PARA CARGAR USER
let database= JSON.parse(localStorage.getItem("bd"));
const token= database.token; 
function cargarUsuarios(idbtn,idselect){
    document.getElementById(idbtn).addEventListener('click',()=>{
        fetch('http://localhost:1338/themusicfeeling/users/',{
            method: 'GET',
            headers: {'Content-Type': 'application/json','access-token':token}
        }).then((response)=>response.json())
        .then((json)=>{
            let opciones='';
            json.forEach(element=>{
                opciones+=`<option value= '${element.id_user}'> ${element.id_user}: ${element.usuario} </option>`;
            });
            document.getElementById(idselect).innerHTML=opciones;
        });
    })
}
cargarUsuarios('cargarupdate','updateselect');
cargarUsuarios('cargarusers','deleteselect');
cargarUsuarios('cargarsearch','searchselect');
cargarUsuarios('cargarentrada','usersentrada');

//-------------------------------------------------FUNCION PARA CARGAR SELECT CONCIERTOS
function cargarconciertos(btnid,selectid){
    document.getElementById(btnid).addEventListener('click',()=>{
        fetch('http://localhost:1338/themusicfeeling/conciertos/',{
            method: 'GET',
            headers: {'Content-Type': 'application/json','access-token':token}
        }).then((response)=>response.json())
        .then((json)=>{
            let opciones='';
            json.forEach(element=>{
                opciones+=`<option value= '${element.id_concierto}'> ${element.id_concierto}: ${element.nombre} </option>`;
            });
            document.getElementById(selectid).innerHTML=opciones;
        });
    })
}
cargarconciertos('cargarentrada','conciertosentrada');
cargarconciertos('refrescarCon','idCon');

//-------------------------------------------------FUNCION PARA BUTTON OCULTAR
function ocultarInfo(btnid,iddiv){
    document.getElementById(btnid).addEventListener('click',()=>{
        let div= document.getElementById(iddiv);
        div.style.display='none';
    })
}

ocultarInfo('ocultarsearch','verentradas');
ocultarInfo('hideInfo','verConciertos');
ocultarInfo('btnocultar','resBusqueda');
ocultarInfo('ocultarusers','verusers');
ocultarInfo('ocultarapi','infoapi')

document.getElementById('token').innerHTML+=`
<p><b><i>!! BIENVENIDO !!<i></b> <b>${database.user}, tu token es: </b>${database.token}</p>
`

//-------------------------------------------------BTN PARA MOSTRAR CONCIERTOS DISPONIBLES
document.getElementById("conciertos").addEventListener('click',()=>{

    fetch('http://localhost:1338/themusicfeeling/conciertos/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 'access-token': token
        }
    }).then(res=> res.json())
    .then((json) =>{
        let conciertos="";
        json.forEach(element => {
            conciertos+=`<h3>ID: ${element.id_concierto}</h3>
            <p><b>Estado:${element.estado}</b> </p>
            <p><b>Nombre:</b> ${element.nombre}</p>
            <p><b>Lugar:</b> ${element.lugar}</p>
            <p><b>Ciudad:</b>${element.ciudad}</p>
            <p><b>Pais:</b> ${element.pais}</p>
            <p><b>Fecha:</b> ${element.fecha}</p>
            <p><b>Hora:</b> ${element.hora}</p>
            <p><b>Precio:</b> ${element.precio}</p>
            <p>---------------------------------------------</p>
            `
        });
        let div=document.getElementById('verConciertos');
        div.style.display='inline';
        div.innerHTML=conciertos;
    })
    .then(response=> console.log('Success: ',response))
    .catch(error => console.log('error: ',error));
});

//-------------------------------------------------MOSTRAR INFO DE CONCIERTO CUANDO SELECCIONES UNA OPOCION DE SELECT
document.getElementById('idCon').addEventListener('change',()=>{
    let div= document.getElementById('resBusqueda');
    div.style.display='inline';
    let opcion= document.getElementById('idCon').value;
    let url= 'http://localhost:1338/themusicfeeling/conciertos/'+opcion;
    let urlbandas= url+'/bandas';
    let info='';
    fetch(url,{
        method: 'GET', headers: {'access-token':token}
    }).then(response=>response.json())
    .then(
        json=>{
            json.forEach(element=>{
                info+=`<h3>ID: ${element.id_concierto}</h3>
                <p><b>Estado: </b> ${element.estado}</p>
                <p><b>Nombre: </b> ${element.nombre}</p>
                <p><b>Lugar: </b> ${element.lugar}</p>
                <p><b>Ciudad: </b> ${element.ciudad}</p>
                <p><b>Pais: </b> ${element.pais}</p>
                <p><b>Fecha: </b> ${element.fecha}</p>
                <p><b>Hora: </b> ${element.hora}</p>
                <p><b>Precio: </b> ${element.precio}</p>
                <p>--------------------------------------------------</p>
                `;
            });
        },
        fetch(urlbandas,{method: 'GET', headers: {'access-token':token}}).then(response=> response.json())
        .then(json=>{
            info+=`<h3>BANDAS</h3>`;
            json.forEach(element=>{
                info+= `<p><b>ID: </b> ${element.id_banda} <b>Nombre: </b> ${element.nombre_banda}</p>`
            })
            div.innerHTML=info;
        })
    );
});

//-----------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------C-R-U-D- PARA USUARIOS-----------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------BTN LISTAR USERS
document.getElementById('btnlistusers').addEventListener('click',()=>{
    let div= document.getElementById('verusers');
    div.style.display='inline'; 
    fetch('http://localhost:1338/themusicfeeling/users/',{method: 'GET', headers: {'access-token':token}}).then(response=>response.json())
    .then(json=>{
        let info= '';
        json.forEach(element => {
            info+= `<h3>ID: ${element.id_user}</h3>
            <p><b>Usuario: </b> ${element.usuario}</p>
            <p><b>Celular: </b> ${element.celular}</p>
            <p>-------------------------------------------</p>`
        });
        div.innerHTML=info; 
    })
}); 

//-------------------------------------------------AGREGAR USER
document.getElementById('adduser').addEventListener('click',()=>{
    let user,pass,tipo,cel; 
    user= document.getElementById('usuario').value;
    pass=document.getElementById('password').value;
    tipo= document.getElementById('tipo').value;
    cel= document.getElementById('celular').value;
    if(!user || !pass || !tipo || !cel){
        window.alert('DATOS INCOMPLETOS');
    }else{
        var datos={usuario: user,password: pass, tipo: tipo,celular: cel};

        fetch('http://localhost:1338/themusicfeeling/users/',{method: 'POST',
        body: JSON.stringify(datos),
        headers: {'Content-Type': 'application/json', 'access-token':token}
        }).then(res=>res.json())
        .then(response=>{alert("Agregado correctamente")});
    }
})




//-----------------ACTUALIZAR USER
document.getElementById('btnactualizar').addEventListener('click',()=>{
    let id,user,pass,tipo,cel, url; 
    id=document.getElementById('updateselect').value;
    user= document.getElementById('upusuario').value;
    pass=document.getElementById('uppassword').value;
    tipo= document.getElementById('uptipo').value;
    cel= document.getElementById('upcelular').value;
    url='http://localhost:1338/themusicfeeling/users/'+id; 
    if(!id || !pass || !tipo || !cel){
        window.alert('DATOS INCOMPLETOS');
    }else{
        var datos={id_user: id, usuario: user,password: pass, tipo: tipo,celular: cel};
        fetch(url,{method: 'PUT',
        body: JSON.stringify(datos),
        headers: {'Content-Type': 'application/json','access-token':token}
        }).then(res=>res.json())
        .then(response=>window.alert('Editado correctamente',response));
    }
})




//-----------------ELIMINAR USER 
document.getElementById('btndelete').addEventListener('click',()=>{
    let opcion= document.getElementById('deleteselect').value; 
    myurl= 'http://localhost:1338/themusicfeeling/users/'+opcion;

    fetch(myurl,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json','access-token':token}
    }).then(response=> response.json())
    .then(json=>{alert('Eliminado correctamente')});
})

//-----------------MOSTRAR ENTRADAS DE USUARIO
document.getElementById('searchselect').addEventListener('change',()=>{
    let div= document.getElementById('verentradas');
    div.style.display='inline';
    let id= document.getElementById('searchselect').value;
    let url= 'http://localhost:1338/themusicfeeling/users/'+id+'/entradas';
    let info='';
    fetch(url,{method: 'GET', headers: {'access-token':token}}).then(response=>response.json())
    .then(json=>{
        if(json[0].length==0){
            div.innerHTML=`<p><b><i>El usuario no tiene entradas</i></b></p>`
        }else{
        json.forEach(element=>{
            element.forEach(sub=>{
                info+=`<h3>Id entrada: ${sub.id_entrada}</h3>
                <p><b>Id usuario: </b> ${sub.id_user}</p>
                <p><b>Usuario: </b> ${sub.usuario}</p>
                <p><b>Id concierto: </b> ${sub.id_concierto}</p>
                <p><b>Estado: </b> ${sub.estado}</p>
                <p><b>Nombre: </b> ${sub.nombre}</p>
                <p><b>Lugar: </b> ${sub.lugar}</p>
                <p><b>Ciudad: </b> ${sub.ciudad}</p>
                <p><b>Pais: </b> ${sub.pais}</p>
                <p><b>Fecha: </b> ${sub.fecha}</p>
                <p><b>Hora: </b> ${sub.hora}</p>
                <p><b>Precio: </b> ${sub.precio}</p>`
            })
        })
        div.innerHTML=info;
        }
    })
})

//------------------REGISTRAR ENTRADA A UN USER
document.getElementById('btnentrada').addEventListener('click',()=>{
    let iduser= document.getElementById('usersentrada').value;
    let idconcierto= document.getElementById('conciertosentrada').value;
    let url= 'http://localhost:1338/themusicfeeling/users/'+iduser+'/entradas/'; 
    var datos={id_concierto: idconcierto, id_user: iduser};
    fetch(url,{method: 'POST',
    body: JSON.stringify(datos),
    headers: {'Content-Type': 'application/json','access-token':token}
    }).then(res=>res.json())
    .then(json=>{alert("Entrada registrada correctamente")});
})

//------------------------------USAR API WEATHERSTACK
//-----------CARGAR CONCIERTOS CON VALUE= CIUDAD
document.getElementById('cargarciudad').addEventListener('click',()=>{
    fetch('http://localhost:1338/themusicfeeling/conciertos/',{
        method: 'GET',
        headers: {'Content-Type': 'application/json','access-token':token}
    }).then((response)=>response.json())
    .then((json)=>{
        let opciones='';
        json.forEach(element=>{
            opciones+=`<option value= '${element.ciudad}'> ${element.id_concierto}: ${element.nombre} </option>`;
        });
        document.getElementById('selectciudad').innerHTML=opciones;
    });
})
//------------MOSTRAR CLIMA DE LA CIUDAD DEL CONCIERTO CON OPCION SELECT
document.getElementById('selectciudad').addEventListener('change',()=>{
    var div= document.getElementById('infoapi');
    div.style.display='inline';
    let opcion= document.getElementById('selectciudad').value;
    let cd= convertirCiudad(opcion);
    let request= new XMLHttpRequest();
    url= 'http://api.weatherstack.com/current?access_key=f9f561faa09cbbf57f719a3a484f944e&query='+cd
    request.open('GET',url);
    request.onload=function(){
    let data= JSON.parse(this.response);
    console.log(data);
    div.innerHTML=`
    <p><b>Ciudad: </b>${data.location.name}</p>
    <p><b>Zona horaria: </b> ${data.location.timezone_id}</p>
    <p><b>Hora local: </b> ${data.location.localtime}</p>
    <p><b>Temperatura: </b> ${data.current.temperature} °C</p>
    <p><b>Estado del clima: </b> ${data.current.weather_descriptions}</p>
    <p><b>Sensacion termica: </b> ${data.current.feelslike} °C</p>
    <p><b>Viento speed: </b> ${data.current.wind_speed} m/s</p>
    <p><b>Humedad: </b> ${data.current.humidity} %</p>`
    }
    request.send();
})

function convertirCiudad(ciudad){
    let country= ciudad;
    let acountry= new Array();
    for(let i=0; i<country.length;i++){
        if(country[i]==' '){
            acountry.push('_');
        }else{
            acountry.push(country[i]);
        }
    }
    let ncountry='';
    for(let x=0; x<acountry.length;x++){
        ncountry+=acountry[x];
    }
    return ncountry;
}
//-------------CERRAR SESION
document.getElementById('cerrarsesion').addEventListener('click',()=>{
    database.token='';
    database.user='';
    localStorage.setItem('bd',JSON.stringify(database));
    alert("Hasta la proxima");
    location.replace("login.html");
})