package com.API.servicios;

import com.API.modelos.UsuarioRol;
import com.API.modelos.Usuarios;
import com.API.repositorios.RolRepositorio;
import com.API.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UsuarioServicioImplementacion implements UsuarioServicio{

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private RolRepositorio rolRepositorio;

    @Override
    public Usuarios guardarUsuario(Usuarios usuario, Set<UsuarioRol> usuarioRoles) throws Exception {
        Usuarios usuarioLocal = usuarioRepositorio.findByUsername(usuario.getUsername());
        if (usuarioLocal != null){
            System.out.println("El suario ya existe.");
            throw  new Exception("El usuario ya esta presente");
        }else{
            for(UsuarioRol usuarioRol:usuarioRoles){
                rolRepositorio.save(usuarioRol.getRol());
            }
            usuario.getUsuarioRol().addAll(usuarioRoles);
            usuarioLocal = usuarioRepositorio.save(usuario);
        }
        return usuarioLocal;
    }

    @Override
    public Usuarios obtenerUsuario(String username) {
        return usuarioRepositorio.findByUsername(username);
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepositorio.deleteById(id);
    }
}
