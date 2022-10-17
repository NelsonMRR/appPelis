package com.API.servicios;

import com.API.modelos.HistorialPeliculas;

import java.util.Set;

public interface HistorialPeliculaServicio {
    HistorialPeliculas guardarHistorialPelicula(HistorialPeliculas historialPeliculas);

    HistorialPeliculas obtenerHistorialPelicula(Long id);

    Set<HistorialPeliculas> obtenerHistorialPeliculas();

    void eliminarHistorialPelicula(Long id);
}
