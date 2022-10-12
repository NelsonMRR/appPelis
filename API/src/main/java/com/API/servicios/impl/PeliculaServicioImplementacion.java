package com.API.servicios.impl;

import com.API.modelos.Peliculas;
import com.API.repositorios.PeliculaRepositorio;
import com.API.servicios.PeliculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
class PeliculaServicioImplementacion implements PeliculaServicio {
    @Autowired
    private PeliculaRepositorio peliculaRepositorio;

    @Override
    public Peliculas guardarPelicula(Peliculas peliculas) {
        return peliculaRepositorio.save(peliculas);
    }

    @Override
    public Peliculas actualizarPelicula(Peliculas peliculas) {
        return peliculaRepositorio.save(peliculas);
    }

    @Override
    public Peliculas obtenerPelicula(Long id) {
        return peliculaRepositorio.findById(id).get();
    }

    @Override
    public Set<Peliculas> obtenerPeliculas() {
        return new LinkedHashSet<>(peliculaRepositorio.findAll());
    }

    @Override
    public void eliminarPelicula(Long id) {
        Peliculas peliculas = new Peliculas();
        peliculas.setId(id);
        peliculaRepositorio.delete(peliculas);
    }
}
