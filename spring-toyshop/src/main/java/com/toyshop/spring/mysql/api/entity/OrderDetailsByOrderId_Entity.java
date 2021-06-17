package com.toyshop.spring.mysql.api.entity;

public class OrderDetailsByOrderId_Entity {
	private Integer orderDetialsid;
	private Integer orderid;
    private Integer productid;
    private String productname;
    private String productQty;
    private String productprice;
    private String image;
    private String category;
    private String brands;
    
    
	public OrderDetailsByOrderId_Entity() {
		super();
	}

	public OrderDetailsByOrderId_Entity(Integer orderDetialsid, Integer orderid, Integer productid, String productname,
			String productQty, String productprice, String image, String category, String brands) {
		super();
		this.orderDetialsid = orderDetialsid;
		this.orderid = orderid;
		this.productid = productid;
		this.productname = productname;
		this.productQty = productQty;
		this.productprice = productprice;
		this.image = image;
		this.category = category;
		this.brands = brands;
	}

	public Integer getOrderDetialsid() {
		return orderDetialsid;
	}

	public void setOrderDetialsid(Integer orderDetialsid) {
		this.orderDetialsid = orderDetialsid;
	}

	public Integer getOrderid() {
		return orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}

	public Integer getProductid() {
		return productid;
	}

	public void setProductid(Integer productid) {
		this.productid = productid;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getProductQty() {
		return productQty;
	}

	public void setProductQty(String productQty) {
		this.productQty = productQty;
	}

	public String getProductprice() {
		return productprice;
	}

	public void setProductprice(String productprice) {
		this.productprice = productprice;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBrands() {
		return brands;
	}

	public void setBrands(String brands) {
		this.brands = brands;
	}

	@Override
	public String toString() {
		return String.format(
				"OrderDetailsByOrderId_Entity [orderDetialsid=%s, orderid=%s, productid=%s, productname=%s, productQty=%s, productprice=%s, productImage=%s, category=%s, brands=%s]",
				orderDetialsid, orderid, productid, productname, productQty, productprice, image, category,
				brands);
	}	

}
