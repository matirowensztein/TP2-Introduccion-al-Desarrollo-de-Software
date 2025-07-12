const express = require('express');
const app = express();
const pacientesRoutes = require('./routes/pacientes.routes.js');
const medicosRoutes = require('./routes/medicos.routes.js');

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});