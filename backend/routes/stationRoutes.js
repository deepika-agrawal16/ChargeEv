import express from "express";
import {
  getAllStations,
  createStation,
  deleteStation,
} from "../controllers/stationController.js";
import protect from "../middlewares/authMiddlewares.js";
import isAdmin from "../middlewares/isAdmin.js"; //

const router = express.Router();

router.get("/", getAllStations);
router.post("/", protect, isAdmin, createStation);     
router.delete("/:id", protect, isAdmin, deleteStation); 

export default router;
