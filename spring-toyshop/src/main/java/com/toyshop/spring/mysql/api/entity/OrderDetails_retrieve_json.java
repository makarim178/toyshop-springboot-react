package com.toyshop.spring.mysql.api.entity;

public class OrderDetails_retrieve_json {
	private Order_detials orderDetails;
	private Products productList;
	
	public OrderDetails_retrieve_json() {
		super();
	}
	
	public OrderDetails_retrieve_json(Order_detials orderDetails, Products productList) {
		super();
		this.orderDetails = orderDetails;
		this.productList = productList;
	}

	public Order_detials getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(Order_detials orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Products getProductList() {
		return productList;
	}

	public void setProductList(Products productList) {
		this.productList = productList;
	}	
	
}
