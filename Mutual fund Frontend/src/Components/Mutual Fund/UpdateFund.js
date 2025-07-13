import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateFund() {
    let [mutualFund,setMutualFund]=useState([]);
    const navigateTo=useNavigate();
    let {register,handleSubmit,reset}=useForm()
     const {fundId}= useParams();

    const getFundbyId= async()=>{
        let response=await fetch(`http://localhost:8080/api/fund/funds/${fundId}`,{method:"GET"})
        let responseData=await response.json();
        setMutualFund(responseData);
        reset(responseData.data);
        console.log(responseData.data);
    }
    useEffect( ()=> {getFundbyId()},[])

    const updateMutualFund=async(fundData)=>{
        let res= await fetch(`http://localhost:8080/api/fund/admin/update-fund/${fundId}`,{method:"PUT",headers:{"Content-Type":"application/json"},
            body:JSON.stringify(fundData)
        });
        let resData=await res.json();
         navigateTo("/admin");
    };
     
  return (
    <div className='container d-flex justify-content-center mt-5'>
      <form className='w-50' onSubmit={handleSubmit(updateMutualFund)}>
        <h1 className='text-center'>Edit Mutual Fund</h1>

        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Mutual Fund Name'
            {...register('fundName', { required: true })} />
        </div>
       
        
        <div className="mb-3">
          <input type="text" className="form-control"  placeholder='Mtual fund code'
            {...register('fundCode', { required: true })} />
        </div>
<div className="mb-3">
          <select className="form-select" {...register('category')}>
            <option value={''}>Equity</option>
            <option value={''}> Debt</option>
            <option value={''}> Hybrid</option>
          </select>
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

          </div>

        <button type="submit" className="btn btn-success w-100">Update Mutual Fund</button>
      </form>
    </div>
  );
}
