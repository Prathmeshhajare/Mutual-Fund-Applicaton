package com.form.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id ;
	@Column(unique = true)
	private String name;
	 @Email(message = "Email must be in right format")
	@NotNull
		private String emailId;
	@Size(min=8,max=12, message="Password must be between 8 to 12 characters")
	@NotNull
	private String password ;
	@Transient
	private String confirmPassword ;
	@Size(min=11,max=11, message="Pan number must be in 11 characters only")
	private String panNo ;
	

}
