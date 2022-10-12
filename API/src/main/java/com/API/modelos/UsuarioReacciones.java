package com.API.modelos;

import javax.persistence.*;

@Entity
public class UsuarioReacciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Peliculas pelicula;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuarios usuario_pelicula;

    private String reaccion;
    private String fecha;
    private boolean estado = true;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Peliculas getPelicula() {
        return pelicula;
    }

    public void setPelicula(Peliculas pelicula) {
        this.pelicula = pelicula;
    }

    public Usuarios getUsuario_reaccion() {
        return usuario_pelicula;
    }

    public void setUsuario_reaccion(Usuarios usuario_pelicula) {
        this.usuario_pelicula = usuario_pelicula;
    }

    public String getReaccion() {
        return reaccion;
    }

    public void setReaccion(String reaccion) {
        this.reaccion = reaccion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
