import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';

export default function AllMutualFund(props) {
  let funds = props.allFunds;
  let { isLogin } = useContext(LoginContext)
  return (
    <div className="container-fluid mt-3">
      <div className='row'>
        {
          funds && funds.map(fund => {
            return (
              <div className='col-12 col-md-3 mb-3' key={fund.id}>
                <div className="card" style={{ width: 15 + "rem" }}>
                  <img src="http://localhost:3000/fund.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h3 className="card-title text-center">{fund.fundName.toUpperCase()}</h3>
                    <ul>
                      <li>Fund Code:{fund.fundCode}</li>
                      <li>Type: {fund.category}</li>
                      <li>NAV:{fund.nav}</li>
                      {isLogin ?(
                      <Link className='btn btn-primary w-100 mt-2' to={`/buy-fund/${fund.id}`}>Buy</Link>
           ):(
              <Link className="btn btn-danger" to="/login">
                    Log in
                  </Link>
           ) } </ul>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
