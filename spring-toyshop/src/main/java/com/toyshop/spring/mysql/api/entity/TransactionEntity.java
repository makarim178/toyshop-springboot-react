package com.toyshop.spring.mysql.api.entity;

public class TransactionEntity {
	
	private Boolean status;
	private String transactionid;
	public TransactionEntity() {
		super();
	}
	public TransactionEntity(Boolean status, String transactionid) {
		super();
		this.status = status;
		this.transactionid = transactionid;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public String getTransactionid() {
		return transactionid;
	}
	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
	}
	

}
