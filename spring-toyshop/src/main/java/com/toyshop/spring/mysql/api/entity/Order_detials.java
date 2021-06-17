package com.toyshop.spring.mysql.api.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "order_details")
public class Order_detials {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private int orderid;
	private int productid;
	private String productname;
	private String productqty;
	private String productprice;
	private Date updated_at;
	
	public Order_detials() {
		super();
	}

	public Order_detials(int orderid, int productid, String productname, String productqty,
			String productprice, Date updated_at) {
		super();
		this.orderid = orderid;
		this.productid = productid;
		this.productname = productname;
		this.productqty = productqty;
		this.productprice = productprice;
		this.updated_at = updated_at;
	}

	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public int getProductid() {
		return productid;
	}

	public void setProductid(int productid) {
		this.productid = productid;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getProductqty() {
		return productqty;
	}

	public void setProductqty(String productqty) {
		this.productqty = productqty;
	}

	public String getProductprice() {
		return productprice;
	}

	public void setProductprice(String productprice) {
		this.productprice = productprice;
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
				"OrderDetials [id=%s, orderid=%s, productid=%s, productname=%s, productqty=%s, productprice=%s, updated_at=%s]",
				id, orderid, productid, productname, productqty, productprice, updated_at);
	}
	
}
