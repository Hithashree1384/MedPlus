import express from "express";
import multer from "multer";
import { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor, toggleDoctorAvailability, loginDoctor } from "../controllers/doctorController.js";
import doctorsAuth from "../middlewares/doctorsAuth.js";

const upload = multer({ dest: "/tmp" });

const doctorRouter = express.Router();

doctorRouter.get("/", getDoctors);

doctorRouter.post("/login",loginDoctor);

doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", upload.single("image"), createDoctor);

//after login 
doctorRouter.put("/:id", doctorsAuth, upload.single("image"), updateDoctor);
doctorRouter.post("/:id/toggle-availability", doctorsAuth, toggleDoctorAvailability)
doctorRouter.delete("/:id",  deleteDoctor);

export default doctorRouter;