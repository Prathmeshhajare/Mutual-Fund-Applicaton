package com.form.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.form.models.MutualFund;

@Repository
public interface MutualFundRepository extends JpaRepository<MutualFund,Long>{
}
