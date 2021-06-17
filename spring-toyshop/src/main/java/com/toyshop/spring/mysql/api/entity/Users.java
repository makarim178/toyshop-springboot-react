package com.toyshop.spring.mysql.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Users {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String first_name;
	private String last_name;
	private String name;
	private String username;
	private String phone;
	private String gender;
	private String session_token;
	private String password;
	private String email;
	private Date updated_at;
	private String usertype;
	
	public Users() {
		super();
	}
	
	

	public Users(String first_name, String last_name, String name, String username, String phone, String gender,
			String session_token, String password, String email, Date updated_at) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.name = name;
		this.username = username;
		this.phone = phone;
		this.gender = gender;
		this.session_token = session_token;
		this.password = password;
		this.email = email;
		this.updated_at = updated_at;
	}



	public Users(String first_name, String last_name, String name, String username, String phone, String gender,
			String session_token, String password, String email, Date updated_at, String usertype) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.name = name;
		this.username = username;
		this.phone = phone;
		this.gender = gender;
		this.session_token = session_token;
		this.password = password;
		this.email = email;
		this.updated_at = updated_at;
		this.usertype = usertype;
	}
	
	public Integer getId() {
		return id;
	}
	
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getSession_token() {
		return session_token;
	}
	public void setSession_token(String session_token) {
		this.session_token = session_token;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getUpdated_at() {
		return updated_at;
	}
	
	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}
	
	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public boolean matchPass(String username, String password) {
		return (this.username == username && this.password == password);  
	}

	@Override
	public String toString() {
		return String.format(
				"User [id=%s, first_name=%s, last_name=%s, name=%s, username=%s, phone=%s, gender=%s, session_token=%s, password=%s, email=%s, updated_at=%s]",
				id, first_name, last_name, name, username, phone, gender, session_token, password, email, updated_at);
	}

}
