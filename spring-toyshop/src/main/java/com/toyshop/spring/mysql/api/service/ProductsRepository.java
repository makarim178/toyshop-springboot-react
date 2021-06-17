package com.toyshop.spring.mysql.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.toyshop.spring.mysql.api.entity.Order_detials;
import com.toyshop.spring.mysql.api.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer>{
	
	@Query(value = "SELECT * FROM products WHERE name LIKE %?1%", nativeQuery = true)
	  List<Products> findByProdName(String name);

}
