package com.form.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.form.models.MutualFund;
import com.form.services.MutualFundService;

@RestController
@RequestMapping("/api/fund")
@CrossOrigin(origins = "*")
public class MutualFundController {

@Autowired
MutualFundService mutualFundService;

@PostMapping("/add-fund")
 public ResponseEntity<?> AddMutualFund (@RequestBody  MutualFund mutualFund) {
	 return mutualFundService.AddMutualFund(mutualFund);
 }

@GetMapping("/funds")
public ResponseEntity<?>GetAllMutualFund(){
	return mutualFundService.GetAllMutualFund();
}

@GetMapping("/funds/{id}")
public ResponseEntity<?>GetMutualFundByid(@PathVariable Long id){
		return mutualFundService.GetMutualFundByid(id);
}

@PutMapping("admin/update-fund/{id}")
public ResponseEntity<?>UpdateFunds(@PathVariable Long id ,@RequestBody MutualFund mutualFund) {
	return mutualFundService.UpdateFunds(id, mutualFund);
}

@DeleteMapping("admin/delete-fund/{id}")
public ResponseEntity<?>DeleteMutualFundByid(@PathVariable Long id){
	return mutualFundService.DeleteMutualFundByid(id);
}
}

