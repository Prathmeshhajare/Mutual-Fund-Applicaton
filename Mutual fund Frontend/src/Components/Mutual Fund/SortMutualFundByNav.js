import React from 'react'

export default function SortMutualFundByNav(props) {
  return (
 <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Sort By NAV
  </button>
  <ul className="dropdown-menu">
      <li>
          <button className="dropdown-item" onClick={()=>{props.onSortByNav("asc")}}>Low to High</button>
      </li>
      <li>
          <button className="dropdown-item" onClick={()=>{props.onSortByNav("desc")}}>High to Low</button>
      </li>
  </ul>
</div>
  )
}