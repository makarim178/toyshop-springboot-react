package com.toyshop.spring.mysql.api.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FileNotFoundExceptionWithHttpResponseStatus extends RuntimeException {
	
	public FileNotFoundExceptionWithHttpResponseStatus (String message) {
		super(message);
	}
	
	public FileNotFoundExceptionWithHttpResponseStatus(String message, Throwable cause) {
		super(message, cause);
	}
}
