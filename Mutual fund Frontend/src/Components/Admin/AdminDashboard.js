import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function AdminDashboard() {
      let[funds,setFunds]=useState([]);
      const{fundId}=useParams();
      const getAllFunds=async ()=>{
  let response=await fetch("http://localhost:8080/api/fund/funds",
    {method:"GET"})
    let responseData=await response.json();
    setFunds(responseData.data);
      }
      useEffect(()=> {getAllFunds()},[])

      const handleDelete=async(fundId)=>{
        let response= await fetch(`http://localhost:8080/api/fund/admin/delete-fund/${fundId}`,{method:"DELETE"})
        let responseData=await response.json();
        setFunds(funds.filter(fund=>fund.id !== fundId));
      }

  return (
    <div className='container mt-3'>
        <div className='d-flex justify-content-between border border-3 rounded-4 p-3'>
            <h3>Welcome Admin,</h3>
            <Link className='btn btn-primary' to={'/add-fund'}>Add New Funds</Link>
        </div>
        <div className='border border-3 rounded-4 p-3 mt-1'>
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Fund Code</th>
                        <th>Fund Category</th>
                        <th> Nav</th>
                        <th>Last Updated</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        funds && funds.map(fund=> {
                            return(
                                <tr key={fund.id}>
                                    <th>{fund.id}</th>
                                    <td>{fund. fundName}</td>
                                    <td>{fund.fundCode}</td>
                                    <td>{fund.category}</td>
                                    <td>{fund.nav}</td>
                                    <td>{fund.lastUpdated}</td>
                                    <td>
                                      <Link className='btn btn-primary' to={`/admin/update-fund/${fund.id}`}>Edit</Link>
                                    </td>
                                    <td>
                                 <button className='btn btn-danger' onClick={()=>handleDelete(fund.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
