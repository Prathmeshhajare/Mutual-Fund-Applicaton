//package com.form.security;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        System.out.println("SecurityConfig is ACTIVE"); 
//
//        http
//            .csrf(csrf -> csrf.disable())
//            .authorizeHttpRequests(auth -> auth
//            	    .requestMatchers("/api/auth/**", "/api/fund/add-fund").permitAll()
//            	    .anyRequest().authenticated()
//            	)
//
//            .httpBasic(Customizer.withDefaults()) // basic auth
//            .formLogin(login -> login.disable()); // disable form login
//
//        return http.build();
//    }
//}
