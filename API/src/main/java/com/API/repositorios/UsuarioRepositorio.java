package com.API.repositorios;

import com.API.modelos.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuarios, Long> {
    public Usuarios findByUsername(String username);
}
