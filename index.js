const express = require('express');
const app = express();
const port = 3000; // or any port you prefer
const ConnectToMongo = require('./db.js')
const cors = require('cors');

app.use(cors());

ConnectToMongo(); 

// Middleware to parse JSON requests
app.use(express.json());

app.use(express.static('uploads'));

app.use('/api/auth' , require('./routes/auth.js')); 
app.use('/api/manage' , require('./routes/manage.js')); 
// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
