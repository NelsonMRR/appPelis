package com.API.repositorios;

import com.API.modelos.UsuarioRoles;
import com.API.modelos.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRolesRepositorio extends JpaRepository<UsuarioRoles, Long> {
    //public UsuarioRoles findByIdUsusario(Long usuario);
}
