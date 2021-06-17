package com.toyshop.spring.mysql.api.webControllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.toyshop.spring.mysql.api.entity.Brands;
import com.toyshop.spring.mysql.api.entity.Category;
import com.toyshop.spring.mysql.api.entity.OrderDetailsByOrderId_Entity;
import com.toyshop.spring.mysql.api.entity.OrderDetailsJson;
import com.toyshop.spring.mysql.api.entity.OrderDetails_retrieve_json;
import com.toyshop.spring.mysql.api.entity.Order_detials;
import com.toyshop.spring.mysql.api.entity.Products;
import com.toyshop.spring.mysql.api.service.BrandsRepository;
import com.toyshop.spring.mysql.api.service.CategoryRepository;
import com.toyshop.spring.mysql.api.service.OrderDetailsRepository;
import com.toyshop.spring.mysql.api.service.ProductsRepository;
@CrossOrigin
@Transactional
@RestController
public class OrderDetailsWebController {

	@Autowired
	private OrderDetailsRepository rep;
	
	@Autowired
	private ProductsRepository prodRep;
	
	@Autowired 
	private BrandsRepository brep;
	
	@Autowired
	private CategoryRepository crep;
	
	
//	@GetMapping("/orderdetails")
//	public List<Order_detials> retrieveAllOrderDetails() {
//		List<Order_detials> allOrderDetials = rep.findAll();
//		return allOrderDetials;
//	}
	
	
	@PostMapping("/orderdetails")
	public OrderDetailsJson addOrderDetails(@RequestBody Order_detials orderDetials) {
		orderDetials.setUpdated_at(new Date());
		Order_detials savedorderDetials = rep.save(orderDetials);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedorderDetials.getId())
				.toUri();
		
		OrderDetailsJson data = new OrderDetailsJson();
		data.setSuccess(true);
		data.setMsg("Successfully updated!");
		data.setOrderDetail(savedorderDetials);
		data.setOrderDetailsResObject(ResponseEntity.created(location).build());
		return data;
	}
	
	@DeleteMapping("/orderdetails/{id}")
	public OrderDetailsJson removeorderDetials(@PathVariable int id) {

		OrderDetailsJson data = new OrderDetailsJson();
		if(rep.existsById(id)) {
			rep.deleteById(id);		
			data.setSuccess(true);
			data.setMsg("Successfully removed Order detail Id: " + id);
		} else
		{
			data.setSuccess(false);
			data.setMsg("Order Details not found!");
		}		
		return data;
	}
	
	@GetMapping("orderdetails/{id}")
	public Order_detials retrieveOrderDetailsById(@PathVariable int id) {
		Optional<Order_detials> orderDetails = rep.findById(id);
		
		if(orderDetails.isPresent()) {
			return orderDetails.get();
		} 
		return null;		
	}
	
	@GetMapping("orderdetails/v2/{id}")
	public OrderDetails_retrieve_json retrieveFullOrderDetails(@PathVariable int id) {
		OrderDetails_retrieve_json fullOrderDetails = new OrderDetails_retrieve_json();
		Optional<Order_detials> orderdetail = rep.findById(id);
		
		if(orderdetail.isPresent()) {
			fullOrderDetails.setOrderDetails(orderdetail.get());
			int productid = orderdetail.get().getProductid();
			
			Optional<Products> optionalProduct = prodRep.findById(productid);
			if(optionalProduct.isPresent()) {
				fullOrderDetails.setProductList(optionalProduct.get());
			}			
		}
		
		return fullOrderDetails;
	}
	
	@GetMapping("orderdetails/orderid/{orderid}")
	public List<OrderDetailsByOrderId_Entity> retrieveOrderDetailsByOrderId(@PathVariable int orderid) {
		
		
		//OrderDetailsJson ordJson = new OrderDetailsJson();
		
		List<Order_detials> ord_detailsByOrderId = rep.findByOrderId(orderid);
		
		List<OrderDetailsByOrderId_Entity> finalOrderDetails = new ArrayList<>();
		
		for (Order_detials ord: ord_detailsByOrderId) {
			Products product = prodRep.findById(ord.getProductid()).get();
			Brands brands = brep.findById(product.getBrands()).get();
			Category category = crep.findById(product.getCategory()).get();
			
			OrderDetailsByOrderId_Entity loopOrder = 
					new OrderDetailsByOrderId_Entity(ord.getId()
							, ord.getOrderid()
							, ord.getProductid()
							, ord.getProductname()
							, ord.getProductqty()
							, product.getPrice()
							, product.getImage()
							, category.getName()
							, brands.getName());
			finalOrderDetails.add(loopOrder);
		}
		
//		if (ord_detailsByOrderId != null) {
//			ordJson.setOrderDetails(ord_detailsByOrderId);
//			ordJson.setSuccess(true);
//			ordJson.setMsg("Successfully retrieved order details of orderid: " + orderid);
//		}
		
		return finalOrderDetails;
	}
	
	
	@GetMapping("orderdetails/prodname/{prodname}")
	public OrderDetailsJson retrieveOrderDetailsByProdname(@PathVariable String prodname) {
		
		
		OrderDetailsJson ordJson = new OrderDetailsJson();
		
		List<Order_detials> ord_detailsByOrderId = rep.findByProductName(prodname);
		
		if (ord_detailsByOrderId != null) {
			ordJson.setOrderDetails(ord_detailsByOrderId);
			ordJson.setSuccess(true);
			ordJson.setMsg("Successfully retrieved order details with product name like: " + prodname);
		}
		
		return ordJson;
	}
}
