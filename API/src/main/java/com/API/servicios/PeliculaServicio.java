package com.API.servicios;

import com.API.modelos.Peliculas;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;

public interface PeliculaServicio {

    Peliculas guardarPelicula(Peliculas peliculas);

    Peliculas actualizarPelicula(Peliculas peliculas);

    Peliculas obtenerPelicula(Long id);

    Set<Peliculas> obtenerPeliculas();

    void eliminarPelicula(Long id);

    public static void saveImagen(String uploadDir, Long id, String fileName,
                                MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String imagenNombre = "pelicula"+id+".jpeg";
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(imagenNombre);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("No se pudo guardar la imagen: " + fileName, ioe);
        }
    }
}
