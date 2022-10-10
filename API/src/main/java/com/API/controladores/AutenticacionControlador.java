package com.API.controladores;

import com.API.configuraciones.JwtUtils;
import com.API.modelos.JwtRespuesta;
import com.API.modelos.JwtSolicitud;
import com.API.servicios.impl.UserDetalleServicioImplementacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AutenticacionControlador {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetalleServicioImplementacion userDetalleServicioImplementacion;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/generar-token")
    public ResponseEntity<?> generarToken(@RequestBody JwtSolicitud jwtSolicitud) throws Exception {

        try{
            autenticar(jwtSolicitud.getUsername(),jwtSolicitud.getPassword());
        }catch (Exception exception){
            exception.printStackTrace();
            throw new Exception("Autenticación: Usuario no encontrado");
        }

        UserDetails userDetails =  this.userDetalleServicioImplementacion.loadUserByUsername(jwtSolicitud.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtRespuesta(token));
    }

    private void autenticar(String username,String password) throws Exception {

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        }catch (DisabledException disabledException){
            throw  new Exception("Usuario Deshabilitado " + disabledException.getMessage());
        }catch (BadCredentialsException badCredentialsException){
            throw  new Exception("Credenciales invalidas " + badCredentialsException.getMessage());
        }
    }
}
