import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [portfolio, setPortfolio] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get('/portfolio');
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/portfolio', formData);
      fetchPortfolio();
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Cryptocurrency Portfolio Tracker</h1>
      <div>
        <h2>Portfolio Balance</h2>
        <ul>
          {Object.entries(portfolio).map(([symbol, { amount }]) => (
            <li key={symbol}>
              {symbol}: {amount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Update Portfolio</h2>
        <form onSubmit={handleSubmit}>
          <label>
            BTC:
            <input
              type="number"
              name="BTC"
              value={formData.BTC || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            ETH:
            <input
              type="number"
              name="ETH"
              value={formData.ETH || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            LTC:
            <input
              type="number"
              name="LTC"
              value={formData.LTC || ''}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default App;
