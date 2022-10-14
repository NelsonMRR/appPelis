package com.API.controladores;

import com.API.excepciones.UsuarioEncontradoExcepcion;
import com.API.modelos.*;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

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
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        usuarios.setFecha(formatter.format(date));
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

    @GetMapping("/")
    public ResponseEntity<?> obtenerUsuarios(){
        return ResponseEntity.ok(usuarioServicio.obtenerUsuarios());
    }

    @GetMapping("/{username}")
    public Usuarios obtenerUsuario(@PathVariable("username") String username){
        return usuarioServicio.obtenerUsuario(username);
    }

    @PutMapping("/")
    public Usuarios actualizarUsuario(@RequestBody Usuarios usuarios) {
        return  usuarioServicio.actualizarUsuario(usuarios);
    }

    public UsuarioServicio getUsuarioServicio() {
        return usuarioServicio;
    }

    public void setUsuarioServicio(UsuarioServicio usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }

    public BCryptPasswordEncoder getbCryptPasswordEncoder() {
        return bCryptPasswordEncoder;
    }

    public void setbCryptPasswordEncoder(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @DeleteMapping("/{usuarioId}")
    public void eliminarUsuario(@PathVariable("usuarioId") Long id){
        usuarioServicio.eliminarUsuario(id);
    }
}
