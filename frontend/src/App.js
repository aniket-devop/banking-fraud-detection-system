import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/transactions");
    setTransactions(res.data);
  };

  const addTransaction = async () => {
    await axios.post("http://localhost:5000/transaction", {
      user: "Aniket",
      amount: Math.floor(Math.random() * 20000),
    });

    fetchTransactions();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Banking Fraud Detection Dashboard</h1>

      <button
        onClick={addTransaction}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Generate Transaction
      </button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, index) => (
            <tr key={index}>
              <td>{t.user}</td>
              <td>{t.amount}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;