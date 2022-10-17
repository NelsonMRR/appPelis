package com.API.modelos;

import javax.persistence.*;

@Entity
public class HistorialPeliculas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuarios usuario_historial;

    @ManyToOne(fetch = FetchType.EAGER)
    private Peliculas pelicula_historial;

    private String titulo_anterior;
    private String titulo_nuevo;
    private String precio_venta_anterior;
    private String precio_venta_nuevo;
    private String precio_alquiler_anterior;
    private String precio_alquiler_nuevo;
    private String fecha;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuarios getUsuario_historial() {
        return usuario_historial;
    }

    public void setUsuario_historial(Usuarios usuario_historial) {
        this.usuario_historial = usuario_historial;
    }

    public Peliculas getPelicula_historial() {
        return pelicula_historial;
    }

    public void setPelicula_historial(Peliculas pelicula_historial) {
        this.pelicula_historial = pelicula_historial;
    }

    public String getTitulo_anterior() {
        return titulo_anterior;
    }

    public void setTitulo_anterior(String titulo_anterior) {
        this.titulo_anterior = titulo_anterior;
    }

    public String getTitulo_nuevo() {
        return titulo_nuevo;
    }

    public void setTitulo_nuevo(String titulo_nuevo) {
        this.titulo_nuevo = titulo_nuevo;
    }

    public String getPrecio_venta_anterior() {
        return precio_venta_anterior;
    }

    public void setPrecio_venta_anterior(String precio_venta_anterior) {
        this.precio_venta_anterior = precio_venta_anterior;
    }

    public String getPrecio_venta_nuevo() {
        return precio_venta_nuevo;
    }

    public void setPrecio_venta_nuevo(String precio_venta_nuevo) {
        this.precio_venta_nuevo = precio_venta_nuevo;
    }

    public String getPrecio_alquiler_anterior() {
        return precio_alquiler_anterior;
    }

    public void setPrecio_alquiler_anterior(String precio_alquiler_anterior) {
        this.precio_alquiler_anterior = precio_alquiler_anterior;
    }

    public String getPrecio_alquiler_nuevo() {
        return precio_alquiler_nuevo;
    }

    public void setPrecio_alquiler_nuevo(String precio_alquiler_nuevo) {
        this.precio_alquiler_nuevo = precio_alquiler_nuevo;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}
