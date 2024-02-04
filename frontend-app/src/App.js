// App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    BallsFor: 0,
    BallsAgainst: 0,
    Wins: 0,
    Games: 0,
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/calcHandicap', formData);

      if (response.status === 200) {
        setResult(response.data.result);
      } else {
        setResult(null);
        console.error('Failed to fetch result from the API');
      }
    } catch (error) {
      setResult(null);
      console.error('Error while fetching data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Handicap Calculator</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Balls For:</label>
        <input
          type="number"
          name="BallsFor"
          value={formData.BallsFor}
          onChange={handleInputChange}
          className="input"
        />
        <br />
        <label className="label">Balls Against:</label>
        <input
          type="number"
          name="BallsAgainst"
          value={formData.BallsAgainst}
          onChange={handleInputChange}
          className="input"
        />
        <br />
        <label className="label">Wins:</label>
        <input
          type="number"
          name="Wins"
          value={formData.Wins}
          onChange={handleInputChange}
          className="input"
        />
        <br />
        <label className="label">Games:</label>
        <input
          type="number"
          name="Games"
          value={formData.Games}
          onChange={handleInputChange}
          className="input"
        />
        <br />
        <button type="submit" className="button">
          Calculate
        </button>
      </form>
      {result !== null && <p className="result">Result: {result}</p>}
    </div>
  );
}

export default App;