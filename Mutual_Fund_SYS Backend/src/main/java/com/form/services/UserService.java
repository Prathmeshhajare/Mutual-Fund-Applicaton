package com.form.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.form.models.User;
import com.form.repositories.UserRepository;
import com.form.response_wrapper.ResponseWrapper;

@Service
public class UserService {
	     @Autowired
	    UserRepository userRepository;
	
		@Autowired
		ResponseWrapper responseWrapper;
		
		public ResponseEntity<?> registerUser(User user)
		{
			if(!user.getPassword().equals(user.getConfirmPassword()) )
			{
				responseWrapper.setMessage("Password does not matched");
				responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
			}
			
			else {
				User savedUser =userRepository.save(user);
				responseWrapper.setMessage("Register Succesfully");
				responseWrapper.setData(savedUser);
				return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
			}
		}
	public ResponseEntity<?>loginUser(User user){
		Optional<User>savedUser=userRepository.findByEmailIdAndPassword(user.getEmailId(),user.getPassword()) ;
		if(savedUser.isPresent()) {
			responseWrapper.setMessage("Login Successfully");
			responseWrapper.setData(savedUser.get());
			return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
		}
		else {
			responseWrapper.setMessage("Wrong Details");
		   responseWrapper.setData(null);
		return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);	
		}
	}
	
	public ResponseEntity<?> getUserById(Long id) {
	    Optional<User> user = userRepository.findById(id);
	    if (user.isPresent()) {
	        responseWrapper.setMessage("User found");
	        responseWrapper.setData(user.get());
	        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	    } else {
	        responseWrapper.setMessage("User not found");
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
	    }
	}


}
