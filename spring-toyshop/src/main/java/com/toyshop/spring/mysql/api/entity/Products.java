package com.toyshop.spring.mysql.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Products {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String name;
	private String description;
	private String price;
	private String stock;
	private int is_active;
	private String image;
	private String age_target;
	private String max_Order_qty;
	private int category;
	private int brands;
	private Date updated_at;
	
	public Products() {
		super();
	}
	
	public Products(String name, String description, String price, String stock, int is_active, String image,
			String age_target, String max_Order_qty, int category, int brands, Date updated_at) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.is_active = is_active;
		this.image = image;
		this.age_target = age_target;
		this.max_Order_qty = max_Order_qty;
		this.category = category;
		this.brands = brands;
		this.updated_at = updated_at;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getStock() {
		return stock;
	}

	public void setStock(String stock) {
		this.stock = stock;
	}

	public int getIs_active() {
		return is_active;
	}

	public void setIs_active(int is_active) {
		this.is_active = is_active;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getAge_target() {
		return age_target;
	}

	public void setAge_target(String age_target) {
		this.age_target = age_target;
	}

	public String getMax_Order_qty() {
		return max_Order_qty;
	}

	public void setMax_Order_qty(String max_Order_qty) {
		this.max_Order_qty = max_Order_qty;
	}

	public int getCategory() {
		return category;
	}

	public void setCategory(int category) {
		this.category = category;
	}

	public int getBrands() {
		return brands;
	}

	public void setBrands(int brands) {
		this.brands = brands;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

	@Override
	public String toString() {
		return String.format(
				"Products [id=%s, name=%s, description=%s, price=%s, stock=%s, is_active=%s, image=%s, age_target=%s, max_Order_qty=%s, category=%s, brands=%s, updated_at=%s]",
				id, name, description, price, stock, is_active, image, age_target, max_Order_qty, category, brands,
				updated_at);
	}
	
}
