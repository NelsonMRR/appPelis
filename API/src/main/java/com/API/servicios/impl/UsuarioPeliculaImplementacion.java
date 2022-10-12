package com.API.servicios.impl;

import com.API.modelos.UsuarioPeliculas;
import com.API.repositorios.UsuarioPeliculaRepositorio;
import com.API.servicios.UsuarioPeliculaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class UsuarioPeliculaImplementacion implements UsuarioPeliculaServicio {

    @Autowired
    private UsuarioPeliculaRepositorio usuarioPeliculaRepositorio;

    @Override
    public UsuarioPeliculas guardarUsuarioPelicula(UsuarioPeliculas usuarioPeliculas){
        return usuarioPeliculaRepositorio.save(usuarioPeliculas);
    }

    @Override
    public UsuarioPeliculas actualizarUsuarioPelicula(UsuarioPeliculas usuarioPeliculas) {
        return usuarioPeliculaRepositorio.save(usuarioPeliculas);
    }

    @Override
    public UsuarioPeliculas obtenerUsuarioPelicula(Long id) {
        return usuarioPeliculaRepositorio.findById(id).get();
    }

    @Override
    public Set<UsuarioPeliculas> obtenerUsuarioPeliculas() {
        return new LinkedHashSet<>(usuarioPeliculaRepositorio.findAll());
    }

    @Override
    public void eliminarUsuarioPelicula(Long id) {
        UsuarioPeliculas usuarioPeliculas = new UsuarioPeliculas();
        usuarioPeliculas.setId(id);
        usuarioPeliculaRepositorio.delete(usuarioPeliculas);
    }
}
