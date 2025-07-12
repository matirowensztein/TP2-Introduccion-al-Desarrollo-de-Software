const express = require("express");
const {
  getMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medicos.controller.js");

const router = express.Router();

router.get("/", getMedicos);
router.get("/:id", getMedicoById);
router.post("/", createMedico);
router.put("/:id", updateMedico);
router.delete("/:id", deleteMedico);

module.exports = router;
