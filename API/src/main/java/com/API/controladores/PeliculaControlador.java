package com.API.controladores;

import com.API.modelos.Peliculas;
import com.API.servicios.PeliculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/peliculas")
@CrossOrigin("*")
public class PeliculaControlador {

    @Autowired
    private PeliculaServicio peliculaServicio;

    @PostMapping("/")
    public ResponseEntity<Peliculas> guardarPelicula(@RequestBody Peliculas peliculas){
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        peliculas.setFecha(formatter.format(date));
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

    public PeliculaServicio getPeliculaServicio() {
        return peliculaServicio;
    }

    public void setPeliculaServicio(PeliculaServicio peliculaServicio) {
        this.peliculaServicio = peliculaServicio;
    }

    @DeleteMapping("/{peliculaId}")
    public void eliminarPelicula(@PathVariable("peliculaId") Long id){
        peliculaServicio.eliminarPelicula(id);
    }
}
