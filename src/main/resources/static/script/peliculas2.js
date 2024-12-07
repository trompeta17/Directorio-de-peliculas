window.onload = function () {
    listarPeliculas();
};

// LISTAR PELICULAS
let listarPeliculas = async () => {
    const peticion = await fetch("http://localhost:8080/api/obtenerPeliculas", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const peliculas = await peticion.json();
    let contenidoTabla = "";

    for (const pelicula of peliculas) {
        let contenidoFila = `<tr>
<td>${pelicula.id}</td>
<td>${pelicula.titulo}</td>
<td>${pelicula.director}</td>
<td>${pelicula.genero}</td>
<td>
  <i onClick="borrarPelicula(${pelicula.id})" class="material-icons button delete">borrar</i>
  <i onClick="editarPelicula(${pelicula.id})" class="material-icons button delete">editar</i>
</td>
</tr>`;
        contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").innerHTML = contenidoTabla;
};

let borrarPelicula = async (id) => {
    const peticion = await fetch("http://localhost:8080/api/borrarPelicula/" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    listarPeliculas();
};

let idEditar;

let editarPelicula = async (id) => {
    mostrarFormulario();
    idEditar = id;

    const peticion = await fetch("http://localhost:8080/api/" + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const pelicula = await peticion.json();
    console.log(pelicula); // Verifica los datos

    document.getElementById("tituloEditar").value = pelicula.titulo;
    document.getElementById("directorEditar").value = pelicula.director;
    document.getElementById("generoEditar").value = pelicula.genero;
};
let botonModificar = document.getElementById("btnModificar");
    botonModificar.addEventListener("click", evento => {
        aplicarActualizacion(idEditar);
    });
let aplicarActualizacion = async (id) => {
    let campos = {
        id: id,
        titulo: document.getElementById("tituloEditar").value,
        director: document.getElementById("directorEditar").value,
        genero: document.getElementById("generoEditar").value,
    };

    console.log("Actualizando película con los siguientes datos:", campos); // Verifica los datos

    const peticion = await fetch("http://localhost:8080/api/actualizarPelicula", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos),
    });

    if (peticion.ok) {
        alert("Película actualizada con éxito");
    } else {
        alert("Error al actualizar la película");
    }

    listarPeliculas(); // Refresca la tabla
    // Oculta el formulario después de actualizar
};

function mostrarFormulario() {
    document.getElementById("formulario").style.visibility = "visible";
}
let boton = document.getElementById("btnRegistrar");
boton.addEventListener("click", (event) => {
    event.preventDefault(); // Evita el envío del formulario
    registrarPelicula();
});

let registrarPelicula = async () => {
    let campos = {
        titulo: document.getElementById("titulo").value,
        director: document.getElementById("director").value,
        genero: document.getElementById("genero").value
    };

    const peticion = await fetch("http://localhost:8080/api/registrarPelicula", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    });

    if (peticion.ok) {
        alert("Película registrada con éxito");
    } else {
        alert("Error al registrar la película");
    }
};
