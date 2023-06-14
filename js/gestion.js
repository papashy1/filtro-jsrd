//////////////////////////////// DEFINO VARIABLES GLOBALES ////////////////////////////
let codigo_id = 3
let juego_index = 0
let tabla1 = document.querySelector("#tabla1");

//////////////////////////////// DATOS INICIALES //////////////////////////////////

let juegos = [
    {
        id: 1,
        nombre: "halo",
        tematica: "espacial",
        valor_licencia: 100000,
        puntos_f: 50,
    },
    {
        id: 2,
        nombre: "imperios",
        tematica: "historica",
        valor_licencia: 60000,
        puntos_f: 25,
    },
    {
        id: 3,
        nombre: "diablo",
        tematica: "terror",
        valor_licencia: 150000,
        puntos_f: 150,
    },
];

const comprobador = juegos
const comprobador_id = codigo_id

////////////////////////////////  FUNCIONES //////////////////////////////////

// decarga del localstorage, limpia y evita que los datos sean null luego imprime en la tabla con la base de datos actual
function mostrar() {
    juegos = JSON.parse(localStorage.getItem("juegos"))
    tabla1.innerHTML = "";

    if (juegos == null) {
        juegos = [];
        codigo_id = 3;
        console.log(juegos);
    }
    juegos.forEach((rut) => {
        const juegosHTML = document.createElement("tr");
        juegosHTML.innerHTML = `
                <td>${rut.id}</td>
                <td>${rut.nombre}</td>
                <td>${rut.tematica}</td>
                <td>${rut.valor_licencia}</td>
                <td>${rut.puntos_f}</td>
                <div class=" justify-end align-items-end">
                    <button class="btn btn-danger" onclick="eliminar_juegos(${rut.id})">
                        <i class="fa-regular fa-trash-can fa-lg" style="color: #ffffff;"></i>
                    </button>
                </div>
                `;
        tabla1.appendChild(juegosHTML)
    });
}

// agrega un nuevo juego a la base de datos con .push manteniendo un id unico para cada elemento nuevo creado con la variable codigo_id,
// carga al localstorage y luego actaliza la tabla con mostrar()
function agregar_juegos() {
    codigo_id += 1;
    let nombre = document.querySelector("#nombre1").value;
    let tematica = document.querySelector("#tematica1").value;
    let valor_licencia = document.querySelector("#valor_licencia1").value;
    let puntos_f = document.querySelector("#puntos_fid1").value;

    let nuevo_juego = {
        id: codigo_id,
        nombre: nombre,
        tematica: tematica,
        valor_licencia: valor_licencia,
        puntos_f: puntos_f,
    };

    juegos.push(nuevo_juego);
    localStorage.setItem("juegos", JSON.stringify(juegos));
    localStorage.setItem("codigo_id", JSON.stringify(codigo_id));
    mostrar();
}

// busca el indice del juego que seleccionamos por su id en el input y lo guarda en una variable global
function selec_modificar_juegos() {
    juegos = JSON.parse(localStorage.getItem("juegos"))

    const id_modificar = document.querySelector("#modificado").value;
    const buscado_edit = juegos.findIndex(buscados => buscados.id == id_modificar);
    juego_index = buscado_edit
}

// usa el indice contenido en cliente_index para sobreescribir valores en la base de datos (clientes) ,
// carga al localstorage y luego actaliza la tabla con mostrar()
function modificar_juegos() {
    juegos = JSON.parse(localStorage.getItem("juegos"))

    juegos[juego_index].nombre = document.querySelector("#nombre2").value;
    juegos[juego_index].tematica = document.querySelector("#tematica2").value;
    juegos[juego_index].valor_licencia = document.querySelector("#valor_licencia2").value;
    juegos[juego_index].puntos_f = document.querySelector("#puntos_fid2").value;

    localStorage.setItem("juegos", JSON.stringify(juegos));
    mostrar();
}

// elimina un juego de la base de datos buscando el indice por el id del juego que indicamos en el boton ,
// carga al localstorage y luego actaliza la tabla con mostrar()
function eliminar_juegos(rutid) {
    const id_eliminar = rutid
    const buscado_eliminar = juegos.findIndex(buscados => buscados.id == id_eliminar);
    juegos.splice(buscado_eliminar, 1);

    localStorage.setItem("juegos", JSON.stringify(juegos))
    mostrar();
};

//////////////////////////////////////////////////////////////// EJECUCION //////////////////////////////////////////////////////////////////

// si la base de datos es igual al comprobador se descarga, luego comprueba si la descarga es  = null,
//  si es true reseta el valor al de la base de datos predeterminada, luego carga los datos al localstorage que es nuestra base de datos
if (juegos == comprobador) {
    juegos = JSON.parse(localStorage.getItem("juegos"));
    codigo_id = JSON.parse(localStorage.getItem("codigo_id"));
}
if (juegos == null) {
    juegos = comprobador
    codigo_id = comprobador_id
}   
localStorage.setItem("juegos", JSON.stringify(juegos));
localStorage.setItem("codigo_id", JSON.stringify(codigo_id));

// llamados a botones que asigna al evento click una funcion
const agregar_juego_but = document.querySelector("#agregar1");
agregar_juego_but.addEventListener("click", agregar_juegos);

const modificar_juego_but = document.querySelector("#modificar1");
modificar_juego_but.addEventListener("click", selec_modificar_juegos);

const modificar_juego_but_r = document.querySelector("#modificar_r");
modificar_juego_but_r.addEventListener("click", modificar_juegos);

mostrar();