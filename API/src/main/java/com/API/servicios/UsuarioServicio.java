package com.API.servicios;

import com.API.modelos.Peliculas;
import com.API.modelos.UsuarioRoles;
import com.API.modelos.Usuarios;

import java.util.Set;

public interface UsuarioServicio {

    public Usuarios guardarUsuario(Usuarios usuario, Set<UsuarioRoles> usuarioRoles) throws Exception;

    Usuarios obtenerUsuarioId(Long id);

    public  Usuarios obtenerUsuario(String username);

    public void eliminarUsuario(Long id);
}
