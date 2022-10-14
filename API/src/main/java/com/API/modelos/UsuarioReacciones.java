package com.API.modelos;

import javax.persistence.*;

@Entity
public class UsuarioReacciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Peliculas pelicula_reaccion;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuarios usuario_reaccion;

    private String reaccion;
    private String fecha;
    private boolean estado = true;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Peliculas getPelicula_reaccion() {
        return pelicula_reaccion;
    }

    public void setPelicula_reaccion(Peliculas pelicula_reaccion) {
        this.pelicula_reaccion = pelicula_reaccion;
    }

    public Usuarios getUsuario_reaccion() {
        return usuario_reaccion;
    }

    public void setUsuario_reaccion(Usuarios usuario_reaccion) {
        this.usuario_reaccion = usuario_reaccion;
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
