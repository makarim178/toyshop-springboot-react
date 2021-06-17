package com.toyshop.spring.mysql.api.entity;

import java.math.BigDecimal;

public class NonceEntity {
	private String paymentMethodNonce;
	private BigDecimal amount;
	
	public NonceEntity() {
		super();
	}
	public NonceEntity(String paymentMethodNonce, BigDecimal amount) {
		super();
		this.paymentMethodNonce = paymentMethodNonce;
		this.amount = amount;
	}
	public String getPaymentMethodNonce() {
		return paymentMethodNonce;
	}
	public void setPaymentMethodNonce(String paymentMethodNonce) {
		this.paymentMethodNonce = paymentMethodNonce;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return String.format("NonceEntity [paymentMethodNonce=%s, amount=%s]", paymentMethodNonce, amount);
	}
	
	
	
}
