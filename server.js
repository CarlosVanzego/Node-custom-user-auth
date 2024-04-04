const express = require('express'); // Import Express.js
const app = express(); // Create Express app
const bcyrpt = require('bcrypt'); // Import bcrypt for password hashing

app.use(express.json()); // Middleware to parse JSON requests

const users = []; // Array to store user data

// Route to get all users
app.get('/users', (req, res) => {
  res.json(users); // Send JSON response with all users
});

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcyrpt.hash(req.body.password, 10); // Hash the password
    const user = { name: req.body.name, password: hashedPassword }; // Create new user object
    users.push(user); // Add user to the array
    res.status(201).send(); // Send 201 status code for successful creation
  } catch {
    res.status(500).send(); // Send 500 status code for server error
  }
});

// Route to authenticate user login
app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name); // Find user by name
  if (user == null) {
    return res.status(400).send('Cannot find user'); // Send 400 status code if user not found
  }
  try {
    if (await bcyrpt.compare(req.body.password, user.password)) { // Compare passwords
      res.send('Success'); // Send success message if passwords match
    } else {
      res.send('Not Allowed'); // Send not allowed message if passwords don't match
    }
  } catch {
    res.status(500).send(); // Send 500 status code for server error
  }
});

app.listen(3000); // Start the server on port 3000