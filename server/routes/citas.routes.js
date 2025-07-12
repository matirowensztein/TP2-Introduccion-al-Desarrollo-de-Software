const express = require("express");
const citasCRUD = require("../controllers/citas.controller.js");

const router = express.Router();

router.get("/", citasCRUD.getCitas);
router.get("/:id", citasCRUD.getCitaById);
router.post("/", citasCRUD.createCita);
router.put("/:id", citasCRUD.updateCita);
router.delete("/:id", citasCRUD.deleteCita);

module.exports = router;