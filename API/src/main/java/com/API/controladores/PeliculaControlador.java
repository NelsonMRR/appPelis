package com.API.controladores;

import com.API.modelos.Peliculas;
import com.API.servicios.PeliculaServicio;
import com.google.gson.Gson;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/peliculas")
@CrossOrigin("*")
public class PeliculaControlador {

    @Autowired
    private PeliculaServicio peliculaServicio;

    @GetMapping("/imagenes/{filename}")
    public String getImage(@PathVariable("filename") String filename) throws IOException {
        /*byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File("imagenes/movies/"+filename+".jpeg"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);*/
        InputStream in = null;
        byte[] data = null;
        // lee la matriz de bytes de imagen
        try {
            in = new FileInputStream("imagenes/movies/"+filename+".jpeg");
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            //e.printStackTrace();
            in = new FileInputStream("imagenes/movies/default.png");
            data = new byte[in.available()];
            in.read(data);
            in.close();
        }
        String s = new String(Base64.encodeBase64(data));
        //System.out.println(s);
        return s;
    }

    @PostMapping("/")
    public ResponseEntity<Peliculas> guardarPelicula(@RequestParam("pelicula") String strPelicula, @RequestParam("fichero") MultipartFile multipartFile) throws IOException {

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "imagenes/movies";

        Gson gson = new Gson();System.out.println(gson.fromJson(strPelicula, Peliculas.class));
        Peliculas peliculas = gson.fromJson(strPelicula, Peliculas.class);
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        peliculas.setFecha(formatter.format(date));
        peliculas.setNumeroDeReacciones("0");

        peliculas.setImagen(fileName);
        Peliculas peliculaGuardada = peliculaServicio.guardarPelicula(peliculas);
        PeliculaServicio.saveImagen(uploadDir, peliculas.getId(), fileName, multipartFile);

        return ResponseEntity.ok(peliculas);
    }

    @GetMapping("/{peliculaId}")
    public Peliculas obtenerPelicula(@PathVariable("peliculaId") Long id){
        return peliculaServicio.obtenerPelicula(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> obtenerPeliculas(){
        return ResponseEntity.ok(peliculaServicio.obtenerPeliculas());
    }

    @PutMapping("/")
    public Peliculas actualizarPelicula(@RequestParam("pelicula") String strPelicula, @RequestParam("fichero") MultipartFile multipartFile) throws IOException {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "imagenes/movies";

        Gson gson = new Gson();System.out.println(gson.fromJson(strPelicula, Peliculas.class));
        Peliculas peliculas = gson.fromJson(strPelicula, Peliculas.class);
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        peliculas.setFecha(formatter.format(date));
        peliculas.setNumeroDeReacciones("0");

        peliculas.setImagen(fileName);
        PeliculaServicio.saveImagen(uploadDir, peliculas.getId(), fileName, multipartFile);
        return  peliculaServicio.actualizarPelicula(peliculas);
    }

    @PutMapping("/likes")
    public Peliculas actualizarPelicula(@RequestBody Peliculas peliculas){
        return  peliculaServicio.actualizarPelicula(peliculas);
    }

    public PeliculaServicio getPeliculaServicio() {
        return peliculaServicio;
    }

    public void setPeliculaServicio(PeliculaServicio peliculaServicio) {
        this.peliculaServicio = peliculaServicio;
    }

    @DeleteMapping("/{peliculaId}")
    public void eliminarPelicula(@PathVariable("peliculaId") Long id){
        peliculaServicio.eliminarPelicula(id);
    }
}
