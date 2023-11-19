import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [material, setMaterial] = useState('');

  // Function to map numbers to words
  const mapNumberToWord = (number) => {
    const numberMap = {
      1: 'Aluminium',
      2: 'Plastic',
      3: 'Wood'
      // Add more mappings as needed
    };

    return numberMap[number] || 'Unknown Material';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.thingspeak.com/channels/2275453/feeds.json?api_key=H30GLTR4GGUUJ2GO&results=2'
        );
        const data = await response.json();
        if (data.feeds.length > 0) {
          // Map the received number to a word using the mapNumberToWord function
          const materialWord = mapNumberToWord(data.feeds[0].field1);
          setMaterial(materialWord);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Poll for real-time updates every 3 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="App">
      <h1>Object Material Detected Display</h1>
      <div>
        <p>Material: {material}</p>
      </div>
    </div>
  );
}

export default App;
