package com.API.controladores;

import com.API.modelos.Peliculas;
import com.API.modelos.UsuarioReacciones;
import com.API.servicios.PeliculaServicio;
import com.API.servicios.UsuarioReaccionServicio;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ureacciones")
@CrossOrigin("*")
public class UsuarioReaccionControlador {

    @Autowired
    private UsuarioReaccionServicio usuarioReaccionServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private PeliculaServicio peliculaServicio;

    @PostMapping("/")
    public ResponseEntity<UsuarioReacciones> guardarUsuarioReaccion(@RequestBody UsuarioReacciones usuarioReacciones){
        return ResponseEntity.ok(usuarioReaccionServicio.guardarUsuarioReaccion(usuarioReacciones));
    }

    @PutMapping("/")
    public ResponseEntity<UsuarioReacciones> actualizarUsuarioReaccion(@RequestBody UsuarioReacciones usuarioReacciones){
        return ResponseEntity.ok(usuarioReaccionServicio.actualizarUsuarioReaccion(usuarioReacciones));
    }

    @GetMapping("/{reaccionId}")
    public  UsuarioReacciones obtenerUsuarioReaccion(@PathVariable("reaccionId") Long id){
        return usuarioReaccionServicio.obtenerUsuarioReaccion(id);
    }

}
