package com.API.servicios;

import com.API.excepciones.UsuarioEncontradoExcepcion;
import com.API.modelos.UsuarioRoles;
import com.API.modelos.Usuarios;

import java.util.Set;

public interface UsuarioServicio {

    public Usuarios guardarUsuario(Usuarios usuario, Set<UsuarioRoles> usuarioRoles) throws Exception;

    Usuarios obtenerUsuarioId(Long id);

    Set<Usuarios> obtenerUsuarios();

    public  Usuarios obtenerUsuario(String username);

    Usuarios actualizarUsuario(Usuarios usuarios);

    public void eliminarUsuario(Long id);
}
