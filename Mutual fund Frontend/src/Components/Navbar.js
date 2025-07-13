import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../Context/LoginContext'

export default function Navbar() {
  let { isLogin, setIsLogin, isAdmin, setIsAdmin,setSearchFund} = useContext(LoginContext);
  let [search,setSearch]=useState('');
  let navigateTo =useNavigate();

  const handleSearch=(e)=>{
e.preventDefault();
setSearchFund(search);
navigateTo('/funds');
    setSearch('');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to={"/"}> <i className="bi bi-bank2"></i> Smart-Invest</Link>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={"/funds"} className="nav-link">Mutual Fund</Link>
              </li>
              {!isLogin && 
              <li className="nav-item">
                <Link to={"/"} className="nav-link" >Plans</Link>
              </li>}
              {isLogin &&  <li className="nav-item">
                <Link to={"/transactions"} className="nav-link" >My Transactions</Link>
              </li>
              }
              <li className="nav-item">
                <Link to={"/"} className="nav-link" >Tranding</Link>
              </li>
            </ul>

          </div>

           <form className="d-flex ms-auto me-2" onSubmit={handleSearch}>
          <input className="form-control me-2" type="search" placeholder="Search fund"
    value={search} onChange={(e) => setSearch(e.target.value)}/> 

          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              {!isLogin &&
                <><li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={'/login'}>Login</Link>
                </li><li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={'/register'}>Register</Link>
                  </li></>
              }
              {isLogin &&
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" onClick={() => {
                    setIsLogin(false)
                  }}>Logout</Link>
                </li>}
              { isAdmin && isLogin && <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={'/admin'}>Manage funds</Link>
                </li>
              }
            </ul>
        
        </div>
      </nav>
    </div>
  )
}
