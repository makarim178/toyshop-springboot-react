package com.toyshop.spring.mysql.api.entity;

public class UserJson {
	
	private Boolean success;
	private String msg;
	private Users user;
	
	
	
	public UserJson() {
		super();
	}
	
	

	public UserJson(Boolean success, String msg, Users user) {
		super();
		this.success = success;
		this.msg = msg;
		this.user = user;
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

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}
	
	

}
