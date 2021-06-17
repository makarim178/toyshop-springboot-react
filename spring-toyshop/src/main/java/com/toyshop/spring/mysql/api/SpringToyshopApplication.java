package com.toyshop.spring.mysql.api;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Environment;
import com.toyshop.spring.mysql.api.service.UserRepository;

@SpringBootApplication
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class SpringToyshopApplication implements CommandLineRunner {
	
	public static String DEFAULT_CONFIG_FILENAME = "config.properties";
    public static BraintreeGateway gateway;
	

//	@Autowired
//	private JdbcTemplate jdbcTemplate;
	@Autowired
	private UserRepository userRepo;
	
	public static void main(String[] args) {        
        
		SpringApplication.run(SpringToyshopApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		// String first_name, String last_name, String name, String username, String phone, String gender,
// 		String session_token, String password, String email, Date updated_at
		
		
		// Users user = new Users("Mir Ashiful", "Karim", "Mir Ashiful Karim", "makarim", "9055985580", "Male", null, "password", "makarim178@gmail.com", new Date());
		// userRepo.save(user);

//		String sql = "INSERT INTO USERS (first_name, last_name, username, email, password) "
//				+ "VALUES (?, ?, ?, ?, ?) ";
//		
//		int result = jdbcTemplate.update(sql, "Mir Ashiful", "Karim", "makarim", "makarim178@gmail.com", "password");
//		
//		if(result > 0) {
//			System.out.println("A new row has been inserted");
//		} 
		
	}

}
