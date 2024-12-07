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
