import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { LoginContext } from '../Context/LoginContext';
import bg1 from '../images/bg1.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
  let { isLogin, isAdmin, userName } = useContext(LoginContext);
  const [funds, setFunds] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const fetchFunds = async () => {
    const response = await fetch('http://localhost:8080/api/fund/funds', { methos: "GET" });
    const data = await response.json();
    setFunds(data.data || []);
  }

  useEffect(() => { fetchFunds() }, []);
  return (
    <>
      <div className="box">
        <div className='warning text-center text-white'>
          {isAdmin && isLogin && (
            <h2 className="mb-3">Welcome Admin <i class="bi bi-person-fill-check"></i></h2>
          )}
          {!isAdmin && isLogin && (
            <h3 className='bg-warning p-2 rounded shadow-sm'>
              Hello <span className="text-danger fw-bold ms-2">{userName}</span>, manage your mutual funds smartly!
            </h3>
          )}
          {!isLogin && (
            <h4 className='text-danger fs-3 bg-warning p-2 rounded shadow'>
              Please log in or register for a better experience.
            </h4>
          )}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Top Mutual Funds</h2>
        <div className="position-relative">
          <div className="d-flex overflow-hidden">
            <div className="d-flex transition-all" style={{ gap: '1rem' }}>
              {funds.slice(startIndex, startIndex + visibleCount).map(fund => (
                <div className="card shadow" style={{ width: '18rem' }} key={fund.id}>
                  <img src="http://localhost:3000/fund3.jpg" className="card-img-top" alt="Fund" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{fund.fundName}</h5>
                    <ul className="list-unstyled">
                      <li><strong>Fund Code:</strong> {fund.fundCode}</li>
                      <li><strong>Type:</strong> {fund.category}</li>
                      <li><strong>NAV:</strong> ₹{fund.nav}</li>
                    </ul>
                    {isLogin ? (
                      <Link className='btn btn-primary w-100 mt-2' to={`/buy-fund/${fund.id}`}>Buy</Link>
                    ) : (
                      <Link className="btn btn-danger" to="/login">
                        Log in
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-secondary" disabled={startIndex === 0}
              onClick={() => setStartIndex(prev => Math.max(prev - visibleCount, 0))}>
              Previous </button>

            <button className="btn btn-outline-secondary" disabled={startIndex + visibleCount >= funds.length}
              onClick={() => setStartIndex(prev => prev + visibleCount)}> Next  </button>

          </div>
        </div>
      </div>

      <div className="box_three d-flex flex-column flex-md-row align-items-center px-4 py-5">
        <div className="text-white me-md-5 mb-4 ">
          <h1 className="display-5 fw-bold">Safe. Simple. Smart.</h1>
          <p className="lead">
            Grow your wealth the smart way. Diversify your investments, minimize risk, and let your money work for you — all through professionally managed mutual funds.
          </p>
        </div>
        <img src={bg1} className="img-fluid rounded shadow" alt="mutual fund" width="500" height="400" />
      </div>



      <div className="box_four py-5 text-center text-white ">
        <h1 className="mb-4">Download your funds data offline</h1>
        <p>Save your favorite funds easily and access them anytime, anywhere.</p>
      </div>

      <div className="box_five d-flex flex-column flex-md-row align-items-center px-4 py-5 bg-dark text-white">
        <div className="me-md-5 mb-4 mb-md-0 text-center text-md-start">
          <h1 className="mb-3">Track Your Portfolio Anywhere</h1>
          <p className="lead">Stream real-time NAV data and updates on any device.</p>
        </div>
      </div>

      <div className="box_six bg-light text-dark py-5 text-center">
        <h1>Create profiles for all investors</h1>
        <p>Personalize your mutual fund journey with customized portfolios.</p>
      </div>

      <div className="box_seven bg-secondary text-white py-5">
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <div className="container">
          <div className="accordion" id="accordionExample">

            <div className="accordion-item bg-dark mb-3 border-light">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#one">
                  What is Smart-Invest?
                </button>
              </h2>
              <div id="one" className="accordion-collapse collapse">
                <div className="accordion-body text-white">Answer coming soon...</div>
              </div>
            </div>

            <div className="accordion-item bg-dark mb-3 border-light">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#two">
                  How much does it cost?
                </button>
              </h2>
              <div id="two" className="accordion-collapse collapse">
                <div className="accordion-body text-white">Answer coming soon...</div>
              </div>
            </div>

            <div className="accordion-item bg-dark mb-3 border-light">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#three">
                  Where can I track funds?
                </button>
              </h2>
              <div id="three" className="accordion-collapse collapse">
                <div className="accordion-body text-white">Answer coming soon...</div>
              </div>
            </div>

            <div className="accordion-item bg-dark mb-3 border-light">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#four">
                  How to sell funds?
                </button>
              </h2>
              <div id="four" className="accordion-collapse collapse">
                <div className="accordion-body text-white">Answer coming soon...</div>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center mt-4">Ready to invest? Enter your email to get started.</p>
        <div className="d-flex justify-content-center mt-3">
          <input type="email" className="form-control w-50 me-2" placeholder="Email address" />
          <button className="btn btn-primary">Get Started</button>
        </div>

      </div>

      <footer className="box_eight text-white py-5 bg-dark mt-2">
        <div className="container text-center">
          <h5 className="mb-4">Questions? Call 9137-3244-4567</h5>
          <table className=" box_nine w-100 text-center p-5">
            <tbody>
              <tr>
                <td>FAQ</td>
                <td>Help Center</td>
                <td>Account</td>
                <td> Media</td>
              </tr>
              <tr>
                <td>Investors</td>
                <td>Jobs</td>
                <td>Ways to Watch</td>
                <td>Terms</td>
              </tr>
              <tr>
                <td>Privacy</td>
                <td>Cookies</td>
                <td>Corporate</td>
                <td>Contact Us</td>
              </tr>
              <tr>
                <td>Speed Test</td>
                <td>Only on Smart-Invest</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </footer>

    </>
  );
}
