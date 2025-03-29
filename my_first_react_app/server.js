const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to display welcome message with person's name
app.get('/', (req, res) => {
  fs.readFile('person.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading person.json');
      return;
    }
    const person = JSON.parse(data);
    res.send(`Welcome, ${person.name}`);
  });
});

// Route to display the About Us page
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route to display the Contact Us page
app.get('/contact_us.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact_us.html'));
});

// Handle unknown paths
app.use((req, res) => {
  res.status(404).send("Sorry! Can't find that resource. Please check your URL");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
