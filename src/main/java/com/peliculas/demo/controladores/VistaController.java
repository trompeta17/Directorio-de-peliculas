package com.peliculas.demo.controladores;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class VistaController {
    @GetMapping("/peliculas2")
    public String mostrarFormularioPelicula() {
        return "peliculas2";
    }
    
    @GetMapping("/tabla")
    public String mostrarTabla(){
        return "tabla";
    }
}
