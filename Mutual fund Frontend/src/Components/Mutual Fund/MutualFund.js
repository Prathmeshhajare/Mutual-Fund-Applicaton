import React, { useContext, useEffect, useState } from 'react'
import AllMutualFund from './AllMutualFund';
import FilterMutualFundByType from './FilterMutualFundByType';
import SortMutualFundByNav from './SortMutualFundByNav';
import { LoginContext } from '../../Context/LoginContext';


export default function MutualFund() {
  let [fund, setFund] = useState(null);
  let [filteredFund, setFilterdFund] = useState(null)
  let{searchFund,setSearchFund}=useContext(LoginContext)

  const getAllFunds = async () => {
    let response = await fetch("http://localhost:8080/api/fund/funds")
    let fundData = await response.json()
    setFund(fundData.data)
    setFilterdFund(fundData.data)
  }
  useEffect(() => { getAllFunds() }, [])

const filteredFundByCategory = (fundCategory) => {
  if (fundCategory === "all") {
    setFilterdFund(fund);
  } else {
    const newFunds = fund.filter(f =>
      f.category.toLowerCase().includes(fundCategory.toLowerCase())
    );
    setFilterdFund(newFunds);
  }
}
const sortByNav = (order) => {
  const sorted = [...filteredFund].sort((a, b) => {
    const navA = parseFloat(a.nav);
    const navB = parseFloat(b.nav);
    return order === 'asc' ? navA - navB : navB - navA;
  });
  setFilterdFund(sorted);
}

useEffect(()=>{
    if (fund === null) return;
if(searchFund && fund.length >0)
 {
  let newFund = fund.filter(fund=>{
    return fund.fundName.toLowerCase().includes(searchFund.toLowerCase())});
  setFilterdFund(newFund) ;
}else{
  setFilterdFund(fund);
} },[fund,searchFund]
)
return (
  <div className='container mt-4'>
    
    <div className='d-flex justify-content-between'>
      <FilterMutualFundByType onFilterFundByType={filteredFundByCategory} />
      <SortMutualFundByNav onSortByNav={sortByNav} />
    </div>
    <AllMutualFund allFunds={filteredFund} />
   
  </div>
)
}
