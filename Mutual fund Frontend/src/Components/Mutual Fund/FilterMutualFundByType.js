import React from 'react'

export default function FilterMutualFundByType(props) {
 return(
<div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Mutual Fund Category
    </button>
    <ul className="dropdown-menu">
        <li>
            <button className="dropdown-item" onClick={()=>{props.onFilterFundByType("all")}}>All Mutual-Funds</button>
        </li>
        <li>
            <button className="dropdown-item" onClick={()=>{props.onFilterFundByType("equity")}}>Equity</button>
        </li>
        <li>
            <button className="dropdown-item" onClick={()=>{props.onFilterFundByType("debt")}}>Debt</button>
        </li>
         <li>
            <button className="dropdown-item" onClick={()=>{props.onFilterFundByType("hybrid")}}>Hybrid</button>
        </li>
    </ul>      
</div>
  )
}
