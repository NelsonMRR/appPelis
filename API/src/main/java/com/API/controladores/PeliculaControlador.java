package com.API.controladores;

import com.API.modelos.Peliculas;
import com.API.servicios.PeliculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/peliculas")
@CrossOrigin("*")
public class PeliculaControlador {

    @Autowired
    private PeliculaServicio peliculaServicio;

    @PostMapping("/")
    public ResponseEntity<Peliculas> guardarPelicula(@RequestBody Peliculas peliculas){
        peliculas.setNumeroDeReacciones("0");
        Peliculas peliculaGuardada = peliculaServicio.guardarPelicula(peliculas);
        return ResponseEntity.ok(peliculaGuardada);
    }

    @GetMapping("/{peliculaId}")
    public Peliculas obtenerPelicula(@PathVariable("peliculaId") Long id){
        return peliculaServicio.obtenerPelicula(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> obtenerPeliculas(){
        return ResponseEntity.ok(peliculaServicio.obtenerPeliculas());
    }

    @PutMapping("/")
    public Peliculas actualizarPelicula(@RequestBody Peliculas peliculas){
        return  peliculaServicio.actualizarPelicula(peliculas);
    }

    @DeleteMapping("/{peliculaId}")
    public void eliminarPelicula(@PathVariable("peliculaId") Long id){
        peliculaServicio.eliminarPelicula(id);
    }
}
