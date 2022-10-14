package com.API;

import com.API.modelos.Roles;
import com.API.modelos.UsuarioRoles;
import com.API.modelos.Usuarios;
import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ApiApplication implements CommandLineRunner {

	@Autowired
	private UsuarioServicio usuarioServicio;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		/*Creación del usuario admin*/
		/*Usuarios usuario = new Usuarios();

		usuario.setNombre("Nelson");
		usuario.setApellido("Rivera");
		usuario.setUsername("administrador");
		usuario.setPassword(bCryptPasswordEncoder.encode("admin"));
		usuario.setEmail("prueba@hotmail.com");
		usuario.setTelefono("12345678");
		usuario.setFoto("foto.png");
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		usuario.setFecha(formatter.format(date));
		Roles rol = new Roles();
		rol. setId(1L);
		rol.setNombre("ADMINISTRADOR");

		Set<UsuarioRoles> usuarioRoles = new HashSet<>();
		UsuarioRoles usuarioRol = new UsuarioRoles();
		usuarioRol.setRol(rol);
		usuarioRol.setUsuario(usuario);
		usuarioRoles.add(usuarioRol);

		Usuarios usuarioGuardado = usuarioServicio.guardarUsuario(usuario, usuarioRoles);
		System.out.println(usuarioGuardado.getUsername());*/
	}
}
