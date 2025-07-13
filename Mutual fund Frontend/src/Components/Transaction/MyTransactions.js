import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';

export default function MyTransactions() {
    const [groupedFunds, setGroupedFunds] = useState([]);
    const { userId } = useContext(LoginContext);

    useEffect(() => {
        const getAllTransactions = async () => {
            let response = await fetch(`http://localhost:8080/api/transactions/transactions/${userId}`);
            let responseData = await response.json();
            let transactions = responseData.data || [];

            // Group by mutualFundId
            let fundMap = {};
            transactions.forEach(tx => {
                const fid = tx.mutualFundId;
                if (!fundMap[fid]) {
                    fundMap[fid] = { userId: tx.userId, mutualFundId: fid, buy: 0, sell: 0, lastDate: tx.transactionDate };
                }

                if (tx.type === "Buy") fundMap[fid].buy += parseFloat(tx.units);
                else if (tx.type === "Sell") fundMap[fid].sell += parseFloat(tx.units);

                // Keep latest transaction date
                fundMap[fid].lastDate = tx.transactionDate;
            });

            // Convert to array
            let result = Object.values(fundMap).map(f => ({
                ...f,
                netUnits: f.buy - f.sell
            }));

            setGroupedFunds(result);
        };

        getAllTransactions();
    }, [userId]);

    return (
        <div className='container mt-3'>
            <h3>Your Mutual Fund Transactions</h3>
            <table className="table table-hover table-bordered text-center" border={2}>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Fund ID</th>
                        <th>Units Bought</th>
                        <th>Units Sold</th>
                        <th>Remaining Units</th>
                        <th>Last Transaction</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedFunds.length > 0 ? (
                        groupedFunds.map((data, index) => (
                            <tr key={index}>
                                <td>{data.userId}</td>
                                <td>{data.mutualFundId}</td>
                                <td>{data.buy}</td>
                                <td>{data.sell}</td>
                                <td>{data.netUnits}</td>
                                <td>{data.lastDate}</td>
                                <td>
                                    {data.netUnits > 0 ? (
                                        <Link className='btn btn-danger'
                                            to={`/sell-fund/${data.userId}/${data.mutualFundId}`}>
                                            Sell </Link>
                                    ) : (
                                        <span className='text-muted'>Fully Sold</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="7">No transactions found</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
