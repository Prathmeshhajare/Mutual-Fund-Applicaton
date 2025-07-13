import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';

export default function LoginUser() {
  let{setIsLogin,setIsAdmin,setUserId,setUserName}=useContext(LoginContext);

  let{ register,handleSubmit,formState:{errors}} =useForm();

let[alertMessage,setAlertMessage]=useState(null);
  let navigateTo=useNavigate();
  
 const handleFormData= async(formData) => {
    let response= await fetch("http://localhost:8080/api/auth/login",
      {method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)}) ;

    let responseData= await response.json();  
    if(responseData.data!=null){
      if(responseData.data.emailId ==='prathmesh123@gmail.com' && responseData.data.password==='abcd123456'){
        setIsAdmin(true);
         setIsLogin(true);
        navigateTo('/')
      }
      
      setUserId(responseData.data.id);
      setUserName(responseData.data.name);
       setIsLogin(true);
      navigateTo('/')
    }
    else{
      console.log(responseData.message);
      setAlertMessage(responseData.message)
    }
  }
  
  return (
    <div className='container-fluid d-flex justify-content-center mt-5' >
      <form className='w-50 border border-1 rounded-4 p-5 shadow' onSubmit={handleSubmit(handleFormData)}>
    <h1 className='text-center'> Login For Smart-Invest</h1>
    {alertMessage && <div className='alert alert-danger alert-dismissible fade show' role="alert">
        <strong>{alertMessage}!</strong>
      </div>    }

   <div className='mt-4 mb-3'> 
    <input type="email" className='form-control' placeholder="Email id" 
    {...register("emailId",{required:true} ) }/>
    <div id="emailId" className="form-text text-danger">
      {errors.emailId?.type ==="required" && "EmailId is required"}
    </div>
  </div>

   <div className='mb-3'> 
    <input type="password" className='form-control' placeholder="Password" 
    {...register("password",{required:true,minLength:8,maxLength:12} ) }/>
    <div id="password" className="form-text text-danger">
      {errors.password?.type ==="required" && "Password is required"}
       {errors.minLength?.type ==="minLength" && "Minimum 8 characters required"}
    </div> {errors.maxLength?.type ==="maxLength" && "Maximum 12 characters required"}
  </div>
  <button type ="submit" className='btn btn-primary w-100 mt-2'>Login</button>
  <div className='text-center mt-2'><i class="bi bi-person-fill"></i> Don't have account? <Link to={"/register"}> Sign Up</Link> </div>
</form>
</div>

  )
}
