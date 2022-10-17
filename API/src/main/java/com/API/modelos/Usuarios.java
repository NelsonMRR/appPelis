package com.API.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
public class Usuarios implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private boolean estado = true;
    private String foto;
    private String fecha;
    private String numeroDePeliculas;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "usuario")
    @JsonIgnore
    private Set<UsuarioRoles> usuarioRoles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "usuario_pelicula")
    @JsonIgnore
    private Set<UsuarioPeliculas> usuarioPeliculas = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "usuario_reaccion")
    @JsonIgnore
    private Set<UsuarioReacciones> usuarioReacciones = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "usuario_historial")
    @JsonIgnore
    private Set<HistorialPeliculas> historialPeliculas = new HashSet<>();


    public Usuarios(){

    }

    public Usuarios(Long id, String username, String password, String nombre, String apellido, String email, String telefono, boolean estado, String foto, String fecha, String numeroDePeliculas) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
        this.foto = foto;
        this.fecha = fecha;
        this.numeroDePeliculas = numeroDePeliculas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Autoridad> autoridades = new HashSet<>();
        this.usuarioRoles.forEach(usuarioRol -> {
            autoridades.add(new Autoridad(usuarioRol.getRol().getNombre()));
        });
        return autoridades;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public boolean isEnabled() {
        return estado;
    }

    public void setEnabled(boolean enabled) {
        this.estado = enabled;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Set<UsuarioRoles> getUsuarioRoles() {
        return usuarioRoles;
    }

    public void setUsuarioRoles(Set<UsuarioRoles> usuarioRoles) {
        this.usuarioRoles = usuarioRoles;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Set<UsuarioPeliculas> getUsuarioPeliculas() {
        return usuarioPeliculas;
    }

    public void setUsuarioPeliculas(Set<UsuarioPeliculas> usuarioPeliculas) {
        this.usuarioPeliculas = usuarioPeliculas;
    }

    public String getNumeroDePeliculas() {
        return numeroDePeliculas;
    }

    public void setNumeroDePeliculas(String numeroDePeliculas) {
        this.numeroDePeliculas = numeroDePeliculas;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
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

}
