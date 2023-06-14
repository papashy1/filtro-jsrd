//////////////////////////////// DEFINO VARIABLES GLOBALES ////////////////////////////
let codigo_id = 3
let cliente_index = 0
let puntos = 0
let puntos_n = 0
let tabla_r = document.querySelector("#tabla_r");
let tabla_c = document.querySelector("#tabla_c");
let esconder_r = document.querySelector("#esconder_r");
let esconder_c = document.querySelector("#esconder_c");
let compra = document.querySelector("#compra");


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


const comprobador_r = juegos
const comprobador_c = clientes
const comprobador_id = codigo_id

////////////////////////////////  FUNCIONES //////////////////////////////////

// decarga del localstorage, limpia y evita que los datos sean null luego imprime en la tabla con la base de datos actual
function mostrar_j() {
    juegos = JSON.parse(localStorage.getItem("juegos"))
    tabla_r.innerHTML = "";

    if (juegos == null) {
        juegos = [];
        codigo_id = 3;
    }
    juegos.forEach((rut) => {
        const juegosHTML = document.createElement("tr");
        juegosHTML.innerHTML = `
                <td>${rut.id}</td>
                <td>${rut.nombre}</td>
                <td>${rut.tematica}</td>
                <td>${rut.valor_licencia}</td>
                <td>${rut.puntos_f}</td>
                `;
        tabla_r.appendChild(juegosHTML)
    });
}

function mostrar_c() {
    clientes = JSON.parse(localStorage.getItem("clientes"))
    tabla_c.innerHTML = "";

    if (clientes == null) {
        clientes = [];
        codigo_id = 3;
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
        tabla_c.appendChild(clientesHTML)
    });
}

// primero filtra las dos id que entregamos con los inputs para encontrar sus objetos
// luego utilizamos los objetos para asignar variables para el valor del juego y los puntos de fidelidad,
// usamos findindex() para asignar los puntos al id correcto usando su indice,
// imprimimos la cotizacion en pantalla para decidir si se hace o no la compra
function cotizacion() {
    const buscador = document.querySelector("#cod_cliente").value;
    const buscado = clientes.filter(buscados => buscados.id == buscador);
    const buscador1 = document.querySelector("#cod_juego").value;
    const buscado1 = juegos.filter(buscados => buscados.id == buscador1);

    const valor = buscado1[0].valor_licencia;
    puntos = buscado1[0].puntos_f
    const valor1 = calcularValorTotal(valor);

    const id_clientes = buscado[0].id;
    const buscado_id = clientes.findIndex(buscados => buscados.id == id_clientes);
    cliente_index = buscado_id
    puntos_n = parseInt(clientes[cliente_index].puntos)

    compra.innerHTML = `       
            <br>
            &nbsp;&nbsp;&nbsp; CLIENTE: <br><br>
            &nbsp;&nbsp;&nbsp; Nombre:  ${buscado[0].nombres} ${buscado[0].apellidos}<br>
            &nbsp;&nbsp;&nbsp; Telefono:  ${buscado[0].telefono}<br>
            &nbsp;&nbsp;&nbsp; Identificacion:  ${buscado[0].numero_de_identificacion}<br>
            &nbsp;&nbsp;&nbsp; Correo:  ${buscado[0].correo} <br><br>
            &nbsp;&nbsp;&nbsp; JUEGO: <br><br>
            &nbsp;&nbsp;&nbsp; Nombre:  ${buscado1[0].nombre}<br>
            &nbsp;&nbsp;&nbsp; Tematica: ${buscado1[0].tematica}<br>
            &nbsp;&nbsp;&nbsp; Puntos por fidelidad:   ${buscado1[0].puntos_f}<br>
            &nbsp;&nbsp;&nbsp; Valor del juego:  ${buscado1[0].valor_licencia}<br><br>          
            &nbsp;&nbsp;&nbsp; VALOR TOTAL: ( ${buscado1[0].valor_licencia} + TA(4%) ) + IVA(16%)  = ${valor1} $
            </p>
            `; 
    clientes = JSON.parse(localStorage.getItem("clientes"));
}

// Calcula el valor total del juego agregandole los dos impuestos al valor del juego
function calcularValorTotal(valorJuego) {
    const valorTasaAeroportuaria = valorJuego*0.04; 
    const valorIVA = (valorJuego + valorTasaAeroportuaria)*0.16; 
    const vTotal = valorJuego + valorIVA + valorTasaAeroportuaria;
    return vTotal;
}
//////////////////////////////////////////////////////////////// EJECUCION //////////////////////////////////////////////////////////////////

// si la base de datos es igual al comprobador se descarga, luego comprueba si la descarga es  = null,
//  si es true reseta el valor al de la base de datos predeterminada, luego carga los datos al localstorage que es nuestra base de datos
if (juegos == comprobador_r || clientes == comprobador_c) {
    juegos = JSON.parse(localStorage.getItem("juegos"));
    clientes = JSON.parse(localStorage.getItem("clientes"));
    codigo_id = JSON.parse(localStorage.getItem("codigo_id"));
}   
if (juegos == null || clientes == null) {
    juegos = comprobador_r
    clientes = comprobador_c
    codigo_id = comprobador_id
}
localStorage.setItem("juegos", JSON.stringify(juegos));
localStorage.setItem("clientes", JSON.stringify(clientes));   
localStorage.setItem("codigo_id", JSON.stringify(codigo_id));

// llamados a botones que asigna al evento click una funcion

esconder_r.classList.add('d-none');
esconder_c.classList.add('d-none');

const juego_but = document.querySelector("#juegos1");
juego_but.addEventListener("click", mostrar_j());
juego_but.addEventListener("click", () => {
    esconder_r.classList.remove('d-none');
    esconder_c.classList.add('d-none');
});

const clientes_but = document.querySelector("#clientes1");
clientes_but.addEventListener("click", mostrar_c());
clientes_but.addEventListener("click", () => {
    esconder_r.classList.add('d-none');
    esconder_c.classList.remove('d-none');
});

const cotizar_but = document.querySelector("#cotizar1");
cotizar_but.addEventListener("click", cotizacion);

// con el boton de pagar al final de la cotizacion utilizo un evento clic,
// con la variable global cliente_index agrego los nuevos puntos adquiridos por la compra
// subo al localstorage para guardar las acciones anteriores
const pagar_but = document.querySelector("#pagar1");
pagar_but.addEventListener("click", () => {
clientes[cliente_index].puntos = puntos_n + puntos
localStorage.setItem("clientes", JSON.stringify(clientes));   
console.log(clientes);
});

