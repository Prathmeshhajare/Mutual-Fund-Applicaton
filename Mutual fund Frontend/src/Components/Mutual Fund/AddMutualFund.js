import React from 'react';
import { useForm,} from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

export default function AddMutualFund() {
     let{register,handleSubmit,formState:{errors}}=useForm();
    let navigateTo=useNavigate();

    const handleFormData=async(formData)=> { 
        console.log(formData);
     let response= await fetch("http://localhost:8080/api/fund/add-fund",
      {
            method:"POST",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify(formData)
            })
            let responseData=await response.json()
            console.log(responseData);
             if(response.ok){
            navigateTo('/admin')
             }
          else{
            console.log("Failed to load")
          }
        };   
  return (
    <div className='container d-flex justify-content-center mt-5'>
        <form className='w-50' onSubmit={handleSubmit(handleFormData)}>
        <h1 className='text-center'>Add Mutual Fund for Smart-Invest</h1>     
          <div className="mb-3">
            <input type="text" className="form-control" placeholder='Fund Name'
            {...register('fundName',{required:true})}/>
            <div id="fundName" className="form-text text-danger">
                  {errors.fundName?.type === 'required' && 'Mutual Fund name is required'}
            </div>
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" placeholder='Fund code'
            {...register('fundCode',{required:true})}/>
            <div id="fundcode" className="form-text text-danger">
                  {errors.fundCode?.type === 'required' && 'Fund code is required'}
            </div>
          </div>

          <div className="mb-3">
                <select className="category" {...register('category')}>
                    <option value={'equity'}>Equity</option>
                    <option value={'debt'}>Debt</option>
                    <option value={'hybrid'}>Hybrid</option>
                </select>
          </div>

         <div className="mb-3">
         <input type="number" step="any" className="form-control" placeholder='NAV'
            {...register('nav',{required:true})}/>
            <div id="nav" className="form-text text-danger">
                  {errors.nav?.type === 'required' && 'NAV is required'}
                     </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Register </button>
        </form>
      </div>
    ) 
}
