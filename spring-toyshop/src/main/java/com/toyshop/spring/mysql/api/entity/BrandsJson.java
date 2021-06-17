package com.toyshop.spring.mysql.api.entity;

import java.util.List;

import org.springframework.http.ResponseEntity;

public class BrandsJson {

	private Boolean success;
	private String msg;
	private Brands brands;
	private List<Brands> allBrands;
	private ResponseEntity<Object> brandsResObject;
	
	public BrandsJson() {
		super();
	}
	
	public BrandsJson(Boolean success, String msg, Brands brands, List<Brands> allBrands,
			ResponseEntity<Object> brandsResObject) {
		super();
		this.success = success;
		this.msg = msg;
		this.brands = brands;
		this.allBrands = allBrands;
		this.brandsResObject = brandsResObject;
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

	public Brands getBrands() {
		return brands;
	}

	public void setBrands(Brands brands) {
		this.brands = brands;
	}

	public List<Brands> getAllBrands() {
		return allBrands;
	}

	public void setAllBrands(List<Brands> allBrands) {
		this.allBrands = allBrands;
	}

	public ResponseEntity<Object> getBrandsResObject() {
		return brandsResObject;
	}

	public void setBrandsResObject(ResponseEntity<Object> brandsResObject) {
		this.brandsResObject = brandsResObject;
	}	
}
