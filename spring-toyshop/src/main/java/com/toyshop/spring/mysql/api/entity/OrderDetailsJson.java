package com.toyshop.spring.mysql.api.entity;

import java.util.List;

import org.springframework.http.ResponseEntity;

public class OrderDetailsJson {

	private Boolean success;
	private String msg;
	private Order_detials orderDetail;
	private List<Order_detials> orderDetails;
	private ResponseEntity<Object> orderDetailsResObject;
	
	public OrderDetailsJson() {
		super();
	}

	public OrderDetailsJson(Boolean success, String msg, Order_detials orderDetail, List<Order_detials> orderDetails,
			ResponseEntity<Object> orderDetailsResObject) {
		super();
		this.success = success;
		this.msg = msg;
		this.orderDetail = orderDetail;
		this.orderDetails = orderDetails;
		this.orderDetailsResObject = orderDetailsResObject;
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

	public Order_detials getOrderDetail() {
		return orderDetail;
	}

	public void setOrderDetail(Order_detials orderDetail) {
		this.orderDetail = orderDetail;
	}

	public List<Order_detials> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<Order_detials> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public ResponseEntity<Object> getOrderDetailsResObject() {
		return orderDetailsResObject;
	}

	public void setOrderDetailsResObject(ResponseEntity<Object> orderDetailsResObject) {
		this.orderDetailsResObject = orderDetailsResObject;
	}
		
}
