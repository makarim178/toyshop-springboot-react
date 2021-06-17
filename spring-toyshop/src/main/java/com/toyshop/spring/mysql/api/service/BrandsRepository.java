package com.toyshop.spring.mysql.api.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyshop.spring.mysql.api.entity.Brands;

public interface BrandsRepository extends JpaRepository<Brands, Integer>{

}
