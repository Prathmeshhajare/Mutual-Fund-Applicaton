package com.form.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.form.models.MutualFund;
import com.form.models.Transaction;
import com.form.repositories.MutualFundRepository;
import com.form.repositories.TransactionRepository;
import com.form.response_wrapper.ResponseWrapper;

@Service
public class TransactionService {
    @Autowired
	ResponseWrapper responseWrapper;
    
    @Autowired
    TransactionRepository transactionRepository ;
    
    @Autowired
    MutualFundRepository mutualFundRepository;
    
    public ResponseEntity<?> buyFunds(Transaction transaction){	
   	Optional<MutualFund>fund=mutualFundRepository.findById(transaction.getMutualFundId()) ;
       if(fund.isPresent()) {
    	   BigDecimal nav= fund.get().getNav();
    	   if (nav.compareTo(BigDecimal.ZERO) <= 0) {
               responseWrapper.setMessage("Invalid NAV");
               responseWrapper.setData(null);
               return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
           }

    	   BigDecimal amount =transaction.getUnits().multiply(nav) ;

           transaction.setAmount(amount);
           transaction.setType("Buy");
          transaction.setTransactionDate(LocalDate.now());
          transactionRepository.save(transaction);
         responseWrapper.setMessage("Mutual fund purchased successfully");
         responseWrapper.setData(transaction);
		return new ResponseEntity<>(responseWrapper,HttpStatus.OK );
	}
       else {
    	   responseWrapper.setMessage("transaction unsuccessfully");
    	   responseWrapper.setData(null);
   		return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND );
       }
    	
    }

 public ResponseEntity<?> sellFunds(Transaction transaction){
	  Optional<MutualFund> fund = mutualFundRepository.findById(transaction.getMutualFundId());
	 if(fund.isPresent()) {
		BigDecimal nav= fund.get().getNav();
		BigDecimal amount = transaction.getUnits().multiply(nav);
		transaction.setAmount(amount);
		transaction.setType("Sell");
	    transaction.setTransactionDate(LocalDate.now());
	    responseWrapper.setMessage("Mutual fund sold successfully");
	    transactionRepository.save(transaction);  
	    responseWrapper.setData(transaction);    

         transactionRepository.save(transaction);
	    return new ResponseEntity<>(responseWrapper,HttpStatus.OK );
		}
	 else {
  	   responseWrapper.setMessage("transaction unsuccessfully");
  	   responseWrapper.setData(null);
 		return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND );
     }}
	 
     public ResponseEntity<?> getAllTransactions(){
    	List<Transaction>allData=transactionRepository.findAll();
    	if(allData.size()>0) {
    		responseWrapper.setMessage("Following transactions found");
    		responseWrapper.setData(allData);
    		return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
    	}
    	else {
    		responseWrapper.setMessage("No transactions found");
    		responseWrapper.setData(null);
    		return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
    	}
    	
    }
    
    public ResponseEntity<?>getTransactionsByUserId(Long id){
    	List <Transaction> records=transactionRepository.findByUserId(id);
    	if(records.size()>0) {
    		responseWrapper.setMessage("Following transactions found");
    		responseWrapper.setData(records);
    		return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
    	}
    	else {
    		responseWrapper.setMessage("No transactions found");
    		responseWrapper.setData(null);
    		return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
    	}
    }


    public ResponseEntity<?> getTransactionsByUserIdAndFundId(Long userId,Long mutualFundId){
    	List<Transaction> result=transactionRepository.findByUserIdAndMutualFundId(userId,mutualFundId);
    	if(result.size() >0 ) {
    		responseWrapper.setMessage("Following transactions found");
    		responseWrapper.setData(result);
    		return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
    	}
    	else {
    		responseWrapper.setMessage("No transactions found");
    		responseWrapper.setData(null);
    		return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
    	}
    }

}
