import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Station from './models/station.js';
import fs from 'fs';

dotenv.config();

const stationsData = JSON.parse(fs.readFileSync('./data/stations.json', 'utf-8'));

// Clean invalid records
const formattedStations = stationsData
  .filter(station =>
    station.lattitude !== "NA" &&
    station.longitude !== "NA" &&
    !isNaN(parseFloat(station.lattitude)) &&
    !isNaN(parseFloat(station.longitude)) &&
    station.name && station.name.trim() !== ""
  )
  .map(station => ({
    name: station.name,
    address: station.address,
    city: station.city,
    state: station.state,
    pincode: station.pincode,
    latitude: parseFloat(station.lattitude),
    longitude: parseFloat(station.longitude),
    pricing: station.pricing,
    availability: station.availability === 1,
  }));

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Station.deleteMany();
    await Station.insertMany(formattedStations);
    console.log('✅ Stations Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error while seeding:', err);
    process.exit(1);
  }
};

importData();
