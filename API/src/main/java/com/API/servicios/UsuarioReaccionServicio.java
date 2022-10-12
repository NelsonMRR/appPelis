package com.API.servicios;

import com.API.modelos.UsuarioReacciones;

import java.util.Set;

public interface UsuarioReaccionServicio {

    UsuarioReacciones guardarUsuarioReaccion(UsuarioReacciones usuarioReacciones);

    UsuarioReacciones actualizarUsuarioReaccion(UsuarioReacciones usuarioReacciones);

    UsuarioReacciones obtenerUsuarioReaccion(Long id);

    Set<UsuarioReacciones> obtenerUsuarioReacciones();

    void eliminarUsuarioReaccion(Long id);
}
