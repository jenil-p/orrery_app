const buttons = document.querySelectorAll('.button-for-mission');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        // Toggle the display of the next sibling element
        const nextElement = this.nextElementSibling;
        if (nextElement && nextElement.classList.contains('mission-information')) {
            if (nextElement.style.display === 'none' || nextElement.style.display === '') {
                nextElement.style.display = 'block';
            } else {
                nextElement.style.display = 'none';
            }
        }
    });
});


function load3DPlanet(className, textureFile, size) {
    const planetContainer = document.querySelector(`.${className}`);

    if (!planetContainer) return;

    // Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, planetContainer.clientWidth / planetContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);  // Fully transparent background
    renderer.setSize(planetContainer.clientWidth, planetContainer.clientHeight);
    planetContainer.appendChild(renderer.domElement);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load(`${textureFile}`);
    
    // Create geometry and material for the planet
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(geometry, material);
    const background = textureLoader.load('./textures/back.jpg');
    scene.background = background;
    scene.add(planet);
    // Set camera position
    camera.position.z = size * 3;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        planet.rotation.y += 0.002;  // Slowly rotate the planet
        renderer.render(scene, camera);
    }



    animate();

    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', () => {
        const width = planetContainer.clientWidth;
        const height = planetContainer.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Planet texture and size configuration
const planetConfigs = {
    earth: { texture: './textures/earth.jpg', size: 5 },
    moon: { texture: './textures/moon.jpg', size: 3 },
    mars: { texture: './textures/mars.jpg', size: 4 },
    jupiter: { texture: './textures/jupiter.jpg', size: 6 },
    mercury: { texture: './textures/mercury.jpg', size: 4 },
    venus: { texture: './textures/venus.jpg', size: 4 },
    uranus: { texture: './textures/uranus.jpg', size: 4 },
    neptune: { texture: './textures/neptune.jpg', size: 4 },
    pluto: { texture: './textures/pluto.jpg', size: 3 },
};

// Replace all elements with class `planet_3D` with 3D planet models
document.querySelectorAll('.planet_3D').forEach((planetElem) => {
    const planetName = planetElem.getAttribute('data-planet');  // Assume `data-planet="earth"` for example
    const config = planetConfigs[planetName];

    if (config) {
        console.log(config.texture);
        load3DPlanet('planet_3D', config.texture, config.size);
    }
});

// Similar setup for moons if needed
const moonConfigs = {
    moon: { texture: './textures/moon.jpg', size: 2 },
    phobos: { texture: './textures/phobos.jpg', size: 1 },
    io: { texture: './textures/io.jpg', size: 1 },
    titan: { texture: './textures/titan.jpg', size: 2 },
    triton: { texture: './textures/triton.jpg', size: 1 },
    charon: { texture: './textures/charon.jpg', size: 1 },
    // Add more moons
};

document.querySelectorAll('.moon_3D').forEach((moonElem) => {
    const moonName = moonElem.getAttribute('data-moon');  // Assume `data-moon="moon"` for example
    const config = moonConfigs[moonName];

    if (config) {
        load3DPlanet('moon_3D', config.texture, config.size);
    }
});
