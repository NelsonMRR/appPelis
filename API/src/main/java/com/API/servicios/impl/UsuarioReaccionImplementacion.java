package com.API.servicios.impl;

import com.API.modelos.UsuarioReacciones;
import com.API.repositorios.UsuarioReaccionRepositorio;
import com.API.servicios.UsuarioReaccionServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class UsuarioReaccionImplementacion implements UsuarioReaccionServicio {

    @Autowired
    private UsuarioReaccionRepositorio usuarioReaccionRepositorio;

    @Override
    public UsuarioReacciones guardarUsuarioReaccion(UsuarioReacciones usuarioReacciones){
        return usuarioReaccionRepositorio.save(usuarioReacciones);
    }

    @Override
    public UsuarioReacciones actualizarUsuarioReaccion(UsuarioReacciones usuarioReacciones) {
        return usuarioReaccionRepositorio.save(usuarioReacciones);
    }

    @Override
    public UsuarioReacciones obtenerUsuarioReaccion(Long id) {
        return usuarioReaccionRepositorio.findById(id).get();
    }

    @Override
    public Set<UsuarioReacciones> obtenerUsuarioReacciones() {
        return new LinkedHashSet<>(usuarioReaccionRepositorio.findAll());
    }

    @Override
    public void eliminarUsuarioReaccion(Long id) {
        UsuarioReacciones usuarioReacciones = new UsuarioReacciones();
        usuarioReacciones.setId(id);
        usuarioReaccionRepositorio.delete(usuarioReacciones);
    }
}
