package com.API;

import com.API.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication implements CommandLineRunner {

	@Autowired
	private UsuarioServicio usuarioServicio;

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
		usuario.setPassword("admin");
		usuario.setEmail("nelsonth14@hotmail.com");
		usuario.setTelefono("72740183");
		usuario.setPerfil("foto.png");

		Roles rol = new Roles();
		rol. setId(1L);
		rol.setNombre("ADMINISTRADOR");

		Set<UsuarioRol> usuarioRoles = new HashSet<>();
		UsuarioRol usuarioRol = new UsuarioRol();
		usuarioRol.setRol(rol);
		usuarioRol.setUsuario(usuario);
		usuarioRoles.add(usuarioRol);

		Usuarios usuarioGuardado = usuarioServicio.guardarUsuario(usuario, usuarioRoles);
		System.out.println(usuarioGuardado.getUsername());*/
	}
}
