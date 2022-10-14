package com.API.repositorios;

import com.API.modelos.UsuarioReacciones;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UsuarioReaccionRepositorio extends JpaRepository<UsuarioReacciones, Long> {
    /*Set<UsuarioReacciones> findByUsuarioReaccion(UsuarioReacciones usuarioReacciones);*/
}
