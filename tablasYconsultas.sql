create database the_music_feeling;
use the_music_feeling;
SET SQL_SAFE_UPDATES = 0;
create table users(id_user int auto_increment,
usuario varchar(40)not null,
password varchar(25) not null,
tipo varchar(15) not null,
celular varchar(15) not null,
PRIMARY KEY(id_user));

create table conciertos(id_concierto int auto_increment,
estado varchar(30) not null, 
nombre varchar(100) not null,
lugar varchar(50) not null,
ciudad varchar(30) not null,
pais varchar(30) not null,
fecha date not null,
hora time not null,
precio int(6) not null,
PRIMARY KEY (id_concierto));

create table bandas(id_banda int auto_increment,
nombre_banda varchar (30) not null, id_concierto int not null,
PRIMARY KEY(id_banda));

create table entradas(id_entrada int auto_increment, 
id_concierto int not null,
id_user int not null,
PRIMARY KEY (id_entrada), 
FOREIGN KEY (id_concierto) REFERENCES conciertos(id_concierto),
FOREIGN KEY (id_user) REFERENCES users(id_user));

CREATE TABLE administradores(id_admin int auto_increment, 
usuario varchar(40) not null, password varchar(25) not null, PRIMARY KEY (id_admin));
describe administradores;

INSERT INTO users (usuario,password,tipo,celular)
VALUES("Tony Ramirez","tonymusic","user","312-108-4635"),
("Mezly Mondragon","mezlymusic","user","314-337-3250"),
("Amado Villa","amadomusic","user","312-100-5560");

INSERT INTO conciertos (estado,nombre,lugar,ciudad,pais,fecha,hora,precio)
VALUES ("DISPONIBLE","vive el slam", "Arena de Mexico", "CDMX","Mexico","2021-03-15","20:00:00","5000"),
("DISPONIBLE","Magic tour", "Budokan", "Tokio","Japon","2021-09-21","21:00:00","6000"),
("DISPONIBLE","Music Fest","Madison Square Garden", "New York","USA","2021-07-11","19:00:00",6500);

INSERT INTO bandas(nombre_banda, id_concierto)
VALUES("La maldita vecindad",1), ("Victimas Dr. cerebro",2),("Red Hot Chili Peppers",1),("Caifanes",3),("Soda Stereo",4),
("Los HOMZ",5),("Molotov",2);


INSERT INTO entradas (id_concierto,id_user)
VALUES (1,1),(2,1),(3,2),(1,2);

INSERT INTO entradas(id_concierto,id_user) VALUES(3,4);

INSERT INTO administradores (usuario,password)
VALUES("Antonio Ramirez","antonioadmin"),("Marco Ramirez","marcoadmin");

INSERT INTO bandas(nombre_banda,id_concierto)
VALUES ('El tri',1),('Cafe Tacuva',2),('Jaguares',3),('The hollies',3)
,('Iron Maiden',5),('Heroes del silencio',5);