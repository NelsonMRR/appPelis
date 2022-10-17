package com.API.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "peliculas")
public class Peliculas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "pelicula_usuario")
    @JsonIgnore
    private Set<UsuarioPeliculas> usuarioPeliculas = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "pelicula_reaccion")
    @JsonIgnore
    private Set<UsuarioReacciones> usuarioReacciones = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "pelicula_historial")
    @JsonIgnore
    private Set<HistorialPeliculas> historialPeliculas = new HashSet<>();

    private String titulo;
    private String descripcion;
    private String imagen;
    private String stock;
    private String precio_alquiler;
    private String precio_venta;
    private String fecha;
    private boolean estado = false;
    private String numeroDeReacciones;

    public Peliculas(String titulo,String descripcion,String imagen,String stock,String precio_alquiler,String precio_venta,boolean estado){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.stock = stock;
        this.precio_alquiler = precio_alquiler;
        this.precio_venta = precio_venta;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public String getPrecio_alquiler() {
        return precio_alquiler;
    }

    public void setPrecio_alquiler(String precio_alquiler) {
        this.precio_alquiler = precio_alquiler;
    }

    public String getPrecio_venta() {
        return precio_venta;
    }

    public void setPrecio_venta(String precio_venta) {
        this.precio_venta = precio_venta;
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

    public String getNumeroDeReacciones() {
        return numeroDeReacciones;
    }

    public void setNumeroDeReacciones(String numeroDeReacciones) {
        this.numeroDeReacciones = numeroDeReacciones;
    }

    public Set<UsuarioPeliculas> getUsuarioPeliculas() {
        return usuarioPeliculas;
    }

    public void setUsuarioPeliculas(Set<UsuarioPeliculas> usuarioPeliculas) {
        this.usuarioPeliculas = usuarioPeliculas;
    }

    public Set<UsuarioReacciones> getUsuarioReacciones() {
        return usuarioReacciones;
    }

    public void setUsuarioReacciones(Set<UsuarioReacciones> usuarioReacciones) {
        this.usuarioReacciones = usuarioReacciones;
    }

    public Set<HistorialPeliculas> getHistorialPeliculas() {
        return historialPeliculas;
    }

    public void setHistorialPeliculas(Set<HistorialPeliculas> historialPeliculas) {
        this.historialPeliculas = historialPeliculas;
    }

    public Peliculas() {
    }
}
