package com.API.servicios;

import com.API.modelos.Peliculas;

import java.util.Set;

public interface PeliculaServicio {

    Peliculas guardarPelicula(Peliculas peliculas);

    Peliculas actualizarPelicula(Peliculas peliculas);

    Peliculas obtenerPelicula(Long id);

    Set<Peliculas> obtenerPeliculas();

    void eliminarPelicula(Long id);
}
