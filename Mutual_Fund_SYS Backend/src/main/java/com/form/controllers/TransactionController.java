package com.form.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.form.models.Transaction;
import com.form.services.TransactionService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {
	@Autowired
	TransactionService transactionService ;
	
	@PostMapping("/buy")
	public ResponseEntity<?> buyFunds(@RequestBody Transaction transaction) {
		return transactionService.buyFunds(transaction);
	}
	@PostMapping("/sell")
	public ResponseEntity<?> sellFunds(@RequestBody Transaction transaction) {
		return transactionService.sellFunds(transaction);
	}
	
	  
	@GetMapping("/transactions")
	   public ResponseEntity<?> getAllTransactions(){
	   return transactionService.getAllTransactions();
	   }
	
	@GetMapping("/transactions/{id}")
	  public ResponseEntity<?>getTransactionsByUserId(@PathVariable long id){
		  return transactionService.getTransactionsByUserId(id);
	  }

	@GetMapping("/user/{userId}/fund/{mutualFundId}")
	public ResponseEntity<?> getTransactionsByUserIdAndFundId(@PathVariable Long userId, @PathVariable Long mutualFundId) {
	    return transactionService.getTransactionsByUserIdAndFundId(userId, mutualFundId);
	}

}
