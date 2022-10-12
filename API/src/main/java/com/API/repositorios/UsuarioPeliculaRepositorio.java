package com.API.repositorios;

import com.API.modelos.UsuarioPeliculas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface UsuarioPeliculaRepositorio extends JpaRepository<UsuarioPeliculas, Long> {
    /*Set<UsuarioPeliculas> findByUsuarioPelicula(UsuarioPeliculas usuarioPeliculas);*/
}
