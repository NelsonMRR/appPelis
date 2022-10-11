package com.API.excepciones;

public class UsuarioNoEncontradoExcepcion extends Exception{

    public UsuarioNoEncontradoExcepcion(){
        super("El usuario con ese username ya existe en la base de datos, vuelva a intentar con otro.");
    }

    public UsuarioNoEncontradoExcepcion(String mensaje){
        super(mensaje);
    }


}
