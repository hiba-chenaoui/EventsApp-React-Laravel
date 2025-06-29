// src/fakeData/fakeBusinessData.js

const fakeBusinessData = {
    business: {
      company_name: "Zen Haven",
      business_type: "Yoga Studio",
      description: "A peaceful sanctuary for mindful practices.",
      phone: "+123456789",
    },
    spaces: [
      {
        id: 1,
        name: "Lotus Room",
        type_of_space: "Meditation Room",
        description: "A quiet room with calming atmosphere",
        address: {
          street: "123 Peace Blvd",
          city: "Harmony",
          state: "CA"
        },
        capacity: 15,
        price_per_hour: 30,
        price_per_day: 150,
        amenities: ["WiFi", "Tea", "Cushions"],
        images: ["https://i.pinimg.com/736x/d1/d8/64/d1d864467b740f80be36ec8c32a300f2.jpg"]
      },
      {
        id: 2,
        name: "Sunlight Hall",
        type_of_space: "Event Space",
        description: "Spacious room with natural light for community events",
        address: {
          street: "456 Energy St",
          city: "Sunville",
          state: "FL"
        },
        capacity: 30,
        price_per_hour: 50,
        price_per_day: 300,
        amenities: ["WiFi", "Coffee", "Sound System", "Parking"],
        images: ["https://i.pinimg.com/736x/96/57/93/9657933e3748b5cb38f4bc7e42f8f8ca.jpg"]
      },
      {
        id: 3,
        name: "Tranquil Garden",
        type_of_space: "Outdoor Area",
        description: "A lush garden for yoga and mindfulness in nature.",
        address: {
          street: "789 Serenity Ln",
          city: "Greensville",
          state: "OR"
        },
        capacity: 20,
        price_per_hour: 40,
        price_per_day: 220,
        amenities: ["WiFi", "Natural Light", "Plants", "Outdoor Seating"],
        images: ["https://i.pinimg.com/736x/77/e4/42/77e44263c7ab6c26d1e15bc4d5f73a71.jpg"]
      },
      {
        id: 4,
        name: "Moonlight Lounge",
        type_of_space: "Relaxation Room",
        description: "Dim lighting, essential oils, and music for deep relaxation.",
        address: {
          street: "321 Calm Ave",
          city: "Stillwater",
          state: "NM"
        },
        capacity: 10,
        price_per_hour: 25,
        price_per_day: 100,
        amenities: ["Music", "Aromatherapy", "Cushions", "Tea"],
        images: ["https://i.pinimg.com/736x/e4/90/63/e49063ebc164260d0ea95de31992a167.jpg"]
      },
      {
        id: 5,
        name: "Balance Studio",
        type_of_space: "Yoga Room",
        description: "Spacious studio with mirrors and mats for all levels.",
        address: {
          street: "654 Balance Rd",
          city: "Flowtown",
          state: "TX"
        },
        capacity: 25,
        price_per_hour: 45,
        price_per_day: 250,
        amenities: ["WiFi", "Yoga Mats", "Mirrors", "Sound System"],
        images: ["https://i.pinimg.com/736x/b1/7e/c6/b17ec6aa4f727d2e01244b2b2c315351.jpg"]
      }
    ]
  };
  
  export default fakeBusinessData;
  