package com.toyshop.spring.mysql.api.webControllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.toyshop.spring.mysql.api.entity.Brands;
import com.toyshop.spring.mysql.api.entity.Category;
import com.toyshop.spring.mysql.api.entity.ProductV2;
import com.toyshop.spring.mysql.api.entity.Products;
import com.toyshop.spring.mysql.api.entity.ProductsJson;
import com.toyshop.spring.mysql.api.service.BrandsRepository;
import com.toyshop.spring.mysql.api.service.CategoryRepository;
import com.toyshop.spring.mysql.api.service.FileStorageService;
import com.toyshop.spring.mysql.api.service.ProductsRepository;

@CrossOrigin
@Transactional
@RestController
public class ProductsWebController {

	@Autowired
	private ProductsRepository rep;
	
	@Autowired
	private BrandsRepository brep;
	
	@Autowired
	private CategoryRepository crep;
	
	
	@GetMapping("/product")
	public List<Products> retrieveAllProducts() {
		
		return rep.findAll();
	}
	
	@PostMapping("/product")
	public ResponseEntity<Object> addProduct(@RequestBody Products prods) {
		prods.setUpdated_at(new Date());
		Products savedBrands = rep.save(prods);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedBrands.getId())
				.toUri();
		
//		ProductsJson data = new ProductsJson();
//		data.setSuccess(true);
//		data.setMsg("Successfully updated!");
//		data.setProduct(prods);
//		data.setProductssResObject(ResponseEntity.created(location).build());
		// return data;
		return ResponseEntity.created(location).build();
	}
	
	@DeleteMapping("/product/{id}")
	public ProductsJson removeProduct(@PathVariable int id) {

		ProductsJson data = new ProductsJson();
		if(rep.existsById(id)) {
			rep.deleteById(id);		
			data.setSuccess(true);
			data.setMsg("Successfully removed Product Id: " + id);
		} else
		{
			data.setSuccess(false);
			data.setMsg("Product not found!");
		}
		
		return data;
	}
	
	@GetMapping("/product/{id}")
	public Products retrieveProductById(@PathVariable int id) {
		System.out.println(id);
		Optional<Products> prods = rep.findById(id);
		
		if(prods.isPresent()) {
			
			return prods.get();
		} 
		return null;		
	}
	
	@GetMapping("product/name/{name}")
	public List<Products> retrieveProductByName(@PathVariable String name) {
		List<Products> finalList = rep.findByProdName(name);
		return finalList;
	}
	
}
