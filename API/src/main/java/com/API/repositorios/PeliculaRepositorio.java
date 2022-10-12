package com.API.repositorios;

import com.API.modelos.Peliculas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface PeliculaRepositorio extends JpaRepository<Peliculas, Long> {
    /*Set<Peliculas> findByPelicula(Peliculas peliculas);*/
}
