//package com.form.security;
//
//import com.form.models.User;
//import com.form.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.*;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService{
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
//        Optional<User> user = userRepository.findByEmailId(emailId);
//        if (user.isEmpty()) {
//            throw new UsernameNotFoundException("User not found with email: " + emailId);
//        }
//
//        return org.springframework.security.core.userdetails.User
//                .withUsername(user.get().getEmailId())
//                .password(user.get().getPassword()) 
//                .roles("USER")
//                .build();
//    }
//}