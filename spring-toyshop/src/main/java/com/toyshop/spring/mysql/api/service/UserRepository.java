package com.toyshop.spring.mysql.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.toyshop.spring.mysql.api.entity.Order_detials;
import com.toyshop.spring.mysql.api.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	@Modifying
	@Query(value = "UPDATE USERS SET name = ?1 WHERE id = ?2", nativeQuery = true)
	  void UpdateUser_Name(String name, int id);
	
	@Modifying
	@Query(value = "UPDATE USERS SET email = ?1 WHERE id = ?2", nativeQuery = true)
	  void UpdateUser_Email(String email, int id);
	
	@Modifying
	@Query(value = "UPDATE USERS SET phone = ?1 WHERE id = ?2", nativeQuery = true)
	  void UpdateUser_Phone(String phone, int id);
}
