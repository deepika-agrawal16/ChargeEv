import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Station from './models/station.js';
import fs from 'fs';

dotenv.config();

const stationsData = JSON.parse(fs.readFileSync('./data/stations.json', 'utf-8'));

const formattedStations = stationsData
  .filter(station =>
    station.latitude !== "NA" &&
    station.longitude !== "NA" &&
    !isNaN(parseFloat(station.latitude)) &&
    !isNaN(parseFloat(station.longitude)) &&
    station.name && station.name.trim() !== ""
  )
  .map(station => ({
    stationid: station.stationid,
    name: station.name,
    address: station.address,
    city: station.city,
    state: station.state,
    pincode: station.pincode,
    latitude: parseFloat(station.latitude),
    longitude: parseFloat(station.longitude),
    pricing: station.pricing,
    availability: Boolean(station.availability),
    isValidated: station.isValidated,
    issue: station.issue,
    type: station.type,
    contact: station.contact,
    phones: station.phones,
    notes: station.notes,
    connectors: station.connectors || [],
    updatedAt: new Date()
  }));

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    await Station.deleteMany();
    await Station.insertMany(formattedStations);
    console.log('Stations Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error while seeding:', err);
    process.exit(1);
  }
};

importData();
