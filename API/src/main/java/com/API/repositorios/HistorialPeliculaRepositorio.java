package com.API.repositorios;

import com.API.modelos.HistorialPeliculas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistorialPeliculaRepositorio extends JpaRepository<HistorialPeliculas, Long> {
}
