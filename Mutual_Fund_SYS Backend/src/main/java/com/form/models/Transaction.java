package com.form.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Transaction {
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private Long id; 
	private  String type; // BUY or SELL 
	private  Long userId; 
	private  Long mutualFundId; 
	 private BigDecimal units; 
	private  BigDecimal amount; 
	private LocalDate transactionDate; 
}
