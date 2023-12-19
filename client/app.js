    // This code will run once the DOM (HTML) is fully loaded
    console.log('Frontend JavaScript loaded.');

    (async () => {
        const response = await fetch('http://localhost:3000/amazing_ideas');
        const data = await response.json();
        console.log(data);
      })();