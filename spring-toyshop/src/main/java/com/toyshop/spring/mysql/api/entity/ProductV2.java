package com.toyshop.spring.mysql.api.entity;

public class ProductV2{
	private Products product;
	private Brands brandsDetails;
	private Category categoryDetails;
	
	public ProductV2() {
		super();
	}	

	public ProductV2(Products product, Brands brandsDetails, Category categoryDetails) {
		super();
		this.product = product;
		this.brandsDetails = brandsDetails;
		this.categoryDetails = categoryDetails;
	}
	public Products getProduct() {
		return product;
	}

	public void setProduct(Products product) {
		this.product = product;
	}

	public Brands getBrandsDetails() {
		return brandsDetails;
	}

	public void setBrandsDetails(Brands brandsDetails) {
		this.brandsDetails = brandsDetails;
	}

	public Category getCategoryDetails() {
		return categoryDetails;
	}

	public void setCategoryDetails(Category categoryDetails) {
		this.categoryDetails = categoryDetails;
	}

}
