package com.toyshop.spring.mysql.api.entity;

import java.util.List;

import org.springframework.http.ResponseEntity;

public class OrdersJson {

	private Boolean success;
	private String msg;
	private Orders order;
	private List<Orders> orders;
	private ResponseEntity<Object> orderssResObject;
	
	public OrdersJson() {
		super();
	}

	public OrdersJson(Boolean success, String msg, Orders order, List<Orders> orders,
			ResponseEntity<Object> orderssResObject) {
		super();
		this.success = success;
		this.msg = msg;
		this.order = order;
		this.orders = orders;
		this.orderssResObject = orderssResObject;
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

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public List<Orders> getOrders() {
		return orders;
	}

	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}

	public ResponseEntity<Object> getOrderssResObject() {
		return orderssResObject;
	}

	public void setOrderssResObject(ResponseEntity<Object> orderssResObject) {
		this.orderssResObject = orderssResObject;
	}
}
