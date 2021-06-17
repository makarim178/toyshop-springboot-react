package com.toyshop.spring.mysql.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.toyshop.spring.mysql.api.entity.Order_detials;

public interface OrderDetailsRepository extends JpaRepository<Order_detials, Integer>{

	@Query(value = "SELECT * FROM order_details WHERE orderid = ?1", nativeQuery = true)
	  List<Order_detials> findByOrderId(int orderid);
	  
	@Query(value = "SELECT * FROM order_details WHERE productname LIKE %?1%", nativeQuery = true)
	List<Order_detials> findByProductName(String prodname);
}
