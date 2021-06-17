package com.toyshop.spring.mysql.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "orders")
public class Orders {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private int user_id;
	private String productname;
	private String total_products;
	private String transaction_id;
	private String total_amount;
	private String firstname;
	private String lastname;
	private String phonenumber;
	private String email;
	private String streetaddress;
	private String postalcode;
	private String province;
	private String city;
	private String country;
	
	private Date updated_at;
	
	public Orders() {
		super();
	}

	public Orders(int user_id, String productname, String total_products, String transaction_id, String total_amount,
			String firstname, String lastname, String phonenumber, String email, String streetaddress,
			String postalcode, String province, String city, String country, Date updated_at) {
		super();
		this.user_id = user_id;
		this.productname = productname;
		this.total_products = total_products;
		this.transaction_id = transaction_id;
		this.total_amount = total_amount;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phonenumber = phonenumber;
		this.email = email;
		this.streetaddress = streetaddress;
		this.postalcode = postalcode;
		this.province = province;
		this.city = city;
		this.country = country;
		this.updated_at = updated_at;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getTotal_products() {
		return total_products;
	}

	public void setTotal_products(String total_products) {
		this.total_products = total_products;
	}

	public String getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(String transaction_id) {
		this.transaction_id = transaction_id;
	}

	public String getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}	

	public String getStreetaddress() {
		return streetaddress;
	}

	public void setStreetaddress(String streetaddress) {
		this.streetaddress = streetaddress;
	}

	public String getPostalcode() {
		return postalcode;
	}

	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}

	public void setPostalCode(String postalCode) {
		this.postalcode = postalCode;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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
		return String.format(
				"Orders [id=%s, user_id=%s, productname=%s, total_products=%s, transaction_id=%s, total_amount=%s, firstname=%s, lastname=%s, phonenumber=%s, email=%s, streetaddress=%s, postalcode=%s, province=%s, city=%s, country=%s, updated_at=%s]",
				id, user_id, productname, total_products, transaction_id, total_amount, firstname, lastname,
				phonenumber, email, streetaddress, postalcode, province, city, country, updated_at);
	}


}
