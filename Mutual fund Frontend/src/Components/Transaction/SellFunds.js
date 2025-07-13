import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function SellFunds() {
const { userId, fundId } = useParams();
const mutualFundId = fundId; 
  const [fund, setFund] = useState(null);
  const [unitsToSell, setUnitsToSell] = useState('');
  const [amount, setAmount] = useState(0);
  const [units, setUnits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFund = async () => {
      const response = await fetch(`http://localhost:8080/api/fund/funds/${fundId}`);
      const data = await response.json();
      setFund(data.data);
    };

    const getUnitsLimit = async () => {
      const res = await fetch(`http://localhost:8080/api/transactions/user/${userId}/fund/${mutualFundId}`);
      const resData = await res.json();
      const transactions = resData.data;
      let totalBuy = 0;
      let totalSell = 0;

      transactions.forEach(tx => {
        if (tx.type === "Buy") totalBuy += parseFloat(tx.units);
        if (tx.type === "Sell") totalSell += parseFloat(tx.units);
      });

      setUnits(totalBuy - totalSell);
    };

    fetchFund();
    getUnitsLimit();
  }, [fundId, userId]);

  const handleUnitsChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setUnitsToSell('');
      setAmount(0);
      return;
    }

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue < 1) {
      return;
    }

    if (parsedValue > units) {
      alert(`You can't sell more than ${units} units`);
      return;
    }

    setUnitsToSell(value);
    setAmount(parsedValue * (fund?.nav || 0));
  };

  const handleSell = async () => {
    const parsedUnits = parseFloat(unitsToSell);

    if (isNaN(parsedUnits) || parsedUnits < 1 || parsedUnits > units) {
      alert("Invalid units");
      return;
    }

    const transaction = {
      userId,
      mutualFundId: mutualFundId,
      units: parsedUnits,
      type: "Sell"
    };

    const res = await fetch(`http://localhost:8080/api/transactions/sell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction)
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      navigate(`/receipt/${userId}/${fundId}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger">Sell Mutual Fund</h3>
      {fund ? (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Fund Name</td>
              <td>{fund.fundName}</td>
            </tr>
            <tr>
              <td>Current NAV for 1 Unit</td>
              <td>{fund.nav}</td>
            </tr>
            <tr>
              <td>Total Units</td>
              <td>{units}</td>
            </tr>
            <tr>
              <td>Units to Sell</td>
              <td>
                <input
                  type="number"
                  value={unitsToSell}
                  min={1}
                  step="any"
                  placeholder="Enter units to sell"
                  onChange={handleUnitsChange}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Current Amount</td>
              <td>₹{amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading fund details...</p>
      )}

      <div className="d-flex justify-content-evenly w-80">
        <Link className="btn btn-secondary" to="/transactions">Back</Link>
        <button className="btn btn-danger" onClick={handleSell}>Confirm Sell</button>
      </div>
    </div>
  );
}
