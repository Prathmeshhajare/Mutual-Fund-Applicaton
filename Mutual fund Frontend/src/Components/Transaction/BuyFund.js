import React, { useContext, useEffect, useState } from 'react'
import { useParams ,Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../Context/LoginContext';
import { useForm } from 'react-hook-form';

export default function BuyFund() {
 const {isLogin,userId}=useContext(LoginContext)
  const[fundData,setFundData]=useState(null)
  const {fundId}=useParams();
  let[unit,setUnit]=useState(1);
  let[amount,setAmount]=useState(0);
let {register ,handleSubmit,formState:{errors}}=useForm();
   const navigate = useNavigate();

     useEffect(() => {
      const fetchFund = async () => {
        try {
          let response = await fetch(`http://localhost:8080/api/fund/funds/${fundId}`);
          let responseData = await response.json();
          setFundData(responseData.data);
        } catch (error) {
          console.error("Error fetching Mutual Fund:", error);
        }
      };
      fetchFund()}, [fundId] );

   const buyFund = async (formData) => {
       if (!isLogin) {
      alert("Please login to proceed");
      navigate("/login");
      return;
    }
  const AllData = {...formData,mutualFundId: fundId, userId: userId,type: "Buy" };

    try {
  let response = await fetch("http://localhost:8080/api/transactions/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(AllData)
  });

  let responseData = await response.json();
 if (response.ok) {
    console.log("Buy response:", responseData);
   navigate(`/receipt/${userId}/${fundId}`);
  } else {
    alert("Transaction failed: " + responseData.message);
}
 } catch (error) {
      console.error("Error during transaction:", error);
      alert("Something went wrong while buying the fund.");
    }
  };

  return (
   <div className='container mt-4'>
      <h2 className='fs-2 text-success'>Mutual Fund</h2>
      {fundData ? (
        <form onSubmit={handleSubmit(buyFund)}> 
        <table className="table table-bordered mt-4">
          <tbody>
            <tr className="table-secondary">
              <td colSpan="2" className="fw-bold">Mutual Fund Details</td>
            </tr>
            <tr>
              <td>Mutual Fund Name</td>
              <td>{fundData.fundName}</td>
            </tr>
            <tr>
              <td>Mutual Fund Code </td>
              <td>{fundData.fundCode}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{fundData.category} </td>
            </tr>
           <tr>
              <td>Units</td>
              <td><input type="number" placeholder="Required units" id="unit"{...register("units",{required:true})}
              onChange={(e)=> {
               const value=e.target.value;
              setUnit(value)  ;
              if(fundData ?.nav){
                setAmount(parseFloat(value)*parseFloat(fundData.nav));
              }}
            }/>   
                          <div className="text-danger">
              {errors.units?.type==="required"&& "Please enter how many units want"}  
              </div>
               </td>
            </tr>
            <tr>
              <td>Nav</td>
              <td>{fundData.nav}</td>
            </tr>
            <tr>
              <td> Amount</td>
              <td>{amount >0 ? amount.toFixed(2):fundData.nav}</td>
            </tr>
            
          </tbody>
        </table>
        <div className="d-flex justify-content-evenly w-80" >
      <Link className='btn btn-danger mt-3' to="/">Back to Home</Link>
       <button type="submit" className="btn btn-success mt-3">Proceed to Pay</button>           
     </div>
        </form>
      ) : (
        <p>Loading Mutual Fund details...</p>
      )}
   
    </div>
  );
}

