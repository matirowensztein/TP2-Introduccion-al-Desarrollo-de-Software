const express = require('express');
const app = express();
const pacientesRoutes = require('./routes/pacientes.routes.js');


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.use('/pacientes', pacientesRoutes);

app.listen(1234, () => {
  console.log("Server is running on port 1234");
});