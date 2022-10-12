package com.API.controladores;

import com.API.modelos.UsuarioPeliculas;
import com.API.modelos.Usuarios;
import com.API.servicios.PeliculaServicio;
import com.API.servicios.UsuarioPeliculaServicio;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/upeliculas")
@CrossOrigin("*")
public class UsuarioPeliculaControlador {

    @Autowired
    private UsuarioPeliculaServicio usuarioPeliculaServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private PeliculaServicio peliculaServicio;

    @PostMapping("/")
    public ResponseEntity<UsuarioPeliculas> guardarUsuarioPelicula(@RequestBody UsuarioPeliculas usuarioPeliculas){
        return ResponseEntity.ok(usuarioPeliculaServicio.guardarUsuarioPelicula(usuarioPeliculas));
    }

    @PutMapping("/")
    public ResponseEntity<UsuarioPeliculas> actualizarUsuarioPelicula(@RequestBody UsuarioPeliculas usuarioPeliculas){
        return ResponseEntity.ok(usuarioPeliculaServicio.actualizarUsuarioPelicula(usuarioPeliculas));
    }

    @GetMapping("/peliculas/{usuarioId}")
    public  ResponseEntity<?> listarUsuariosPelicula(@PathVariable("usuarioId") Long id){
        Usuarios usuarios = usuarioServicio.obtenerUsuarioId(id);
        Set<UsuarioPeliculas> usuarioPeliculas = usuarios.getUsuarioPeliculas();

        List usuarioPelicula = new ArrayList(usuarioPeliculas);
        System.out.println(usuarioPelicula.size());
        if (usuarioPelicula.size() > Integer.parseInt(usuarios.getNumeroDePeliculas())){
            usuarioPelicula = usuarioPelicula.subList(0,Integer.parseInt(usuarios.getNumeroDePeliculas() + 1));
        };
        Collections.shuffle(usuarioPelicula);
        return ResponseEntity.ok(usuarioPelicula);
    }

    @GetMapping("/{upeliculaId}")
    public  UsuarioPeliculas obtenerUsuarioPelicula(@PathVariable("upeliculaId") Long id){
        return usuarioPeliculaServicio.obtenerUsuarioPelicula(id);
    }
}
