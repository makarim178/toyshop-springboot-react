package com.toyshop.spring.mysql.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Category {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String name;
	private String description;
	private Date updated_at;
	
	public Category() {
		super();
	}

	public Category(String name, String description, Date created_at, Date updated_at) {
		super();
		this.name = name;
		this.description = description;
		this.updated_at = updated_at;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

	public Integer getId() {
		return id;
	}

	@Override
	public String toString() {
		return String.format("Category [Id=%s, name=%s, description=%s, created_at=%s, updated_at=%s]", id, name,
				description, updated_at);
	}	

}
