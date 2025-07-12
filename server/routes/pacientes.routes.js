const express = require('express');
const pacienteCRUD = require('../controllers/pacientes.controller.js');

const router = express.Router();

router.get('/', pacienteCRUD.getPacientes);
router.get('/:id', pacienteCRUD.getPacienteById);
router.post('/', pacienteCRUD.createPaciente);
router.put('/:id', pacienteCRUD.updatePaciente);
router.delete('/:id', pacienteCRUD.deletePaciente);

module.exports = router;