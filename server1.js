// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';

// const app = express();
// const port = 3000;
// app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // NASA JPL Horizons API endpoint
// const JPL_ENDPOINT = ' https://ssd-api.jpl.nasa.gov/fireball.api';
// const queryParameters = {
//   format: 'text',
//   COMMAND: '199,299,399,499,599,699,799,899,10', // Removed extra quotes
//   CENTER: '500@0',
//   EPHEMERIS_TYPE: 'VECTORS',
//   START_TIME: '2024-01-01',
//   STOP_TIME: '2024-01-02',
//   STEP_SIZE: '1 d',
//   OUT_UNITS: 'KM-S',
//   CSV_FORMAT: 'YES'
// };
// // Get planetary positions
// const requestConfig = {
//   method: 'post',
//   url: 'https://ssd-api.jpl.nasa.gov/fireball.api', // Removed extra space
//   params: queryParameters,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// };
// async function fetchData() {
//   try {
//     const response = await axios(requestConfig);
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error.response ? error.response.data : error.message);
//   }
// }

// fetchData();
// // app.get('/api/planet-positions', async (req, res) => {
 

// //   try {
// //     const response = await axios.post(JPL_ENDPOINT, null, { params: query });
// //     const rawData = response.data;

// //     // Parse the CSV data and extract positions (this depends on the structure of NASA’s response)
// //     const planetPositions = parseJPLData(rawData);

// //     // Send the formatted planet positions to the frontend
// //     res.json(planetPositions);
// //   } catch (error) {
// //     console.error('Error fetching data from NASA JPL:', error);
// //     res.status(500).send('Error fetching planetary data.');
// //   }
// // });

// // // Function to parse JPL data
// // function parseJPLData(data) {
// //   // This is a simplified version of parsing CSV; you'll need to adjust this for real data
// //   const planetPositions = [];

// //   const lines = data.split('\n'); // Split by new lines
// //   let isDataSection = false;

// //   lines.forEach(line => {
// //     if (line.startsWith('$$SOE')) { // Start of ephemeris data
// //       isDataSection = true;
// //       return;
// //     }
// //     if (line.startsWith('$$EOE')) { // End of ephemeris data
// //       isDataSection = false;
// //       return;
// //     }

// //     if (isDataSection) {
// //       const columns = line.trim().split(',');

// //       if (columns.length >= 6) {
// //         const planet = {
// //           name: columns[0], // Planet name or ID
// //           x: parseFloat(columns[2]), // X coordinate
// //           y: parseFloat(columns[3]), // Y coordinate
// //           z: parseFloat(columns[4])  // Z coordinate
// //         };
// //         planetPositions.push(planet);
// //       }
// //     }
// //   });

// //   return planetPositions;
// // }

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// NASA JPL Horizons API endpoint
const JPL_ENDPOINT = 'https://ssd.jpl.nasa.gov/api/horizons.api';

// Get planetary positions
app.get('/api/planet-positions', async (req, res) => {
  const query = {
    date_min: '2024-09-01', // Change these values as needed
    date_max: '2024-09-30',
    req_loc: true, // Location required
    req_alt: true,  // CSV format for easier parsing
  };

  try {
    const response = await axios.post(JPL_ENDPOINT, null, { params: query });
    const rawData = response.data;

    // Parse the CSV data and extract positions (this depends on the structure of NASA’s response)
    const planetPositions = parseJPLData(rawData);

    // Send the formatted planet positions to the frontend
    res.json(planetPositions);
  } catch (error) {
    console.error('Error fetching data from NASA JPL:', error);
    res.status(500).send('Error fetching planetary data.');
  }
});

// Function to parse JPL data
function parseJPLData(data) {
  // This is a simplified version of parsing CSV; you'll need to adjust this for real data
  const planetPositions = [];

  const lines = data.split('\n'); // Split by new lines
  let isDataSection = false;

  lines.forEach(line => {
    if (line.startsWith('$$SOE')) { // Start of ephemeris data
      isDataSection = true;
      return;
    }
    if (line.startsWith('$$EOE')) { // End of ephemeris data
      isDataSection = false;
      return;
    }

    if (isDataSection) {
      const columns = line.trim().split(',');

      if (columns.length >= 6) {
        const planet = {
          name: columns[0], // Planet name or ID
          x: parseFloat(columns[2]), // X coordinate
          y: parseFloat(columns[3]), // Y coordinate
          z: parseFloat(columns[4])  // Z coordinate
        };
        planetPositions.push(planet);
      }
    }
  });

  return planetPositions;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
