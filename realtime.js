// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// // Create the Three.js scene
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // Create lighting

// const textureLoader = new THREE.TextureLoader();
// const textures = [
//     textureLoader.load('./images/sun_texture.jpg'),     // Index 0: Sun
//     textureLoader.load('./images/mercury_texture.jpg'), // Index 1: Mercury
//     textureLoader.load('./images/venus_texture.jpg'),   // Index 2: Venus
//     textureLoader.load('./images/earth_texture.jpg'),   // Index 3: Earth
//     textureLoader.load('./images/moon_texture.jpg'),    // Index 4: Moon
//     textureLoader.load('./images/mars_texture.jpg'),    // Index 5: Mars
//     textureLoader.load('./images/jupiter_texture.jpg'), // Index 6: Jupiter
//     textureLoader.load('./images/saturn_texture.jpg'),  // Index 7: Saturn
//     textureLoader.load('./images/neptune_texture.jpg'), // Index 8: Neptune
//     textureLoader.load('./images/pluto_texture.jpg'),   // Index 9: Pluto
// ];
// function updateGMTTime() {
//     const now = new Date();
//     const year = now.getUTCFullYear();
//     const month = now.getUTCMonth() + 1; // Months are zero-based in JavaScript
//     const day = now.getUTCDate();
//     const hours = now.getUTCHours();
//     const minutes = now.getUTCMinutes();
//     const seconds = now.getUTCSeconds();
//     const ampm = hours >= 12 ? 'PM' : 'AM';

//     // Convert to 12-hour format
//     const hour12 = hours % 12 || 12; // Adjust hour to 12-hour format
//     const minuteStr = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if needed
//     const secondStr = seconds < 10 ? '0' + seconds : seconds; // Add leading zero if needed

//     const gmtTime = `${month}/${day}/${year} ${hour12}:${minuteStr}:${secondStr} ${ampm} GMT`; // Format the time string
//     document.getElementById('time').textContent = gmtTime; // Display the time in the designated div
// }


// // Update GMT time every second
// updateGMTTime(); // Initial call
// setInterval(updateGMTTime, 1000);
// const background = new THREE.TextureLoader();
// const texture = background.load('./images/back.jpg');
// scene.background=texture;


// // Create the Sun
// const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
// const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
// const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// scene.add(sun);

// // Function to create planets with texture
// function createPlanet(size, texture, position) {
//     const geometry = new THREE.SphereGeometry(size, 32, 32);
//     const material = new THREE.MeshStandardMaterial({ map: texture });
//     const planet = new THREE.Mesh(geometry, material);
//     planet.position.set(position.x, position.y, position.z);
//     scene.add(planet);
//     return planet;
// }

// // Planet dictionary to store all planets
// const planets = {};

// function createEllipticalOrbit(a, b, segments, position) {
//     const curve = new THREE.EllipseCurve(
//         position.x, position.z,  // Center of the orbit (x, z)
//         a, b,                    // Semi-major (a) and semi-minor (b) axes
//         0, 2 * Math.PI,          // Start and end angle (in radians)
//         false,                   // Clockwise
//         0                         // Rotation angle (if any)
//     );

//     const points = curve.getPoints(segments); // Create points along the orbit
//     const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

//     // Convert 2D points (x, z) to 3D by adding the y-coordinate (height)
//     const positions = orbitGeometry.attributes.position.array;
//     for (let i = 0; i < positions.length; i += 3) {
//         positions[i + 1] = 0;  // Set y to 0 for each point to make it a 2D ellipse in 3D space
//     }
//     const orbitMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.3, gapSize: 0.1 });


//     // Create the line from the geometry and material
//     const orbit = new THREE.Line(orbitGeometry, orbitMaterial);

//     return orbit;
// }
// // Fetch planet positions from the backend
// const indexofdata = [199, 299, 399, 499, 599, 699, 799, 899, 10];
// // Function to convert lat/lon to 3D coordinates
// // Function to convert lat/lon/alt to 3D coordinates with fallback for NaN values
// function latLonToXYZorbit(lat, lon, alt = 0) {
//     if (isNaN(lat) || isNaN(lon)) {
//         console.warn(`Invalid lat/lon: lat=${lat}, lon=${lon}`);
//         return new THREE.Vector3(NaN, NaN, NaN); // Return NaN vector for invalid lat/lon
//     }

//     const R = 6371; // Earth's radius in kilometers
//     alt = isNaN(alt) ? 0 : alt; // Use 0 for altitude if it's NaN

//     const latitude = THREE.MathUtils.degToRad(lat);
//     const longitude = THREE.MathUtils.degToRad(lon);

//     const x = (R + alt) * Math.cos(latitude) * Math.cos(longitude);
//     const y = (R + alt) * Math.sin(latitude);
//     const z = (R + alt) * Math.cos(latitude) * Math.sin(longitude);

//     return new THREE.Vector3(x, y, z);
// }

// function latLonToXYZ(lat, lon, radius = 50) {
//     const phi = (90 - lat) * (Math.PI / 180);
//     const theta = (lon + 180) * (Math.PI / 180);

//     const x = -(radius * Math.sin(phi) * Math.cos(theta));
//     const y = radius * Math.cos(phi);
//     const z = radius * Math.sin(phi) * Math.sin(theta);

//     return { x, y, z };
// }

// // function visualizeOrbits(data) {
// //     const fields = data.fields; // Get the fields from the response
// //     const planetaryData = data.data; // Get the planet data
// //     const latIndex = fields.indexOf('lat');
// //     const lonIndex = fields.indexOf('lon');
// //     const altindex = fields.indexOf('alt');

// //     indexofdata.forEach((dataPointIndex,i) => {
// //         if (dataPointIndex < planetaryData.length){
// //             const planetData = planetaryData[dataPointIndex];
// //             const lat = parseFloat(planetData[latIndex]);
// //                 const lon = parseFloat(planetData[lonIndex]);
// //                 const alt = parseFloat(planetData[altindex]);
// //                 console.log(`Data Point Index: ${dataPointIndex}, Latitude: ${lat}, Longitude: ${lon},alt${alt}`);
// //                 const position = latLonToXYZorbit(lat, lon, alt);
// // console.log(position);
// //                 // // Assume some impact energy to determine the orbit size (you can adjust this logic)
// //                 const impactEnergy = parseFloat(dataPointIndex[fields.indexOf('impact-e')]); // in kilotons
// //                 const a = impactEnergy * 0.5; // Semi-major axis in km (arbitrary scaling)
// //                 const b = a * 0.7; // Semi-minor axis (arbitrary scaling)
        
// //                 // // // Create the elliptical orbit
// //                 const orbit = createEllipticalOrbit(a, b, 100, position);
        
// //                 // // // Set the orbit's position to the calculated center
// //                 orbit.position.copy(position);
        
// //                 // // Add the orbit to the scene
// //                 scene.add(orbit);
// //         }
    
// //     });
// // }

// // Load textures for each planet

//  // Specific data points you want to access
//  function visualizeOrbits(data) {
//     const fields = data.fields; // Get the fields from the response
//     const planetaryData = data.data; // Get the planet data
//     const latIndex = fields.indexOf('lat');
//     const lonIndex = fields.indexOf('lon');
//     const altIndex = fields.indexOf('alt');

//     indexofdata.forEach((dataPointIndex, i) => {
//         if (dataPointIndex < planetaryData.length) {
//             const planetData = planetaryData[dataPointIndex];
//             const lat = parseFloat(planetData[latIndex]);
//             const lon = parseFloat(planetData[lonIndex]);
//             const alt = parseFloat(planetData[altIndex]);

//             // Check for NaN values
//             if (isNaN(lat) || isNaN(lon||isNaN(alt))) {
//                 console.warn(`Skipping invalid data point: index=${dataPointIndex}, lat=${lat}, lon=${lon}`);
//                 return; // Skip this iteration
//             }

//             console.log(`Data Point Index: ${dataPointIndex}, Latitude: ${lat}, Longitude: ${lon}, Altitude: ${alt}`);
//             const position = latLonToXYZorbit(lat, lon, alt);
//             console.log(position);

//             // Use an arbitrary or default impact energy for orbit calculation
//             const impactEnergy = parseFloat(planetData[fields.indexOf('impact-e')]) || 10; // Default to 10 if undefined
//             const a = impactEnergy * 0.5; // Semi-major axis in km (arbitrary scaling)
//             const b = a * 0.7; // Semi-minor axis (arbitrary scaling)

//             // Create the elliptical orbit
//             const orbit = createEllipticalOrbit(a, b, 200, position);

//             // Set the orbit's position to the calculated center
//             orbit.position.copy(position);

//             // Add the orbit to the scene
//             scene.add(orbit);
//         } else {
//             console.warn(`Index ${dataPointIndex} is out of bounds for planetaryData.`);
//         }
//     });
// }

// fetch('http://localhost:3000/api/planet-positions')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//         visualizeOrbits(data);
//         // Extract the 'fields' and 'data' array
//         const fields = data.fields; // This holds the names of the fields
//         const planetaryData = data.data; // This holds the array of planet details

//         // Find the indices for lat and lon based on the fields array
//         const latIndex = fields.indexOf('lat'); // Index for latitude
//         const lonIndex = fields.indexOf('lon'); // Index for longitude

//         // Loop through the indexofdata array to access the desired planets
//         indexofdata.forEach((dataPointIndex, i) => {
//             if (dataPointIndex < planetaryData.length) { // Ensure index is within bounds
//                 const planetData = planetaryData[dataPointIndex];

//                 // Extract lat and lon using the indices found earlier
//                 const lat = parseFloat(planetData[latIndex]);
//                 const lon = parseFloat(planetData[lonIndex]);

//                 // Log latitude and longitude for debugging
//                 console.log(`Data Point Index: ${dataPointIndex}, Latitude: ${lat}, Longitude: ${lon}`);

//                 // Use lat and lon to create a planet position
//                 const position = latLonToXYZ(lat, lon);

//                 // Use the index `i` to get the correct texture from the array
//                 const texture = textures[i % textures.length]; // Loop over textures array if needed

//                 const size = getPlanetSize(i/34); // Pass the index to get the planet size
//                 planets[`planet-${i}`] = createPlanet(size, texture, position);
//             } else {
//                 console.warn(`Index ${dataPointIndex} is out of bounds for planetaryData.`);
//             }
//         });

//         animate();  // Start animation after creating planets
//     })
//     .catch(error => console.error('Error fetching planetary data:', error));

// camera.position.z = 150;
// const canvas = document.querySelector('#real');
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Resize handling
// window.addEventListener("resize", () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });


// // Animation loop
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.minDistance = 50;
// controls.maxDistance = 500;
// controls.maxPolarAngle = Math.PI / 2;
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
// directionalLight.position.set(50, 50, 50).normalize();
// scene.add(directionalLight);
// function animate() {
//     requestAnimationFrame(animate);

//     // Optionally rotate the planets slowly
//     Object.values(planets).forEach(planet => {
//         planet.rotation.y += 0.01;
//     });

//     // Update controls
//     controls.update();
//     renderer.render(scene, camera);
// }

// // Helper functions for planet size and color
// function getPlanetSize(index) {
//     switch (index) {
//             // Sun
//         case 0: return 1.5;     // Mercury
//         case 1: return 2.46;     // Venus
//         case 2: return 2.57;   // Earth
//           // Moon (optional, if included)
//         case 3: return 1.37;   // Mars
//         case 4: return 28.74;     // Jupiter
//         case 5: return 24.09;   // Saturn
//         case 6: return 10.19;   // Uranus
//         case 7: return 9.94;   // Neptune
//         default: return 1;    // Fallback for other planets (like Pluto)
//     }
// }

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create lighting

const textureLoader = new THREE.TextureLoader();
const textures = {
    sun: textureLoader.load('./images/sun_texture.jpg'),
    mercury: textureLoader.load('./images/mercury_texture.jpg'),
    venus: textureLoader.load('./images/venus_texture.jpg'),
    earth: textureLoader.load('./images/earth_texture.jpg'),
    moon: textureLoader.load('./images/moon_texture.jpg'),
    mars: textureLoader.load('./images/mars_texture.jpg'),
    jupiter: textureLoader.load('./images/jupiter_texture.jpg'),
    saturn: textureLoader.load('./images/saturn_texture.jpg'),
    neptune: textureLoader.load('./images/neptune_texture.jpg'),
    pluto: textureLoader.load('./images/pluto_texture.jpg'),
};

// function updateGMTTime() {
//     const now = new Date();
//     const year = now.getUTCFullYear();
//     const month = now.getUTCMonth() + 1; // Months are zero-based in JavaScript
//     const day = now.getUTCDate();
//     const hours = now.getUTCHours();
//     const minutes = now.getUTCMinutes();
//     const seconds = now.getUTCSeconds();
//     const ampm = hours >= 12 ? 'PM' : 'AM';

//     // Convert to 12-hour format
//     const hour12 = hours % 12 || 12; // Adjust hour to 12-hour format
//     const minuteStr = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if needed
//     const secondStr = seconds < 10 ? '0' + seconds : seconds; // Add leading zero if needed

//     const gmtTime = `${month}/${day}/${year} ${hour12}:${minuteStr}:${secondStr} ${ampm} GMT`; // Format the time string
//     document.getElementById('time').textContent = gmtTime; // Display the time in the designated div
// }


// // Update GMT time every second
// updateGMTTime(); // Initial call
// setInterval(updateGMTTime, 1000);
// const background = new THREE.TextureLoader();
// const texture = background.load('./images/back.jpg');
// scene.background=texture;
// const pointLight = new THREE.PointLight(0xffffff, 3, 500);
// pointLight.position.set(0, 0, 10);  // Sun at the center
// scene.add(pointLight);

// // Create the Sun
// const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
// const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
// const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// scene.add(sun);
// const sunPointLight = new THREE.PointLight(0xffffff, 5, 300); // Intense light with a long range
// sunPointLight.position.set(0, 0, 0);  // Place it at the center (Sun's position)
// scene.add(sunPointLight);
// // Function to create planets with texture
// function createPlanet(size, texture, position) {
//     const geometry = new THREE.SphereGeometry(size, 32, 32);
//     const material = new THREE.MeshStandardMaterial({ map: texture });
//     const planet = new THREE.Mesh(geometry, material);
//     planet.position.set(position.x, position.y, position.z);
//     scene.add(planet);
//     return planet;
// }

// // Planet dictionary to store all planets
// const planets = {};

// // Function to convert lat/lon to 3D coordinates
// function latLonToXYZ(lat, lon, radius = 50) {
//     const phi = (90 - lat) * (Math.PI / 180);
//     const theta = (lon + 180) * (Math.PI / 180);

//     const x = -(radius * Math.sin(phi) * Math.cos(theta));
//     const y = radius * Math.cos(phi);
//     const z = radius * Math.sin(phi) * Math.sin(theta);

//     return { x, y, z };
// }

// // Load textures for each planet

// // Fetch planet positions from the backend
// const indexofdata = [199, 299, 399, 499, 599, 699, 799, 899, 10]; // Specific data points you want to access

// fetch('http://localhost:3000/api/planet-positions')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);

//         // Extract the 'fields' and 'data' array
//         const fields = data.fields; // This holds the names of the fields
//         const planetaryData = data.data; // This holds the array of planet details

//         // Find the indices for lat and lon based on the fields array
//         const latIndex = fields.indexOf('lat'); // Index for latitude
//         const lonIndex = fields.indexOf('lon'); // Index for longitude

//         // Loop through the indexofdata array to access the desired planets
//         indexofdata.forEach(dataPointIndex => {
//             if (dataPointIndex < planetaryData.length) { // Ensure index is within bounds
//                 const planetData = planetaryData[dataPointIndex];

//                 // Extract lat and lon using the indices found earlier
//                 const lat = parseFloat(planetData[latIndex]);
//                 const lon = parseFloat(planetData[lonIndex]);

//                 // Log latitude and longitude for debugging
              

//                 // Use lat and lon to create a planet
//                 const planetName = `planet-${dataPointIndex}`; // Customize the name as needed
//                 const position = latLonToXYZ(lat, lon);

//                 // Determine the texture based on the planet name
//                 const texture = textures[planetName.toLowerCase()] || textures.mercury; // Fallback to mercury if not found

//                 const size = getPlanetSize(planetName);
//                 planets[planetName.toLowerCase()] = createPlanet(size, texture, position);
//             } else {
                
//             }
//         });

//         animate();  // Start animation after creating planets
//     })
//     .catch(error => console.error('Error fetching planetary data:', error));

// // Camera position
// camera.position.z = 150;
// const canvas = document.querySelector('#real');
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Resize handling
// window.addEventListener("resize", () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });
// const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Bright white light
// directionalLight.position.set(0, 0, 0); // Place at the sun's position (origin)
// directionalLight.castShadow = true;  // Enable shadows for realism
// scene.add(directionalLight);
// const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(ambientLight);
// // Animation loop
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.minDistance = 50;
// controls.maxDistance = 500;
// controls.maxPolarAngle = Math.PI / 2;
// // Set your API key here
// const API_KEY = 'fWhU0MD2qUv7I5KLQx1ropqgAVMzc8cRk0UxYxuW';

// // Function to fetch near-earth objects (NEOs)
// async function fetchNearEarthObjects(startDate, endDate) {
//   const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     // Check if data was successfully fetched
//     if (data.near_earth_objects) {
//       console.log("Near Earth Objects data:", data.near_earth_objects);
//     } else {
//       console.error("No data found.");
//     }
//   } catch (error) {
//     console.error("Error fetching NEO data:", error);
//   }
// }

// // Call the function with a date range (format YYYY-MM-DD)
// fetchNearEarthObjects('2024-10-01', '2024-10-07');

// function animate() {
//     requestAnimationFrame(animate);

//     // Optionally rotate the planets slowly
//     Object.values(planets).forEach(planet => {
//         planet.rotation.y += 0.001;
//     });

//     // Update controls
//     controls.update();
//     renderer.render(scene, camera);
// }

// // Helper functions for planet size and color
// function getPlanetSize(name) {
//     switch (name.toLowerCase()) {
//         case 'mercury': return 1;
//         case 'venus': return 2;
//         case 'earth': return 2.5;
//         case 'mars': return 1.5;
//         case 'jupiter': return 3;
//         case 'saturn': return 2.8;
//         case 'uranus': return 2.5;
//         case 'neptune': return 2.3;
//         default: return 1;
//     }
// } 

let asteroidMeshes = [];
const asteroidOrbitRadius = 50;

// Replace with your NASA API key
const apiKey = 'fWhU0MD2qUv7I5KLQx1ropqgAVMzc8cRk0UxYxuW';
const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-06&api_key=${apiKey}`;

function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Set up a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 100);
  const canvas = document.querySelector('#real');
  // Set up the renderer
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 50;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;
  
  // Add lighting
 

rendererr.setSize(window.innerWidth, window.innerHeight);

// Resize handling
window.addEventListener("resize", () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
});
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 100).normalize();
  scene.add(light);

  // Create the Earth
  const earthGeometry = new THREE.SphereGeometry(30, 64, 64);
  const earthTexture = new THREE.TextureLoader().load('./images/earth_texture.jpg');
  const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  // Fetch NEO data from NASA API and create asteroids
  fetchNEOData();

  // Start rendering loop
  animate();
}

// Fetch NEO data from NASA API
function fetchNEOData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const neos = data.near_earth_objects;
      for (let date in neos) {
        neos[date].forEach(neo => {
          createAsteroid(neo);
        });
      }
    })
    .catch(error => {
      console.error("Error fetching NEO data:", error);
    });
}

// Create an asteroid based on the NEO data
function createAsteroid(neo) {
  const asteroidSize = (neo.estimated_diameter.kilometers.estimated_diameter_max * 5) || 1;  // Scale the size for visibility
  const asteroidGeometry = new THREE.SphereGeometry(asteroidSize, 32, 32);
  const asteroidMaterial = new THREE.MeshPhongMaterial({ color: 0xff5733 });
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

  // Randomize starting positions in orbit (the distance from Earth is exaggerated)
  asteroid.userData = {
    angle: Math.random() * Math.PI * 2,  // Initial angle around Earth
    speed: 0.001 + Math.random() * 0.0005,  // Each asteroid moves at a slightly different speed
    distance: (neo.close_approach_data[0].miss_distance.kilometers / 1000000) + asteroidOrbitRadius  // Exaggerate the distance
  };

  asteroidMeshes.push(asteroid);
  scene.add(asteroid);
}

// Update asteroid positions to simulate orbits
function updateAsteroids() {
  asteroidMeshes.forEach(asteroid => {
    const angle = asteroid.userData.angle;
    const speed = asteroid.userData.speed;
    const distance = asteroid.userData.distance;

    // Calculate asteroid's position in orbit
    asteroid.position.x = distance * Math.cos(angle) * 10;
    asteroid.position.z = distance * Math.sin(angle);
    asteroid.position.y = Math.sin(angle) * 10;  // Add slight wobble

    // Update the angle to simulate movement
    asteroid.userData.angle += speed;
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Earth
  earth.rotation.y += 0.001;

  // Update asteroid positions
  updateAsteroids();

  renderer.render(scene, camera);
  controls();
}

// Initialize the scene on window load
window.onload = init;



// Animation loop
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 50;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

