package com.toyshop.spring.mysql.api.webControllers;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.toyshop.spring.mysql.api.entity.Brands;
import com.toyshop.spring.mysql.api.entity.BrandsJson;
import com.toyshop.spring.mysql.api.service.BrandsRepository;

@CrossOrigin
@Transactional
@RestController
public class BrandsWebController {

	@Autowired
	private BrandsRepository rep;
	
	@GetMapping("/brands")
	public List<Brands> retrieveAllBrands() {
		return rep.findAll();
	}
	
	
	@PostMapping("/brands")
	public BrandsJson addBrands(@RequestBody Brands brands) {
		brands.setUpdated_at(new Date());
		Brands savedBrands = rep.save(brands);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedBrands.getId())
				.toUri();
		
		BrandsJson data = new BrandsJson();
		data.setSuccess(true);
		data.setMsg("Successfully updated!");
		data.setBrands(brands);
		data.setBrandsResObject(ResponseEntity.created(location).build());
		return data;
	}
	
	@DeleteMapping("/brands/{id}")
	public BrandsJson removeBrands(@PathVariable int id) {

		BrandsJson data = new BrandsJson();
		if(rep.existsById(id)) {
			rep.deleteById(id);		
			data.setSuccess(true);
			data.setMsg("Successfully removed Brands Id: " + id);
		} else
		{
			data.setSuccess(false);
			data.setMsg("Brands not found!");
		}
		
		return data;
	}
	
	@GetMapping("brands/{id}")
	public Brands retrieveBrandsById(@PathVariable int id) {
		Optional<Brands> brands = rep.findById(id);
		
		if(brands.isPresent()) {
			return brands.get();
		} 
		return null;		
	}
	
}
