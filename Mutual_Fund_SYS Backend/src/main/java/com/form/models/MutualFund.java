package com.form.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class MutualFund {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	 Long id; 
	 String fundName; 
	 String fundCode; 
	 String category; // Equity, Debt, Hybrid, etc. 
	   private BigDecimal nav; // Net Asset Value
	   @LastModifiedDate
	  private  LocalDate lastUpdated; 
    
	} 

