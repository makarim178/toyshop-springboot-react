package com.toyshop.spring.mysql.api.entity;

import java.util.List;

import org.springframework.http.ResponseEntity;

public class CategoryJson {

	private Boolean success;
	private String msg;
	private Category category;
	private List<Category> categories;
	private ResponseEntity<Object> catResObject;
	
	public CategoryJson() {
		super();
	}

	public CategoryJson(Boolean success, String msg, Category category, List<Category> categories,ResponseEntity<Object> catResObject) {
		super();
		this.success = success;
		this.msg = msg;
		this.category = category;
		this.categories = categories;
		this.catResObject = catResObject;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public ResponseEntity<Object> getCatResObject() {
		return catResObject;
	}

	public void setCatResObject(ResponseEntity<Object> catResObject) {
		this.catResObject = catResObject;
	}
	
	
	
}
