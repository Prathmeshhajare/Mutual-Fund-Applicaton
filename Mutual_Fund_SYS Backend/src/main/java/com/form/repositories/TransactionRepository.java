package com.form.repositories;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.form.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
List<Transaction>findByUserIdAndMutualFundId(Long userId,Long mutualFundId);
List<Transaction>findByUserId(Long id);
	}
