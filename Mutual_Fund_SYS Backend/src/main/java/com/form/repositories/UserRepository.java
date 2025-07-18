package com.form.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.form.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long > {
Optional<User>findByEmailIdAndPassword(String emailId ,String password);
Optional<User> findByEmailId(String emailId);
}
