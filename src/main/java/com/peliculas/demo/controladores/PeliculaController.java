package com.peliculas.demo.controladores;

import com.peliculas.demo.entidades.Pelicula;
import com.peliculas.demo.repositorios.PeliculaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PeliculaController {

    private final PeliculaRepository peliculaRepository;

    @Autowired
    public PeliculaController(PeliculaRepository peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    // Mostrar todas las películas
    @GetMapping("/obtenerPeliculas")
    public List<Pelicula> getAllPeliculas() {
        return peliculaRepository.findAll();
    }
    // Mostrar película por ID
    @GetMapping("/{id}")
    public Pelicula getPeliculaById(@PathVariable Long id) {
        return peliculaRepository.findById(id).orElse(null);
    }
    //metodo post hecho por el tutorial
    /*@PostMapping("/registrarPelicula")
    public ResponseEntity<Pelicula> crearPelicula(@RequestBody Pelicula pelicula){
        if(pelicula.getId() != null){
            return ResponseEntity.badRequest().build();
        }
        peliculaRepository.save(pelicula);
        return ResponseEntity.ok(pelicula);
    }*/
    //metodo post hecho por chatgpt
    @PostMapping(value = "/registrarPelicula", consumes = "application/json")
    public ResponseEntity<Pelicula> crearPelicula(@RequestBody Pelicula pelicula) {
        if (pelicula.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
        peliculaRepository.save(pelicula);
        return ResponseEntity.ok(pelicula);
    }
    @PutMapping(value = "/actualizarPelicula", consumes = "application/json")
public ResponseEntity<Pelicula> actualizarPelicula(@RequestBody Pelicula pelicula) {
    if (pelicula.getId() == null || !peliculaRepository.existsById(pelicula.getId())) {
        return ResponseEntity.badRequest().build();
    }
    peliculaRepository.save(pelicula);
    return ResponseEntity.ok(pelicula);
}


    
    @DeleteMapping(value = "/borrarPelicula/{id}", consumes = "application/json")
public ResponseEntity<Void> borrarPelicula(@PathVariable Long id) {
    if (id == null || !peliculaRepository.existsById(id)) {
        return ResponseEntity.badRequest().build();
    }
    peliculaRepository.deleteById(id);
    return ResponseEntity.noContent().build();
}
    /*@DeleteMapping(value = "/borrarPelicula/{id}", consumes = "application/json")
    public ResponseEntity<Pelicula> borrarPelicula(@PathVariable Long id) {
        if (id != null || !peliculaRepository.existsById(id)) {
            return ResponseEntity.badRequest().build();
        }
        peliculaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }*/
}
