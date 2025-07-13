import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Receipt() {
  const [transaction, setTransaction] = useState(null);
  const [fund, setFund] = useState(null);
  const [user, setUser] = useState(null);
  const { mutualFundId, userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/user/${userId}`);
        const responseData = await response.json();
        setUser(responseData.data);
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };
    getUser();
  }, [userId]);

  useEffect(() => {
    const getFund = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/fund/funds/${mutualFundId}`);
        const resData = await response.json();
        setFund(resData.data);
      } catch (err) {
        console.error("Fund fetch failed", err);
      }
    };
    getFund();
  }, [mutualFundId]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/transactions/user/${userId}/fund/${mutualFundId}`);
        const resData = await response.json();
        const details = resData.data;

        if (Array.isArray(details) && details.length > 0) {
          setTransaction(details[details.length - 1]); // get latest transaction
        } else {
          console.warn("No transaction data available");
        }
      } catch (err) {
        console.error("Transaction fetch failed", err);
      }
    };
    getTransaction();
  }, [userId, mutualFundId]);

  if (!user || !fund || !transaction) {
    return <div className="container mt-5 text-center text-info">Loading receipt details...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="fs-2 text-success"><i class="bi bi-check-circle-fill"></i> Congratulations! Payment Done Successfully.</h2>
      <p className="text-danger fw-medium">*Check your Mutual Fund Details carefully</p>

      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th colSpan="2" className="text-center">RECEIPT</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-secondary">
            <td colSpan="2" className="fw-bold">User Details</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{user?.name ? user.name.toUpperCase() : "User"}</td>
          </tr>
          <tr>
            <td>Pan Number</td>
            <td>{user?.panNo ? user.panNo : "N/A"}</td>
          </tr>

          <tr className="table-secondary">
            <td colSpan="2" className="fw-bold">Mutual Fund Details</td>
          </tr>
          <tr>
            <td>Mutual Fund Name</td>
            <td>{fund?.fundName || "N/A"}</td>
          </tr>
          <tr>
            <td>Fund Code</td>
            <td>{fund?.fundCode || "N/A"}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{fund?.category || "N/A"}</td>
          </tr>
          <tr>
            <td>NAV</td>
            <td>{fund?.nav || 0}</td>
          </tr>

          <tr className="table-secondary">
            <td colSpan="2" className="fw-bold">Transaction Details</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{transaction?.type || "N/A"}</td>
          </tr>
          <tr>
            <td>Units</td>
            <td>{transaction?.units || 0}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>₹{transaction?.amount || 0}</td>
          </tr>
          <tr>
            <td>Transaction Date</td>
            <td>{transaction?.transactionDate || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-evenly w-80">
        <Link className="btn btn-success mt-3" to="/transactions">My Savings</Link>
        <Link className="btn btn-danger mt-3" to="/">Back to Home</Link>
      </div>
    </div>
  );
}
