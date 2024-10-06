// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000;
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Allows access from any origin
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// app.get('/api/fireball', async (req, res) => {
//   try {
//     const response = await axios.get('https://ssd-api.jpl.nasa.gov/fireball.api');
//     res.json(response.data);  // Send the data to your frontend
//   } catch (error) {
//     res.status(500).send('Error fetching data from NASA API');
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server running at http://localhost:${port}`);
// });
