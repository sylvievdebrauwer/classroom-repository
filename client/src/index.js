// index.js
import './index.css';

// Function to fetch and log data
const fetchData = async () => {
  try {
    // Fetch data from your Express server
    const response = await fetch('http://localhost:3000/amazing_ideas');

    // Parse the response as JSON
    const data = await response.json();

    // Log the data
    console.log('Fetched data:', data);

    // Example: Use forEach to log each item
    data.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the fetchData function when the window loads
window.onload = fetchData;
