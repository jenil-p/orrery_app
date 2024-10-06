import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 2000);


const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load('./images/sun_texture.jpg'),
  textureLoader.load('./images/mercury_texture.jpg'),// 4
  textureLoader.load('./images/venus_texture.jpg'),// 4
  textureLoader.load('./images/earth_texture.jpg'),  // 1
  textureLoader.load('./images/moon_texture.jpg'),   // 2
  textureLoader.load('./images/mars_texture.jpg'),   // 3
  textureLoader.load('./images/jupiter_texture.jpg'),
  textureLoader.load('./images/saturn_texture.jpg'),
  textureLoader.load('./images/neptune_texture.jpg'),
  textureLoader.load('./images/pluto_texture.jpg')

];
const planetMeshes = [];
const sunGeometry = new THREE.SphereGeometry(15, 32, 16);
const sunMaterial = new THREE.MeshStandardMaterial({ map: textures[0] });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.userData = { name: "Sun" };
planetMeshes.push(sunMesh);
scene.add(sunMesh);
const background = new THREE.TextureLoader();
const texture = background.load('./images/back.jpg');
scene.background=texture;
const createOrbit = (radius) => {
  const curve = new THREE.EllipseCurve(
    0, 0, radius, radius, 0, 2 * Math.PI, false, 0
  );

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });

  const orbit = new THREE.Line(geometry, material);
  orbit.rotation.x = Math.PI / 2; 
  return orbit;
};


const loader = new GLTFLoader();
// Create spaceship (a simple cube for now)
let spaceship;
const cockpitOffset = new THREE.Vector3(0, 5, -15);


loader.load('./helicopter_space_ship.glb', (gltf) => {
  spaceship = gltf.scene;

  spaceship.traverse((child) => {
    if (child.isMesh) {
      console.log('Mesh found:', child.name); // Log the mesh name

      // Check if it's the cockpit (adjust the name as needed)
      if (child.name.includes('cockpit')) {
        // Optionally, change the material color for visual debugging
        child.material.color.set(0x00ff00); // Temporarily set cockpit color to green
      }
    }
  });

  scene.add(spaceship); // Add spaceship to the scene

  // Set initial camera position based on the cockpit
  camera.position.copy(spaceship.position).add(cockpitOffset);
  camera.lookAt(spaceship.position);
}, undefined, (error) => {
  console.error('An error occurred while loading the GLB model:', error);
});



// Movement variables
camera.position.z = 40;
let moveLeft = false, moveRight = false, moveUp = false, moveDown = false, moveForward = false, moveBackward = false;
let gameStarted = false;let planetsMoving = true; 

function animatePlanets() {
  if (planetsMoving) {
    earthPivot.rotation.y += 0.001; 

    moonPivot.rotation.y += 0.005; 
  
    planetData.forEach(planet => {
      // Calculate the orbital speed (inverse of orbitPeriod scaled down)
      const orbitalSpeed = (2 * Math.PI / planet.orbitPeriod) * speedMultiplier;
      planet.pivot.rotation.y += orbitalSpeed; // Rotate pivot for orbit
      
      // Calculate the rotational speed (inverse of rotationPeriod scaled down)
      const rotationSpeed = (2 * Math.PI / planet.rotationPeriod) * speedMultiplier;
      planet.pivot.children[0].rotation.y += rotationSpeed; // Rotate the planet itself
    });
  }
}

document.addEventListener('keydown', (event) => {
  if (!gameStarted) return;  // Ignore movement if the game hasn't started

  if (event.key === 'ArrowLeft') moveLeft = true;
  if (event.key === 'ArrowRight') moveRight = true;
  if (event.key === 'ArrowUp') moveUp = true;
  if (event.key === 'ArrowDown') moveDown = true;
  if (event.key === 'w') moveForward = true;
  if (event.key === 's') moveBackward = true;
});

document.addEventListener('keyup', (event) => {
  if (!gameStarted) return;

  if (event.key === 'ArrowLeft') moveLeft = false;
  if (event.key === 'ArrowRight') moveRight = false;
  if (event.key === 'ArrowUp') moveUp = false;
  if (event.key === 'ArrowDown') moveDown = false;
  if (event.key === 'w') moveForward = false;
  if (event.key === 's') moveBackward = false;
});


let rotateLeft = false;
let rotateRight = false;
let turnSpeed = 0.05; 
let spaceshipSpeed = 0.5;
document.addEventListener('mousedown', (event) => {
  if (!gameStarted) return; // Ignore if the game hasn't started

  if (event.button === 0) { // Left mouse button
    rotateLeft = true; // Start rotating left
  }
  if (event.button === 2) { // Right mouse button
    rotateRight = true; // Start rotating right
  }
});

document.addEventListener('mouseup', (event) => {
  if (!gameStarted) return; // Ignore if the game hasn't started

  if (event.button === 0) { // Left mouse button
    rotateLeft = false; // Stop rotating left
  }
  if (event.button === 2) { // Right mouse button
    rotateRight = false; // Stop rotating right
  }
});
window.addEventListener('keydown', (event) => {
  switch(event.code) {
      case 'ArrowUp': // Assuming ArrowUp moves forward
          moveForward = true;
          break;
      case 'ArrowDown': // Assuming ArrowDown moves backward
          moveBackward = true;
          break;
      case 'ArrowLeft':
          rotateLeft = true;
          break;
      case 'ArrowRight':
          rotateRight = true;
          break;
      // Add more cases for other movements
  }
});

window.addEventListener('keyup', (event) => {
  switch(event.code) {
      case 'ArrowUp':
          moveForward = false;
          break;
      case 'ArrowDown':
          moveBackward = false;
          break;
      case 'ArrowLeft':
          rotateLeft = false;
          break;
      case 'ArrowRight':
          rotateRight = false;
          break;
      // Add more cases to stop movements
  }
});


function updateSpaceship() {
  if (!gameStarted || !spaceship) return; // Ensure the spaceship is loaded

  // Rotation logic
  if (rotateLeft) {
    spaceship.rotation.y += turnSpeed; // Rotate left
  }
  if (rotateRight) {
    spaceship.rotation.y -= turnSpeed; // Rotate right
  }

 
  const forward = new THREE.Vector3(0, 0, -1); 
  forward.applyQuaternion(spaceship.quaternion); 
 
  if (moveForward) {
    spaceship.position.add(forward.multiplyScalar(spaceshipSpeed)); // Move spaceship forward
  }
  if (moveBackward) {
    spaceship.position.add(forward.clone().negate().multiplyScalar(spaceshipSpeed)); // Move backward
  }

  // Optional side movement based on input
  if (moveLeft) {
    spaceship.position.x -= 0.3; // Move left (in world space)
  }
  if (moveRight) {
    spaceship.position.x += 0.3; // Move right (in world space)
  }
  if (moveUp) {
    spaceship.position.y += 0.3; // Move up (in world space)
  }
  if (moveDown) {
    spaceship.position.y -= 0.3; 
  }

  
  spaceship.rotation.z = 0; 

  
  const worldPosition = new THREE.Vector3();
  spaceship.localToWorld(worldPosition.copy(cockpitOffset)); // Transform cockpit offset to world position

  camera.position.copy(worldPosition); // Set camera position
  camera.lookAt(spaceship.position); // Make camera look at the spaceship
}

const earthPivot = new THREE.Object3D();
scene.add(earthPivot);

const earthGroup = new THREE.Group();
const earthGeometry = new THREE.SphereGeometry(5, 32, 16);
const earthMaterial = new THREE.MeshStandardMaterial({ map: textures[3] });
const earthSphere = new THREE.Mesh(earthGeometry, earthMaterial);
earthSphere.userData = { name: "Earth" };
planetMeshes.push(earthSphere);
earthSphere.position.set(110, 0, 0);
earthGroup.add(earthSphere);

const moonPivot = new THREE.Object3D(); 
moonPivot.position.set(110, 0, 0); 
const moonGeometry = new THREE.SphereGeometry(1.5, 32, 16);
const moonMaterial = new THREE.MeshStandardMaterial({ map: textures[4] });
const moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
moonSphere.position.set(10, 0, 0);
moonSphere.userData = { name: "moon" };
planetMeshes.push(moonSphere);
moonPivot.add(moonSphere);
earthGroup.add(moonPivot);  
earthPivot.add(earthGroup);


scene.add(createOrbit(110));

const planetData = [
  { name: 'Mercury', radius: 4, texture: textures[1], distance: 70, orbitPeriod: 88, rotationPeriod: 1407.6, pivot: new THREE.Object3D() },
  { name: 'Venus', radius: 3, texture: textures[2], distance: 90, orbitPeriod: 224.7, rotationPeriod: 5832.5, pivot: new THREE.Object3D() },
 
  { name: 'Mars', radius: 6, texture: textures[5], distance: 150, orbitPeriod: 687, rotationPeriod: 24.6, pivot: new THREE.Object3D() },
  { name: 'Jupiter', radius: 8, texture: textures[6], distance: 200, orbitPeriod: 4331, rotationPeriod: 9.9, pivot: new THREE.Object3D() },
  { name: 'Saturn', radius: 7, texture: textures[7], distance: 250, orbitPeriod: 10747, rotationPeriod: 10.7, pivot: new THREE.Object3D() },
  { name: 'Neptune', radius: 5, texture: textures[8], distance: 350, orbitPeriod: 60190, rotationPeriod: 16, pivot: new THREE.Object3D() },
  { name: 'Pluto', radius: 5, texture: textures[9], distance: 450, orbitPeriod: 90560, rotationPeriod: 153, pivot: new THREE.Object3D() },
];
function popPlanetDetails(planetName) {
  // Create a div to show planet details
  let detailDiv = document.getElementById('planet-detail-div');
  if (!detailDiv) {
    detailDiv = document.createElement('div');
    detailDiv.id = 'planet-detail-div';
    detailDiv.style.position = 'absolute';
    detailDiv.style.top = '10%';
    detailDiv.style.left = '10%';
    detailDiv.style.height = '250px';
    detailDiv.style.width = '200px';


    detailDiv.style.padding = '20px';
    detailDiv.style.backgroundColor = 'transparent';
    detailDiv.style.color = 'white';
    detailDiv.style.border = '1px solid #fff';
    detailDiv.style.zIndex = '1000'; // Ensure it's on top of other elements
    document.body.appendChild(detailDiv);
  }

  // Fetch the planet details from the data (replace this with your own API logic)
  fetch(`http://localhost:500/api/solar-system`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const planet = data.solarSystem.planets.find(p => p.name === planetName);
      if (planet) {
        // Populate the div with planet details
        detailDiv.innerHTML = `
          <h2>Planet: ${planet.name}</h2>
          <p>${planet.info}</p>
          <ul>
            <li><strong>Diameter:</strong> ${planet.diameter}</li>
            <li><strong>Mass:</strong> ${planet.mass}</li>
            <li><strong>Orbital Period:</strong> ${planet.orbitalPeriod}</li>
            <li><strong>Rotation Period:</strong> ${planet.rotationPeriod}</li>
            <li><strong>Moons:</strong> ${planet.confirmedMoons}</li>
          </ul>
          <button id="restart-button">Restart Game</button>
        `;

        // Add functionality to restart the game after showing details
        document.getElementById('restart-button').addEventListener('click', restartGame);
      }
    });
}

const url = 'http://localhost:500/api/solar-system';
let solarSystemData = null;
async function fetchSolarSystemData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    solarSystemData = await response.json();
    console.log(solarSystemData);
  } catch (error) {
    console.error("Error fetching solar system data:", error);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  fetchSolarSystemData();
});
planetData.forEach((planet) => {
  const planetGroup = new THREE.Group();
  const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 16);
  const planetMaterial = new THREE.MeshStandardMaterial({ map: planet.texture });
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.position.set(planet.distance, 0, 0); // Use correct distance
  planetMesh.userData = { name: planet.name };

  planetMeshes.push(planetMesh);
  planetGroup.add(planetMesh);

  planet.pivot.add(planetGroup);
  scene.add(planet.pivot);

  const planetOrbit = createOrbit(planet.distance); // Use correct distance
  scene.add(planetOrbit);
});
function enableControls() {
  // Enable all controls that were disabled during the collision/stop
  controls.enabled = true; // Assuming you have controls object for the spaceship
  gameStarted = true;      // Allow the game to start again

  console.log('Controls re-enabled and game restarted.');
}
function resetSpaceshipPosition() {
  if (!spaceship) return;

  // Reset spaceship position to the initial state
  spaceship.position.set(0,80,-100); // Adjust these values as your game's initial position
  spaceship.rotation.set(0, 0, 0);    // Reset the rotation if needed

  // Reset spaceship size to normal
  spaceship.traverse((child) => {
    if (child.isMesh) {
      const scaleNormal = new THREE.Vector3(1, 1, 1); // Restore to normal size
      child.scale.copy(scaleNormal);
    }
  });
 
  console.log('Spaceship reset to initial position.');
}
function restartGame() {
  // Hide the planet detail div
  const detailDiv = document.getElementById('planet-detail-div');
  if (detailDiv) {
    detailDiv.style.display = 'none'; // Hide the details
  }

  spaceship.traverse((child) => {
    if (child.isMesh) {
      const scaleNormal = new THREE.Vector3(1, 1, 1); // Restore to normal size
      child.scale.copy(scaleNormal);
    }
  });

  // Reset spaceship position and re-enable game movements
  spaceship.position.set(0, 80, -100); // Adjust as needed
  gameStarted = true; // Restart the game
  console.log('Game restarted!');
}
function collapseSpaceshipAndReset() {
  if (!spaceship) return;

  // Logic for collapsing the spaceship: Scale it down
  spaceship.traverse((child) => {
    if (child.isMesh) {
      const scaleDown = new THREE.Vector3(1, 1, 1);
      child.scale.copy(scaleDown); // Shrink the spaceship
    }
  });

  console.log('Spaceship has collapsed!');

  // After collapsing, reset the spaceship to its initial position
  setTimeout(() => {
    resetSpaceshipPosition();
    enableControls();  // Allow all controls after reset
  }, 1000); // Delay before resetting (1 second for effect)
}
function checkCollision() {
  if (!spaceship || !gameStarted) return;

  // Get the position of the spaceship in world coordinates
  const spaceshipPosition = new THREE.Vector3();
  spaceship.getWorldPosition(spaceshipPosition);

  // Loop through each planet and check the distance
  planetMeshes.forEach((planet) => {
    const planetPosition = new THREE.Vector3();
    planet.getWorldPosition(planetPosition);

    // Calculate the distance between the spaceship and the planet
    const distance = spaceshipPosition.distanceTo(planetPosition);

   
    const collisionDistance = 15; // Adjust this value based on spaceship size and planet size

    if (distance < collisionDistance) {
      // Display collision alert with the planet name
      // alert(`Collision with ${planet.userData.name}!`);
popPlanetDetails(planet.userData.name);
      // Display planet details
      gameStarted = false;
      controls.enabled = false;  // Disable controls during collapse

      collapseSpaceshipAndReset(); 
    }
  });
}

function onPlanetClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Intersect objects in the scene
  const intersects = raycaster.intersectObjects(planetMeshes, true); // 'true' allows searching through child objects
  if (intersects.length > 0) {
      const clickedObject = intersects[0].object;

      // Check if the clicked object is a planet
      if (clickedObject.userData && clickedObject.userData.name) {
          const clickedPlanetName = clickedObject.userData.name;
          console.log(clickedPlanetName); // Log the name of the clicked planet

          // Find the planet data from the pre-fetched solar system data
          const planet = solarSystemData.solarSystem.planets.find(p => p.name === clickedPlanetName);

          // Prepare planet details to display
          if (planet) {
              displayPlanetDetails(planet); // Display planet details
          } else if (clickedPlanetName === 'Sun') {
              displayPlanetDetails({
                  name: "Sun",
                  type: "Star",
                  mass: "1.989 x 10^30 kg",
                  atmosphere: "He",
                  diameter: "1,391,000 km",
                  orbitalPeriod: " 225-250 million years",
                  rotationPeriod: "35 day",
                  OrbitalSpeed: "230 km/s",
                  distanceFromEarth: "149.6 million km",
                  temperature: "5,500 °C"
              });
          } else if (clickedPlanetName === 'Earth') {
              displayPlanetDetails({
                  name: "Earth",
                  diameter: "12,742 km",
                  mass: "5.972 x 10^24 kg",
                  semi_major_axis: "149.6 million km",
                  orbitalPeriod: "365 days",
                  rotationPeriod: "1 day",
                  confirmedMoons: 1,
                  atmosphere: "N2, O2, Ar",
                  orbitalEccentricity: 0.017,
              });
          } else if (clickedPlanetName === 'moon') {
              displayPlanetDetails({
                  name: "Moon",
                  diameter: "3,474.8 km",
                  mass: "7.347 x 10^22 kg"
              });
          } else {
              console.error('Planet not found in solarSystemData:', clickedPlanetName);
          }
      } else {
          console.error('No planet data found on clicked object.');
      }
  }
}

function displayPlanetDetails(planet) {
  const detailsBox = document.getElementById('planetDetailsBox');
  detailsBox.classList.add('open'); 
  document.getElementById('planetName').innerText = planet.name;
  // document.getElementById('planetInfo').innerText = planet.info;
  const learnmoreElement = document.getElementById('learnmore');
  const planetImageElement = document.getElementById('planetImage');
  
  planetImageElement.src = `./images/${planet.name.toLowerCase()}.webp`;

  const detailsText = `
  <strong>Mass:</strong> ${planet.mass || 'N/A'}<br>
  <strong>Diameter:</strong> ${planet.diameter || 'N/A'}<br>
  <strong>Atmosphere:</strong> ${planet.atmosphere || 'N/A'}<br>
<strong>Diameter:</strong> ${planet.diameter}<br>
<strong>Orbital Period:</strong> ${planet.orbitalPeriod}<br>
<strong>Moons:</strong> ${planet.confirmedMoons}<br>
<strong>Rotation Period:</strong> ${planet.rotationPeriod}<br>
 
  <a href="./info_from_side/${planet.name}.html">Read more...</a>
`;
document.getElementById('planetDetails').innerHTML = detailsText;

}




// Optional: Close the box if needed
function closePlanetDetails() {
  const detailsBox = document.getElementById('planetDetailsBox');
  detailsBox.classList.remove('open');
}

// Prevent the default context menu on right-click
document.addEventListener('contextmenu', (event) => {
  event.preventDefault(); // This prevents the default browser right-click menu
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
directionalLight.position.set(50, 50, 50).normalize();
scene.add(directionalLight);

camera.position.z = 200;



const canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05; 
controls.minDistance = 50;      
controls.maxDistance = 500;    
controls.maxPolarAngle = Math.PI / 2;

const speedMultiplier = 0.001;  // Adjust this multiplier to control overall speed
const scaleFactor = 100; 

function animate() {
  window.requestAnimationFrame(animate);
  updateSpaceship();

  // Check for collision with the Sun
  checkCollision();
  renderer.render(scene, camera);

  animatePlanets();
  

  


  controls.update();
}

animate();


document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the start button
  document.getElementById('startButton').addEventListener('click', () => {
      document.getElementById('startButton').style.display = 'none';
      document.getElementById('outButton').style.display = 'block';
      document.getElementById('controls').style.display = 'block';
 alert("RULES for playing game 1 press W for moving forward 2 press S for moving backward 3 press UP KEY for going up 4 press DOWN KEY for going down5 use LEFT and RIGHT KEY for rotating")
      spaceship.visible = true;
      gameStarted = true;
      spaceship.position.set(0, 20, -40);

      planetsMoving = false; 
  });

  // Event listener for the exit button
  document.getElementById('outButton').addEventListener('click', () => {
      document.getElementById('outButton').style.display = 'none';
      document.getElementById('startButton').style.display = 'block';
      document.getElementById('controls').style.display = 'none';
    
      gameStarted = false;
      spaceship.position.set(10, 0, 0);
      planetsMoving = true;
      const detailDiv = document.getElementById('planet-detail-div');
      if (detailDiv) {
        detailDiv.style.display = 'none'; // Hide the details
      }
  });


  document.getElementById('closeButton').onclick = () => {
    document.getElementById('planetDetailsBox').classList.remove('open');
    };
    document.querySelector('canvas').addEventListener('click', onPlanetClick);
  // Your existing Three.js setup code...
});

