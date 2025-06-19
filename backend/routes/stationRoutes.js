import express from "express";
import { getAllStations } from "../controllers/stationController.js";

const router = express.Router();

router.get("/", getAllStations);

export default router;
