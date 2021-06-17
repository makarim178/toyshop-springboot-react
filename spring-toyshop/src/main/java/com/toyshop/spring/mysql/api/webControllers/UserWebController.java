package com.toyshop.spring.mysql.api.webControllers;


import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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

import com.toyshop.spring.mysql.api.entity.UserCredential;
import com.toyshop.spring.mysql.api.entity.UserJson;
import com.toyshop.spring.mysql.api.entity.Users;
import com.toyshop.spring.mysql.api.service.UserRepository;

@CrossOrigin
@Transactional
@RestController
public class UserWebController {
	
	@Autowired
	private UserRepository userRepo;	
	
	@GetMapping("/allusers")
	public List<Users> getAllUsers() {
		return userRepo.findAll();
	}
	
	@PostMapping("/user")
	//public ResponseEntity<Object> createUser(@RequestBody Users user) {
	public Users createUser(@RequestBody Users user) {
		System.out.println(user.getEmail());
		user.setUpdated_at(new Date());
		Users savedUser = userRepo.save(user);
//		URI location = ServletUriComponentsBuilder
//			.fromCurrentRequest()
//			.path("/{id}")
//			.buildAndExpand(savedUser.getId()).toUri();
		
		System.out.println("user id: " + savedUser);
		//return ResponseEntity.created(location).build();
		return savedUser;
	}
	
	public String genToken() {
		Random randInt = new Random();
		String allChars = "abcdefghijzlmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()?:";
		String session_token = "";
		for (int i = 0; i < 20; i++) {
			session_token += allChars.charAt(randInt.nextInt(allChars.length()-1));
		}	
		
		return session_token;
	}
	
	public Users returnUserWithToken(int id) {
		Optional<Users> user = userRepo.findById(id);
		if(user.isPresent()) {
			Users finalUser = user.get();
			finalUser.setSession_token(genToken());
			
			return finalUser;					
		}
		return null;
	}
	
//	@PostMapping(path = "/user/login",
//			consumes = {MediaType.APPLICATION_JSON_UTF8})
//	public UserJson userLoginFormData(UserCredential userCred) {		
//		UserRepository users = userRepo;
//		UserJson data = new UserJson();
//		
//		List<Users> allUsers = users.findAll();
//		int id = 0;
//		for(Users user: allUsers) {	
//			if(user.getUsername().equals(userCred.getUsername()) && user.getPassword().equals(userCred.getPassword()) )  {
//				id = user.getId();
//			}
//		}
//		
//		if (id != 0) {
//			Users returnedUser = returnUserWithToken(id);
//			userRepo.save(returnedUser);
//			
//			data.setSuccess(true);
//			data.setMsg("User Login Successfull");
//			data.setUser(returnedUser);
//		} else {
//			data.setSuccess(false);
//			data.setMsg("Wrong username or password!");
//		}
//		
//		return data;
//	}
	
	@PostMapping("/user/login")
	public UserJson  loginUser(@RequestBody UserCredential userCred) {
		UserRepository users = userRepo;
		UserJson data = new UserJson();
		
		List<Users> allUsers = users.findAll();
		int id = 0;
		for(Users user: allUsers) {	
			if(user.getUsername().equals(userCred.getUsername()) && user.getPassword().equals(userCred.getPassword()) )  {
				id = user.getId();
			}
		}
		
		if (id != 0) {
			Users returnedUser = returnUserWithToken(id);
			userRepo.save(returnedUser);
			
			data.setSuccess(true);
			data.setMsg("User Login Successfull");
			data.setUser(returnedUser);
		} else {
			data.setSuccess(false);
			data.setMsg("Wrong username or password!");
		}
		
		return data;		
	}
	
	@PostMapping("/user/{name}/{id}")
	public Optional<Users> updateNameByUserid(@PathVariable String name, @PathVariable int id) {
		userRepo.UpdateUser_Name(name, id);
		Optional<Users> updatedUser = userRepo.findById(id);
		return updatedUser;
	}
	
	@PostMapping("/user/email/{email}/{id}")
	public Optional<Users> updateEmailByUserid(@PathVariable String email, @PathVariable int id) {
		userRepo.UpdateUser_Email(email, id);
		Optional<Users> updatedUser = userRepo.findById(id);
		return updatedUser;
	}
	
	@PostMapping("/user/phone/{phone}/{id}")
	public Optional<Users> updatePhoneByUserid(@PathVariable String phone, @PathVariable int id) {
		userRepo.UpdateUser_Phone(phone, id);
		Optional<Users> updatedUser = userRepo.findById(id);
		return updatedUser;
	}
	
	@GetMapping("/user/logout/{id}")
	public UserJson logoutUser(@PathVariable int id) {
		Optional<Users> findUser = userRepo.findById(id);
		UserJson data = new UserJson();
		
		if(findUser.isPresent()) {
			Users user = findUser.get();
			
			if (user.getSession_token() == null) {
				data.setSuccess(true);
				data.setMsg("User Session has expired!");
			} else {
				user.setSession_token(null);
				userRepo.save(user);
				
				data.setSuccess(true);
				data.setMsg("User Successfully logged out");				
			}
			
		} else {
			data.setSuccess(false);
			data.setMsg("user not found!");
		}		
		return data;		
	}
	
	@GetMapping("/user/details/{id}")	
	public UserJson userDetails(@PathVariable int id) {
		UserJson data = new UserJson();
		
		Optional<Users> foundUser = userRepo.findById(id);
		if (foundUser.isPresent()) {
			data.setSuccess(true);
			data.setMsg("Successfully fetch user");
			data.setUser(foundUser.get());
		}else{
			data.setSuccess(false);
			data.setMsg("user not found");
		}				
		return data;
	}
	

	@DeleteMapping("/user/{id}")
	public UserJson deleteuser(@PathVariable int id) {
		UserJson data = new UserJson();
		

		if(userRepo.existsById(id)) {
			userRepo.deleteById(id);
			data.setSuccess(true);
			data.setMsg("Successfully removed user: " + id);			
		} else {
			data.setSuccess(false);
			data.setMsg("Could not found user");
		}
		return data;
	}

}
