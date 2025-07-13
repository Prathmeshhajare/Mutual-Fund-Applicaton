package com.form.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.form.models.MutualFund;
import com.form.repositories.MutualFundRepository;
import com.form.response_wrapper.ResponseWrapper;

@Service
public class MutualFundService {
	@Autowired
	MutualFundRepository mutualFundRepository;
	
	@Autowired
	ResponseWrapper responseWrapper ;
	
	public ResponseEntity<?>AddMutualFund (MutualFund mutualFund){
		MutualFund SavedFund=mutualFundRepository.save(mutualFund);
		responseWrapper.setMessage("Mutual Fund Added Succesfully");
		responseWrapper.setData(SavedFund);
		return new ResponseEntity<>(responseWrapper,HttpStatus.OK );
	}
	
	
	public ResponseEntity<?>GetAllMutualFund(){
		List<MutualFund> allFund=mutualFundRepository.findAll();	
		if(allFund.size()> 0) {
			responseWrapper.setMessage("Following records found");
			responseWrapper.setData(allFund);
			return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
		}
		else {
			responseWrapper.setMessage("No records found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?>GetMutualFundByid(Long id){
		Optional <MutualFund> searchFund=mutualFundRepository.findById(id);
		if(searchFund.isPresent()) {
			responseWrapper.setMessage("Following records found");
			responseWrapper.setData(searchFund);
			return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
		}
		else {
			responseWrapper.setMessage("No records found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
		}
	}

	 public ResponseEntity<?>UpdateFunds(Long id ,MutualFund mutualFund) {
		Optional<MutualFund>searchFund= mutualFundRepository.findById(id);
		if(searchFund.isPresent()) {
			MutualFund oldData=searchFund.get();
			
			oldData.setFundName(mutualFund.getFundName());
			oldData.setFundCode(mutualFund.getFundCode());
			oldData.setCategory(mutualFund.getCategory());
			oldData.setNav(mutualFund.getNav());
			mutualFundRepository.save(oldData);
			responseWrapper.setMessage("Mutual Fund Updated Succesfully");
			responseWrapper.setData(oldData);
			return new ResponseEntity<>(responseWrapper,HttpStatus.OK );
		}else {
			responseWrapper.setMessage("No records found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
		}
		 
	 }

	 public ResponseEntity<?>DeleteMutualFundByid(Long id){
			Optional <MutualFund> searchFund=mutualFundRepository.findById(id);
			if(searchFund.isPresent()) {
				mutualFundRepository.deleteById(id);
				responseWrapper.setMessage("records deleted ");
				responseWrapper.setData(null);
				return new ResponseEntity<>(responseWrapper,HttpStatus.OK);
			}
			else {
				responseWrapper.setMessage("No records found");
				responseWrapper.setData(null);
				return new ResponseEntity<>(responseWrapper,HttpStatus.NOT_FOUND);
			}
}

}