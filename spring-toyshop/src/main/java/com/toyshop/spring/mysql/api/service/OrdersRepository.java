package com.toyshop.spring.mysql.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.toyshop.spring.mysql.api.entity.Order_detials;
import com.toyshop.spring.mysql.api.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer>{
	
	@Query(value = "SELECT * FROM orders WHERE user_id = ?1", nativeQuery = true)
	  List<Orders> findOrdersByUserId(int userid);

}
