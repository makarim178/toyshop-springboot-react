package com.toyshop.spring.mysql.api.webControllers;

import java.net.URI;
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

import com.toyshop.spring.mysql.api.entity.Orders;
import com.toyshop.spring.mysql.api.entity.OrdersJson;
import com.toyshop.spring.mysql.api.service.OrdersRepository;

@CrossOrigin
@Transactional
@RestController
public class OrdersWebController {

	@Autowired
	private OrdersRepository rep;
	
	@GetMapping("/order")
	public List<Orders> retrieveAllOrders() {
		List<Orders> orders = rep.findAll();
		return orders;
	}
	
	
	@PostMapping("/order")
	public OrdersJson addOrder(@RequestBody Orders order) {
		order.setUpdated_at(new Date());
		Orders savedOrders = rep.save(order);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedOrders.getId())
				.toUri();
		
		OrdersJson data = new OrdersJson();
		data.setSuccess(true);
		data.setMsg("Successfully updated!");
		data.setOrder(order);
		data.setOrderssResObject(ResponseEntity.created(location).build());
		return data;
	}
	
	@DeleteMapping("/order/{id}")
	public OrdersJson removeOrders(@PathVariable int id) {

		OrdersJson data = new OrdersJson();
		if(rep.existsById(id)) {
			rep.deleteById(id);		
			data.setSuccess(true);
			data.setMsg("Successfully removed order Id: " + id);
		} else
		{
			data.setSuccess(false);
			data.setMsg("Order not found!");
		}
		
		return data;
	}
	
	@GetMapping("/order/user/{id}")
	public List<Orders> retrieveOrdersByUserId(@PathVariable int id) {
		List<Orders> ordersByUser = rep.findOrdersByUserId(id);
		return ordersByUser;
	}
	
	
	@GetMapping("order/{id}")
	public Orders retrieveOrderById(@PathVariable int id) {
		Optional<Orders> order = rep.findById(id);
		
		if(order.isPresent()) {
			return order.get();
		} 
		return null;		
	}
	
}
