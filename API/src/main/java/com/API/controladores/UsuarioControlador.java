package com.API.controladores;

import com.API.modelos.Roles;
import com.API.modelos.UsuarioRoles;
import com.API.modelos.Usuarios;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioControlador {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/")
    public Usuarios guardarUsuario(@RequestBody Usuarios usuarios) throws Exception{

        usuarios.setFoto("default.png");
        usuarios.setNumeroDePeliculas("0");
        usuarios.setPassword(this.bCryptPasswordEncoder.encode(usuarios.getPassword()));

        Set<UsuarioRoles> usuarioRoles = new HashSet<>();

        Roles rol = new Roles();
        rol.setId(2L);
        rol.setNombre("NORMAL");

        UsuarioRoles usuarioRol = new UsuarioRoles();
        usuarioRol.setUsuario(usuarios);
        usuarioRol.setRol(rol);

        usuarioRoles.add(usuarioRol);
        return usuarioServicio.guardarUsuario(usuarios,usuarioRoles);
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
