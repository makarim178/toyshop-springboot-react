package com.toyshop.spring.mysql.api.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.toyshop.spring.mysql.api.FileStorageProperties;
import com.toyshop.spring.mysql.api.Exception.FileNotFoundExceptionWithHttpResponseStatus;
import com.toyshop.spring.mysql.api.Exception.FileStorageException;

@Service
public class FileStorageService {
	private final Path fileStorageLocation;

	@Autowired
	public FileStorageService(FileStorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
		
		try {
			Files.createDirectories(this.fileStorageLocation);
			
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory to upload");
		}
	}
	
	// function to store the file
	public String storeFile(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		
		try {
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(),  targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return fileName;
		} catch (Exception ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex );
		}
	}
	
	// function to load the file
	public Resource loadFileAsResource(String filename) {
		try {
			Path filePath = this.fileStorageLocation.resolve(filename).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if(resource.exists()) {
				return resource;
			} else {
				throw new FileNotFoundExceptionWithHttpResponseStatus("File not found " + filename);
			}
			
		} catch (Exception ex) {
			throw new FileNotFoundExceptionWithHttpResponseStatus("File not found " + filename);
		}
	}
}
