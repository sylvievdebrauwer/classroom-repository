    // This code will run once the DOM (HTML) is fully loaded
    console.log('Frontend JavaScript loaded.');
  
    // You can make a fetch request to your server to check the database connection
    fetch('http://localhost:5500/check-database-connection')
      .then(response => response.json())
      .then(data => {
        console.log('Database connection status:', data.status);
        // You can further handle the response based on your needs
      })
      .catch(error => console.error('Error checking database connection:', error));
