package com.toyshop.spring.mysql.api.webControllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.toyshop.spring.mysql.api.entity.Products;
import com.toyshop.spring.mysql.api.service.FileStorageService;

@CrossOrigin
@RestController
@RequestMapping("files")
public class GetImageFileController {
	
	@Autowired
	private FileStorageService fileStorageService;
	
	//Getting Image for product
	
	@PutMapping
	public ResponseEntity<Products> addProductWithImage(@RequestParam("file") MultipartFile file){
		String filename = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder
			.fromCurrentContextPath().path("/files/")
			.path(filename)
			.toUriString();
		
		Products fileResponse = new Products();
		fileResponse.setImage(fileDownloadUri);
		return new ResponseEntity<Products>(fileResponse, HttpStatus.OK);
	}
	
	@GetMapping("/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,HttpServletRequest request){
		
		Resource resource = fileStorageService.loadFileAsResource(fileName);
		
		String contentType = null;
		
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		}catch(IOException ex) {
			System.out.println("Could not determine fileType");
		}
		
		if(contentType==null) {
			contentType = "application/octet-stream";
		}
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.body(resource);
	}
	

}
