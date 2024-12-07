//con esta funcion cada vez que recargue la pagina se vuelven a cargar las peliculas
//de esta se evitar hacer un evento para traer las peliculas
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
        }
    });

    const pelicula = await peticion.json();
    console.log(pelicula); // Verifica que los datos lleguen correctamente
    document.getElementById("titulo").value = pelicula.titulo;
    document.getElementById("director").value = pelicula.director;
    document.getElementById("genero").value = pelicula.genero;

    // Asegúrate de que el botón de modificar esté disponible después de que el formulario sea visible
    
};
let botonModificar = document.getElementById("btnModificar");
    botonModificar.addEventListener("click", evento => {
        aplicarActualizacion(idEditar);
    });
let aplicarActualizacion = async (id) => {
    let campos = {
        id: id,
        titulo: document.getElementById("titulo").value,
        director: document.getElementById("director").value,
        genero: document.getElementById("genero").value
    };

    console.log("Actualizando película con los siguientes datos:", campos); // Verifica los datos que se enviarán

    const peticion = await fetch("http://localhost:8080/api/actualizarPelicula", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos)
    });

    const respuesta = await peticion.json(); // Verifica la respuesta del servidor
    console.log("Respuesta de la actualización:", respuesta);

    listarPeliculas(); // Actualiza la lista de películas
};

function mostrarFormulario() {
    document.getElementById("formulario").style.visibility = "visible";
}
