import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function RegisterUser() {
let {register,handleSubmit,watch,formState:{errors}}=useForm()
const navigateTo=useNavigate();
const handleFormData=async(formData)=>{
 let response= await fetch("http://localhost:8080/api/auth/register",{ method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(formData)
  })
  let responseData= await response.json();
  navigateTo("/login");
}

  return (
    <div className='container d-flex justify-content-center mt-5' >
      <form className='w-50' onSubmit={handleSubmit(handleFormData)}>
    <h1 className='text-center'> Register For Smart-Invest</h1>

    <div className='mb-3'> 
    <input type="text" className='form-control' placeholder="UserName" 
    {...register("name",{required:true} ) }/>
    <div id="name" className="form-text text-danger">
      {errors.name?.type ==="required" && "User name is required"}
    </div>
  </div>

   <div className='mb-3'> 
    <input type="email" className='form-control' placeholder="Email id" 
    {...register("emailId",{required:true} ) }/>
    <div id="emailId" className="form-text text-danger">
      {errors.name?.type ==="required" && "EmailId is required"}
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

  <div className='mb-3'> 
    <input type="password" className='form-control' placeholder="Confirm Password" 
    {...register("confirmPassword",{validate:(value)=>{
      if(value===watch('password'))
      {
        return true
      }else{
        return "Password does not matched"
      }
    }  
  }
    ) }/>
      {errors.confirmPassword && <div className="form-text text-danger">
    {errors.confirmPassword.message}  </div>}
     </div> 

 <div className='mb-3'> 
    <input type="text" className='form-control' placeholder="PAN Number" 
    {...register("panNo",{required:true,minLength:11,maxLength:11} ) }/>
    <div id="name" className="form-text text-danger">
      {errors.panNp?.type ==="required" && "Pan number is required"}
       {errors.minLength?.type ==="minLength" && "Must have 11 characters only"}
   {errors.maxLength?.type ==="maxLength" && "Must have 11 characters only"}
    </div>
  </div>
  <button className='btn btn-primary w-100'> Register</button>
      </form>
      </div>
  )
}

