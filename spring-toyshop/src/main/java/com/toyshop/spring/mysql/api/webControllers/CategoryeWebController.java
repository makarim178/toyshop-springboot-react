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

import com.toyshop.spring.mysql.api.entity.Category;
import com.toyshop.spring.mysql.api.entity.CategoryJson;
import com.toyshop.spring.mysql.api.service.CategoryRepository;

@CrossOrigin
@Transactional
@RestController
public class CategoryeWebController {

	@Autowired
	private CategoryRepository catRep;
	
	@GetMapping("/category")
	public List<Category> retrieveAllCategories() {
		List<Category> allCat = catRep.findAll();
		return allCat;
	}
	
	
	@PostMapping("/category")
	public CategoryJson addCategory(@RequestBody Category category) {
		category.setUpdated_at(new Date());
		Category savedCat = catRep.save(category);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedCat.getId())
				.toUri();
		
		CategoryJson data = new CategoryJson();
		data.setSuccess(true);
		data.setMsg("Successfully updated!");
		data.setCategory(category);
		data.setCatResObject(ResponseEntity.created(location).build());
		return data;
	}
	
	@DeleteMapping("/category/{id}")
	public CategoryJson removeCategory(@PathVariable int id) {

		CategoryJson data = new CategoryJson();
		if(catRep.existsById(id)) {
			catRep.deleteById(id);		
			data.setSuccess(true);
			data.setMsg("Successfully removed Category Id: " + id);
		} else
		{
			data.setSuccess(false);
			data.setMsg("Category not found!");
		}
		
		return data;
	}
	
	@GetMapping("category/{id}")
	public Category retrieveCategoryById(@PathVariable int id) {
		Optional<Category> category = catRep.findById(id);
		
		if(category.isPresent()) {
			return category.get();
		} 
		return null;		
	}
	
}
