package com.API.servicios.impl;

import com.API.modelos.HistorialPeliculas;
import com.API.repositorios.HistorialPeliculaRepositorio;
import com.API.servicios.HistorialPeliculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class HistorialPeliculasImplementacion implements HistorialPeliculaServicio {

    @Autowired
    private HistorialPeliculaRepositorio historialPeliculaRepositorio;

    @Override
    public HistorialPeliculas guardarHistorialPelicula(HistorialPeliculas historialPeliculaServicio) {
        return historialPeliculaRepositorio.save(historialPeliculaServicio);
    }

    @Override
    public HistorialPeliculas obtenerHistorialPelicula(Long id) {
        return historialPeliculaRepositorio.findById(id).get();
    }

    @Override
    public Set<HistorialPeliculas> obtenerHistorialPeliculas() {
        return new LinkedHashSet<>(historialPeliculaRepositorio.findAll());
    }

    @Override
    public void eliminarHistorialPelicula(Long id) {

    }
}
