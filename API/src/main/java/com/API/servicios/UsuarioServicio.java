package com.API.servicios;

import com.API.modelos.UsuarioRol;
import com.API.modelos.Usuarios;

import java.util.Set;

public interface UsuarioServicio {
    public Usuarios guardarUsuario(Usuarios usuario, Set<UsuarioRol> usuarioRoles) throws Exception;

    public  Usuarios obtenerUsuario(String username);

    public void eliminarUsuario(Long id);
}
