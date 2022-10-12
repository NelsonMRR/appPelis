package com.API.servicios.impl;

import com.API.excepciones.UsuarioEncontradoExcepcion;
import com.API.modelos.UsuarioRoles;
import com.API.modelos.Usuarios;
import com.API.repositorios.RolRepositorio;
import com.API.repositorios.UsuarioRepositorio;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UsuarioServicioImplementacion implements UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private RolRepositorio rolRepositorio;

    @Override
    public Usuarios guardarUsuario(Usuarios usuario, Set<UsuarioRoles> usuarioRoles) throws Exception {
        Usuarios usuarioLocal = usuarioRepositorio.findByUsername(usuario.getUsername());
        if(usuarioLocal != null){
            System.out.println("El usuario ya existe");
            throw new UsuarioEncontradoExcepcion("El usuario ya esta en sistema");
        }
        else{
            for(UsuarioRoles usuarioRol:usuarioRoles){
                rolRepositorio.save(usuarioRol.getRol());
            }
            usuario.getUsuarioRoles().addAll(usuarioRoles);
            usuarioLocal = usuarioRepositorio.save(usuario);
        }
        return usuarioLocal;
    }

    @Override
    public Usuarios obtenerUsuario(String username) {
        return usuarioRepositorio.findByUsername(username);
    }

    @Override
    public Usuarios obtenerUsuarioId(Long id) {
        return usuarioRepositorio.findById(id).get();
    }

    @Override
    public void eliminarUsuario(Long usuarioId) {
        usuarioRepositorio.deleteById(usuarioId);
    }
}
