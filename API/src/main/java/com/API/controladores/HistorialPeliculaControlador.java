package com.API.controladores;

import com.API.modelos.HistorialPeliculas;
import com.API.modelos.Peliculas;
import com.API.servicios.HistorialPeliculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/historial_peliculas")
@CrossOrigin("*")
public class HistorialPeliculaControlador {

    @Autowired
    private HistorialPeliculaServicio historialPeliculaServicio;

    @PostMapping("/")
    public ResponseEntity<HistorialPeliculas> guardarHistorialPelicula(@RequestBody HistorialPeliculas historialPeliculas){
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        historialPeliculas.setFecha(formatter.format(date));
        HistorialPeliculas historialPeliculaGuardada = historialPeliculaServicio.guardarHistorialPelicula(historialPeliculas);
        return ResponseEntity.ok(historialPeliculaGuardada);
    }

    @GetMapping("/")
    public ResponseEntity<?> obtenerHistorialPeliculas(){
        return ResponseEntity.ok(historialPeliculaServicio.obtenerHistorialPeliculas());
    }

}
