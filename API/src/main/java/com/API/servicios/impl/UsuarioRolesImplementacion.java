package com.API.servicios.impl;

import com.API.modelos.UsuarioRoles;
import com.API.repositorios.UsuarioRolesRepositorio;
import com.API.servicios.UsuarioRolesServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioRolesImplementacion implements UsuarioRolesServicio {

    @Autowired
    private UsuarioRolesRepositorio usuarioRolesRepositorio;

    @Override
    public UsuarioRoles obtenerRoles() {
        return (UsuarioRoles) usuarioRolesRepositorio.findAll();
    }

    @Override
    public UsuarioRoles actualizarUsuarioRol(UsuarioRoles usuarioRoles) {
        return usuarioRolesRepositorio.save(usuarioRoles);
    }

}
