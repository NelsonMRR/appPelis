package com.API.modelos;

public class JwtSolicitud {

    private String username;
    private String password;

    public JwtSolicitud(){
    }

    public JwtSolicitud(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
