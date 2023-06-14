//////////////////////////////// DEFINO VARIABLES GLOBALES ////////////////////////////
let codigo_id = 3
let cliente_index = 0
let tabla1 = document.querySelector("#tabla1");

//////////////////////////////// DATOS INICIALES //////////////////////////////////

let clientes = [
    {
        id: 1,
        numero_de_identificacion: "1098752265",
        nombres: "Mario Jose",
        apellidos: "Rojas Rosas",
        telefono: "31531831756",
        correo: "holaa@gmail.com",
        fecha: "1960/06/13",
        nacionalidad: "venezolano",
        puntos: 1,
    },
    {
        id: 2,
        numero_de_identificacion: "1098753262",
        nombres: "Juan Jose",
        apellidos: "Roa Gonzales",
        telefono: "31531838856",
        correo: "chaoo@gmail.com",
        fecha: "1990/04/12",
        nacionalidad: "peruano",
        puntos: 1,
    },
    {
        id: 3,
        numero_de_identificacion: "1098772261",
        nombres: "Maria Julieta",
        apellidos: "Ramires Gomes",
        telefono: "31531831256",
        correo: "juegomucho@gmail.com",
        fecha: "1999/05/11",
        nacionalidad: "colombiano",
        puntos: 1,
    },
];

const comprobador_id = codigo_id
const comprobador = clientes

////////////////////////////////  FUNCIONES //////////////////////////////////

// decarga del localstorage, limpia y evita que los datos sean null luego imprime en la tabla con la base de datos actual
function mostrar() {
    clientes = JSON.parse(localStorage.getItem("clientes"))
    tabla1.innerHTML = "";

    if (clientes == null) {
        clientes = [];
        codigo_id = 3;
        console.log(clientes);
    }
    clientes.forEach((client) => {
        const clientesHTML = document.createElement("tr");
        clientesHTML.innerHTML = `
                <td>${client.id}</td>
                <td>${client.numero_de_identificacion}</td>
                <td>${client.nombres}</td>
                <td>${client.apellidos}</td>
                <td>${client.telefono}</td>
                <td>${client.correo}</td>
                <td>${client.fecha}</td>
                <td>${client.nacionalidad}</td>
                `;
        tabla1.appendChild(clientesHTML)
    });
}

// limpia y luego imprime en la tabla todos los datos con contenido igual al que se selecciono para la busqueda
function buscar_clientes() {
    clientes = JSON.parse(localStorage.getItem("clientes"))
    tabla1.innerHTML = "";

    const buscador = document.querySelector("#buscador1").value;
    const buscado = clientes.filter(buscados =>
        buscados.nombres == buscador || buscados.apellidos == buscador || buscados.numero_de_identificacion == buscador);

    buscado.forEach((client) => {
        const clientesHTML = document.createElement("tr");
        clientesHTML.innerHTML = `
            <td>${client.id}</td>
            <td>${client.numero_de_identificacion}</td>
            <td>${client.nombres}</td>
            <td>${client.apellidos}</td>
            <td>${client.telefono}</td>
            <td>${client.correo}</td>
            <td>${client.fecha}</td>
            <td>${client.nacionalidad}</td>
            `;
        tabla1.appendChild(clientesHTML)
    });  
};

// Muestra el boton de regresar, una ves que pulsamos en buscar,
// luego al pulsar regresar se oculta denuevo y usa mostrar() para limpiar la tabla de la busqueda ( buscar_clientes() )
function ocultar_regresar() {
    if (buscar_regresar_cbut.classList.contains("fade")) {
        buscar_regresar_cbut.classList.remove("fade")}
    else {
        buscar_regresar_cbut.classList.add("fade")
        mostrar();
    }
}

// agrega un nuevo cliente a la base de datos con .push manteniendo un id unico para cada elemento nuevo creado con la variable codigo_id,
// carga al localstorage y luego actaliza la tabla con mostrar()
function agregar_clientes() {
    codigo_id += 1;
    let identificacion = document.querySelector("#identificacion1").value;
    let nombres = document.querySelector("#nombres1").value;
    let apellidos = document.querySelector("#apellidos1").value;
    let telefono = document.querySelector("#telefono1").value;
    let correo = document.querySelector("#correo1").value;
    let fecha = document.querySelector("#fecha1").value;
    let nacionalidad = document.querySelector("#nacionalidad1").value;

    let nuevo_cliente = {
        id: codigo_id,
        numero_de_identificacion: identificacion,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        nacionalidad: nacionalidad,
        fecha: fecha,
        puntos: 0,
    };

    clientes.push(nuevo_cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("codigo_id", JSON.stringify(codigo_id));
    mostrar();
}

// busca el indice del cliente que seleccionamos por su id en el input y lo guarda en una variable global
function selec_modificar_clientes() {
    clientes = JSON.parse(localStorage.getItem("clientes"))

    const id_modificar = document.querySelector("#modificado").value;
    const buscado_edit = clientes.findIndex(buscados => buscados.id == id_modificar);
    cliente_index = buscado_edit
}

// usa el indice contenido en cliente_index para sobreescribir valores en la base de datos (clientes) ,
// carga al localstorage y luego actaliza la tabla con mostrar()
function modificar_clientes() {
    clientes = JSON.parse(localStorage.getItem("clientes"))

    clientes[cliente_index].numero_de_identificacion = document.querySelector("#identificacion2").value;
    clientes[cliente_index].nombres = document.querySelector("#nombres2").value;
    clientes[cliente_index].apellidos = document.querySelector("#apellidos2").value;
    clientes[cliente_index].telefono = document.querySelector("#telefono2").value;
    clientes[cliente_index].correo = document.querySelector("#correo2").value;
    clientes[cliente_index].fecha = document.querySelector("#fecha2").value;
    clientes[cliente_index].nacionalidad = document.querySelector("#nacionalidad2").value;

    localStorage.setItem("clientes", JSON.stringify(clientes));
    mostrar();
}

// elimina un cliente de la base de datos buscando el indice por el id que ingresamos en el input ,
// carga al localstorage y luego actaliza la tabla con mostrar()
function eliminar_clientes() {
    const id_eliminar = document.querySelector("#eliminado").value;
    const buscado_eliminar = clientes.findIndex(buscados => buscados.id == id_eliminar);
    clientes.splice(buscado_eliminar, 1);

    localStorage.setItem("clientes", JSON.stringify(clientes))
    mostrar();
};

//////////////////////////////////////////////////////////////// EJECUCION //////////////////////////////////////////////////////////////////

// si la base de datos es igual al comprobador se descarga, luego comprueba si la descarga es  = null,
//  si es true reseta el valor al de la base de datos predeterminada, luego carga los datos al localstorage que es nuestra base de datos

if (clientes == comprobador) {
    clientes = JSON.parse(localStorage.getItem("clientes"));
    codigo_id = JSON.parse(localStorage.getItem("codigo_id"));
}
if (clientes == null) {
    clientes = comprobador
    codigo_id = comprobador_id  
}   
localStorage.setItem("clientes", JSON.stringify(clientes));
localStorage.setItem("codigo_id", JSON.stringify(codigo_id));

// llamados a botones que asigna al evento click una funcion
const agregar_cliente_but = document.querySelector("#agregar1");
agregar_cliente_but.addEventListener("click", agregar_clientes);

const eliminar_cliente_but = document.querySelector("#eliminar1");
eliminar_cliente_but.addEventListener("click", eliminar_clientes);

const modificar_cliente_but = document.querySelector("#modificar1");
modificar_cliente_but.addEventListener("click", selec_modificar_clientes);

const modificar_cliente_but_r = document.querySelector("#modificar_r");
modificar_cliente_but_r.addEventListener("click", modificar_clientes);

const buscar_regresar_cbut = document.querySelector("#regresar1");
buscar_regresar_cbut.addEventListener("click", ocultar_regresar);

const buscador = document.querySelector("#buscador1");

const buscar_cliente_but = document.querySelector("#buscar1");
buscar_cliente_but.addEventListener("click", buscar_clientes);
buscar_cliente_but.addEventListener("click", ocultar_regresar);

mostrar();