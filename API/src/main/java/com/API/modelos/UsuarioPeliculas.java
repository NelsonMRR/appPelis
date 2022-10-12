package com.API.modelos;

import javax.persistence.*;

@Entity
public class UsuarioPeliculas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Peliculas pelicula;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuarios usuario_pelicula;

    private String fecha_inicio;
    private String fecha_fin;
    private boolean estado = true;
    private String tipo;


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

    public Usuarios getUsuario_pelicula() {
        return usuario_pelicula;
    }

    public void setUsuario_pelicula(Usuarios usuario_pelicula) {
        this.usuario_pelicula = usuario_pelicula;
    }

    public String getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(String fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public String getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(String fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Long getTipo() {
        return id;
    }

    public void setTipo(String tipó) {
        this.tipo = tipo;
    }
}
