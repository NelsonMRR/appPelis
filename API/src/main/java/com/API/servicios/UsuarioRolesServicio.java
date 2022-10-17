package com.API.servicios;

import com.API.modelos.UsuarioPeliculas;
import com.API.modelos.UsuarioRoles;

public interface UsuarioRolesServicio {

    UsuarioRoles obtenerRoles();

    UsuarioRoles actualizarUsuarioRol(UsuarioRoles usuarioRoles);
}
