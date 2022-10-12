package com.API.servicios;

import com.API.modelos.UsuarioPeliculas;

import java.util.Set;

public interface UsuarioPeliculaServicio {

    UsuarioPeliculas guardarUsuarioPelicula(UsuarioPeliculas usuarioPeliculas);

    UsuarioPeliculas actualizarUsuarioPelicula(UsuarioPeliculas usuarioPeliculas);

    UsuarioPeliculas obtenerUsuarioPelicula(Long id);

    Set<UsuarioPeliculas> obtenerUsuarioPeliculas();

    void eliminarUsuarioPelicula(Long id);

}
