const { pool } = require("../db.js");

const getMedicos = async function (req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM medicos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los médicos" });
  }
}

const getMedicoById = async function (req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM medicos WHERE id = $1", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Medico no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el medico" });
  }
}

const createMedico = async function (req, res) {
  try {
    const {
      nombre,
      apellido,
      especialidad,
      matricula_profesional,
      email,
      telefono,
    } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO Medicos (nombre, apellido, especialidad, matricula_profesional, email, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [nombre, apellido, especialidad, matricula_profesional, email, telefono]
    );
    res.status(201).json({
      id: rows[0].id,
      nombre,
      apellido,
      especialidad,
      matricula_profesional,
      email,
      telefono,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el medico" });
  }
}

const updateMedico = async function (req, res) {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      especialidad,
      matricula_profesional,
      email,
      telefono,
    } = req.body;

    const result = await pool.query(
      `UPDATE Medicos SET nombre = $1, apellido = $2, especialidad = $3, matricula_profesional = $4, email = $5, telefono = $6 WHERE id = $7`,
      [nombre, apellido, especialidad, matricula_profesional, email, telefono, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Medico no encontrado" });
    }

    res.json({ message: "Medico actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el medico" });
  }
}

const deleteMedico = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM Medicos WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Medico no encontrado" });
    }
    res.json({ message: "Medico eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el Medico" });
  }
}

module.exports = {
  getMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico
};
