package com.API.excepciones;

public class UsuarioEncontradoExcepcion extends Exception{

    public UsuarioEncontradoExcepcion(){
        super("El usuario con ese username ya existe en la base de datos, vuelva a intentar con otro.");
    }

    public UsuarioEncontradoExcepcion(String mensaje){
        super(mensaje);
    }

}
