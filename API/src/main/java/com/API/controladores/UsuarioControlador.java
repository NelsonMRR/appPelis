package com.API.controladores;

import com.API.modelos.Roles;
import com.API.modelos.UsuarioRol;
import com.API.modelos.Usuarios;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
public class UsuarioControlador {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @PostMapping("/")
    public Usuarios guardarUsuario(@RequestBody Usuarios usuarios) throws Exception{
        Set<UsuarioRol> roles = new HashSet<>();

        Roles rol = new Roles();
        rol.setId(2L);
        rol.setNombre("NORMAL");

        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setUsuario(usuarios);
        usuarioRol.setRol(rol);

        return usuarioServicio.guardarUsuario(usuarios,roles);
    }

    @GetMapping("/{username}")
    public Usuarios obtenerUsuario(@PathVariable("username") String username){
        return usuarioServicio.obtenerUsuario(username);
    }

    @DeleteMapping("/{usuarioId}")
    public void eliminarUsuario(@PathVariable("usuarioId") Long id){
        usuarioServicio.eliminarUsuario(id);
    }
}
