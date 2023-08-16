create database BD_Luna;
use BD_Luna;

/* Crear la tabla Almacen */
    create table TAlmacen
    (
        RegistroPrendas VARCHAR(20),
        NroPrendas int,
        RegistroVentas VARCHAR(20)
    );
    
/* Crear la tabla Venta Final */
    create table TVentaFinal
    (
        ID_Venta VARCHAR(20),
		Fecha Date,
        ID_Cliente VARCHAR(50),
        MontoTotal int,
        Productos VARCHAR(100)
    );
    
/* Crear la tabla Prenda Venta */
    create table TPrendaVenta
    (
        ID_Prenda VARCHAR(10),
		Cantidad int
    );
    
/* Crear la tabla Prenda
Previa Normalización :
 Crear la tabla Prendas */
    create table TPrendas
    (
        ID_Prenda VARCHAR(10),
		Nombre VARCHAR(50),
        Precio int, 
        Categoria VARCHAR(50),
        Descripcion VARCHAR(1000)
    );
    
/* Crear la tabla Prenda Venta */
    create table TPrendaDetalles
    (
        ID_Prenda VARCHAR(10),
		Talla VARCHAR(5),
        Color VARCHAR(20), 
        Imagen VARCHAR(250),
        Stock int
    );
/* ******************** Prendas ************************* */
INSERT INTO TPrendas

/* Faldas: */

VALUES('F1', 'falda plisada', 35, 'faldas', 'Faldas ligeras y cómodas');

INSERT INTO TPrendas
VALUES('F2', 'falda sastre', 70, 'faldas', 'Faldas elegantes y geniales para ocasiones especiales');

/* Pantalones: */

INSERT INTO TPrendas
VALUES('PA1', 'baggy jeans', 98, 'pantalones', 'pantalones anchos con rasgado');

INSERT INTO TPrendas
VALUES('PA2', 'pantalón sastre', 70, 'pantalones', 'elegantes y llamativos');

INSERT INTO TPrendas
VALUES('PA3', 'pantalón de hilo', 89, 'pantalones', ' ligeros y comodos');

/* Vestidos: */

INSERT INTO TPrendas
VALUES('V1', 'conjunto mesh', 125, 'vestidos', 'un estilo fresco y bonito');

/* Tops: */

INSERT INTO TPrendas
VALUES('T1', 'top encaje', 30, 'tops', 'es atrevido, perfecto para una salida con amigas');

INSERT INTO TPrendas
VALUES('T2', 'top con mangas', 20, 'tops', 'juveniles y con estilo');

INSERT INTO TPrendas
VALUES('T3', 'top en mesh', 40, 'tops', 'coloridos y hermosos');

INSERT INTO TPrendas
VALUES('T4', 'corset', 55, 'tops', 'reslatan tu figura');


/* Casacas: */

INSERT INTO TPrendas
VALUES('CA1', 'gabarnida crop', 50, 'casacas', 'son suaves al tacto y muy ligeras');

/* Poleras: */

INSERT INTO TPrendas
VALUES('POLE1', 'oversize', 150 , 'poleras', 'estilo comodo y juvenil');

/* Polos: */

INSERT INTO TPrendas
VALUES('POLO1', 'polo en tul', 49 , 'polo', 'estilo rebelde y atractivo');

/* Chompas: */

INSERT INTO TPrendas
VALUES('CH1', 'mangas de hilo', 30, 'chompas', 'super cómodas y bonitas');

INSERT INTO TPrendas
VALUES('CH2', 'chompa a rayas', 47, 'chompas', 'clásicas y bonitas');


/* Blusas y Camisas: */

/* ******************** DETALLES DE Prendas ************************* */