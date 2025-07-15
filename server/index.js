const express = require('express');
const cors = require('cors');
const pacientesRoutes = require('./routes/pacientes.routes.js');
const medicosRoutes = require('./routes/medicos.routes.js');
const citasRoutes = require('./routes/citas.routes.js');

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("TP2 - Introducción al Desarrollo de Software");
});

app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/citas', citasRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});