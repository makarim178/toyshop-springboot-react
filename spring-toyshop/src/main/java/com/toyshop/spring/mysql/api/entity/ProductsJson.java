package com.toyshop.spring.mysql.api.entity;

import java.util.List;

import org.springframework.http.ResponseEntity;

public class ProductsJson {

	private Boolean success;
	private String msg;
	private Products product;
	private List<Products> products;
	private ResponseEntity<Object> productssResObject;
	
	public ProductsJson() {
		super();
	}	

	public ProductsJson(Boolean success, String msg, Products product, List<Products> products,
			ResponseEntity<Object> productssResObject) {
		super();
		this.success = success;
		this.msg = msg;
		this.product = product;
		this.products = products;
		this.productssResObject = productssResObject;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Products getProduct() {
		return product;
	}

	public void setProduct(Products product) {
		this.product = product;
	}

	public List<Products> getProducts() {
		return products;
	}

	public void setProducts(List<Products> products) {
		this.products = products;
	}

	public ResponseEntity<Object> getProductssResObject() {
		return productssResObject;
	}

	public void setProductssResObject(ResponseEntity<Object> productssResObject) {
		this.productssResObject = productssResObject;
	}

	
}
