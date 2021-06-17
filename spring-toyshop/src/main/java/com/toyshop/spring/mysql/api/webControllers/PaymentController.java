package com.toyshop.spring.mysql.api.webControllers;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.ClientTokenRequest;
import com.braintreegateway.Environment;
import com.braintreegateway.Result;
import com.braintreegateway.Transaction;
import com.braintreegateway.TransactionRequest;
import com.braintreegateway.ValidationError;
import com.braintreegateway.Transaction.Status;
import com.toyshop.spring.mysql.api.SpringToyshopApplication;
import com.toyshop.spring.mysql.api.entity.NonceEntity;
import com.toyshop.spring.mysql.api.entity.TransactionEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;
import java.util.Arrays;

@Service
@CrossOrigin
@RestController
public class PaymentController {
	
	
	
	private static final String MERCHANT_ID = "y6pknnqdxkh7x7p3";
	private static final String PUBLIC_KEY = "kzhcjf6dysnh23vc";
	private static final String PRIVATE_KEY = "0b0e8e07919cdad1a1041a9be334298a";
	
	public BraintreeGateway getBrainTreeGateway() {
		return new BraintreeGateway(Environment.SANDBOX, MERCHANT_ID, PUBLIC_KEY, PRIVATE_KEY);
	}
	
	@GetMapping("/payment/gettoken")
	public String getClientToken() {
		BraintreeGateway gateway = getBrainTreeGateway();
		ClientTokenRequest clientTokenRequest = new ClientTokenRequest();
		String clientToken = gateway.clientToken().generate(clientTokenRequest);
		
		
		return clientToken;
	}
	
	@PostMapping("/payment")
	public TransactionEntity paymentProcess(@RequestBody NonceEntity nonce) {
		System.out.println(nonce.getPaymentMethodNonce());
		System.out.println(nonce.getAmount());
		Result<Transaction> result = this.processTransaction(nonce.getAmount(), nonce.getPaymentMethodNonce());
		if (result.isSuccess()) {
			Transaction transaction = result.getTarget();
			System.out.println("Success!: " + transaction.getId());
			String transactionId = transaction.getId();
			TransactionEntity trans = new TransactionEntity(true, transactionId);
			System.out.println(transactionId);
			return trans;
		} else if (result.getTransaction() != null) {
			Transaction transaction = result.getTransaction();
			System.out.println("Failed!: " + transaction.getId());
			System.out.println("Error processing transaction:");
			System.out.println("  Status: " + transaction.getStatus());
			System.out.println("  Code: " + transaction.getProcessorResponseCode());
			System.out.println("  Text: " + transaction.getProcessorResponseText());
			TransactionEntity trans = new TransactionEntity(false, "");
			return trans;
		} else {
			for (ValidationError error : result.getErrors().getAllDeepValidationErrors()) {
				System.out.println("Attribute: " + error.getAttribute());
				System.out.println("  Code: " + error.getCode());
				System.out.println("  Message: " + error.getMessage());
			}
			TransactionEntity trans = new TransactionEntity(false, "");
			return trans;
		}
	}
	
	public Result<Transaction> processTransaction(BigDecimal totalCost, String paymentMethodNonce) {
		TransactionRequest req = new TransactionRequest().amount(totalCost).paymentMethodNonce(paymentMethodNonce)
				.options().submitForSettlement(true).done();

		Result<Transaction> result = this.getBrainTreeGateway().transaction().sale(req);
		System.out.println(result.getMessage());
		return result;
	}

	
	
	

}
