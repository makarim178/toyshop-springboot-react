package com.toyshop.spring.mysql.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Brands {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String name;
	private Date updated_at;
	
	public Brands() {
		super();
	}

	public Brands(String name, Date created_at, Date updated_at) {
		super();
		this.name = name;
		this.updated_at = updated_at;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
		return String.format("Brands [id=%s, name=%s, updated_at=%s]", id, name, updated_at);
	}
}
