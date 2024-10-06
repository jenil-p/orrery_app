import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 500;



// Sample Solar System Dataset
const solarSystemData = {
  solarSystem: {
    sun: {
      name: "Sun",
      type: "Star",
      info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

      mass: "1.989 x 10^30 kg",
      diameter: "1,391,000 km",
      distanceFromEarth: "149.6 million km",
      temperature: "5,500 °C"
    },
    planets: [
      {
        name: "Mercury",
        info: "system.",
        diameter: "4,880 km",
        mass: "3.285 x 10^23 kg",
        semi_major_axis: "57.91 million km",
        orbitalPeriod: "88 days",
        rotationPeriod: "58.64 days",
        confirmedMoons: 0,
        atmosphere: "minimal",
        orbitalEccentricity: 0.206,
        moons: []
      },
      {
        name: "Venus",
        diameter: "12,104 km",
        mass: "4.867 x 10^24 kg",
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        semi_major_axis: "108.2 million km",
        orbitalPeriod: "225 days",
        rotationPeriod: "−243.02 days",
        confirmedMoons: 0,
        atmosphere: "CO2, N2",
        orbitalEccentricity: 0.007,
        moons: []
      },
      {
        name: "Earth",
        diameter: "12,742 km",
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        mass: "5.972 x 10^24 kg",
        semi_major_axis: "149.6 million km",
        orbitalPeriod: "365 days",
        rotationPeriod: "1 day",
        confirmedMoons: 1,
        atmosphere: "N2, O2, Ar",
        orbitalEccentricity: 0.017,
        moons: [
          {
            name: "Moon",
            diameter: "3,474.8 km",
            mass: "7.347 x 10^22 kg"
          }
        ]
      },
      {
        name: "Mars",
        diameter: "6,779 km",
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        mass: "6.417 x 10^23 kg",
        semi_major_axis: "227.9 million km",
        orbitalPeriod: "687 days",
        rotationPeriod: "1.03 days",
        confirmedMoons: 2,
        atmosphere: "CO2, N2, Ar",
        orbitalEccentricity: 0.093,
        moons: [
          {
            name: "Phobos",
            diameter: "22.4 km",
            mass: "1.0659 x 10^16 kg"
          },
          {
            name: "Deimos",
            diameter: "12.4 km",
            mass: "1.4762 x 10^15 kg"
          }
        ]
      },
      {
        name: "Jupiter",
        diameter: "139,820 km",
        mass: "1.898 x 10^27 kg",
        semi_major_axis: "778.5 million km",
        orbitalPeriod: "11.86 years",
        rotationPeriod: "0.41 days",
        confirmedMoons: 79,
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        atmosphere: "H2, He",
        orbitalEccentricity: 0.048,
        moons: [
          {
            name: "Io",
            diameter: "3,643.2 km",
            mass: "8.9319 x 10^22 kg"
          },
          {
            name: "Europa",
            diameter: "3,121.6 km",
            mass: "4.7998 x 10^22 kg"
          },
          {
            name: "Ganymede",
            diameter: "5,268.2 km",
            mass: "1.4813 x 10^23 kg"
          },
          {
            name: "Callisto",
            diameter: "4,820.6 km",
            mass: "1.0759 x 10^23 kg"
          }
        ]
      },
      {
        name: "Saturn",
        diameter: "116,460 km",
        mass: "5.683 x 10^26 kg",
        semi_major_axis: "1.434 billion km",
        orbitalPeriod: "29.46 years",
        rotationPeriod: "0.43 days",
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        confirmedMoons: 82,
        atmosphere: "H2, He",
        orbitalEccentricity: 0.054,
        moons: [
          {
            name: "Titan",
            diameter: "5,151.8 km",
            mass: "1.3452 x 10^23 kg"
          },
          {
            name: "Rhea",
            diameter: "1,527.6 km",
            mass: "5.8766 x 10^21 kg"
          }
        ]
      },
      {
        name: "Uranus",
        diameter: "50,724 km",
        mass: "8.681 x 10^25 kg",
        semi_major_axis: "2.871 billion km",
        orbitalPeriod: "84 years",
        rotationPeriod: "−0.72 days",
        confirmedMoons: 27,
        atmosphere: "H2, He, CH4",
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        orbitalEccentricity: 0.047,
        moons: [
          {
            name: "Titania",
            diameter: "1,578.8 km",
            mass: "3.526 x 10^21 kg"
          },
          {
            name: "Oberon",
            diameter: "1,523.6 km",
            mass: "3.144 x 10^21 kg"
          }
        ]
      },
      {
        name: "Neptune",
        diameter: "49,244 km",
        mass: "1.024 x 10^26 kg",
        semi_major_axis: "4.495 billion km",
        orbitalPeriod: "164.8 years",
        rotationPeriod: "0.67 days",
        confirmedMoons: 14,
        atmosphere: "H2, He, CH4",
        info: "Mercury, the closest planet to the Sun, is a small, rocky world with a diameter of 4,880 km and a mass of 3.285 x 10^23 kg. It has a very thin atmosphere composed mainly of oxygen and sodium, resulting in extreme temperature variations, ranging from -173°C at night to 427°C during the day.With an orbital speed of 47.87 km/s, Mercury has no moons and is the smallest planet in our solar system.",

        orbitalEccentricity: 0.009,
        moons: [
          {
            name: "Triton",
            diameter: "2,710 km",
            mass: "1.353 x 10^22 kg"
          }
        ]
      }
    ],
    asteroids: [
      {
        name: "Ceres",
        diameter: "940 km",
        mass: "9.39 x 10^20 kg",
        location: "Asteroid Belt"
      },
      {
        name: "Vesta",
        diameter: "525 km",
        mass: "2.59 x 10^20 kg",
        location: "Asteroid Belt"
      },
      {
        name: "Pallas",
        diameter: "512 km",
        mass: "2.11 x 10^20 kg",
        location: "Asteroid Belt"
      },
      {
        name: "Hygiea",
        diameter: "430 km",
        mass: "8.56 x 10^19 kg",
        location: "Asteroid Belt"
      }
    ]
  }
};

app.use(cors()); // Enable all CORS requests

app.get('/api/solar-system', (req, res) => {
  // Your logic to handle the request
  res.json(solarSystemData);
  console.log(res.json(solarSystemData));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

