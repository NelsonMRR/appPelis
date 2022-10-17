package com.API.controladores;

import com.API.modelos.UsuarioPeliculas;
import com.API.modelos.UsuarioRoles;
import com.API.servicios.UsuarioRolesServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@CrossOrigin("*")
public class UsuarioRolesControlador {

    @Autowired
    private UsuarioRolesServicio usuarioRolesServicio;

    @GetMapping("/")
    public UsuarioRoles obtenerRoles(){
        return usuarioRolesServicio.obtenerRoles();
    }

    @PutMapping("/")
    public ResponseEntity<UsuarioRoles> actualizarUsuarioRol(@RequestBody UsuarioRoles usuarioRoles){
        usuarioRoles.setUsuario(usuarioRoles.getUsuario());
        return ResponseEntity.ok(usuarioRolesServicio.actualizarUsuarioRol(usuarioRoles));
    }
}
