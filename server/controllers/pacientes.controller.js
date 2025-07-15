const { pool } = require('../db.js');

const getPacientes = async function (req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM pacientes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los pacientes' });
  }
}

const getPacienteById = async function (req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el paciente' });
  }
}

const createPaciente = async function (req, res) {
  try {
    const { nombre, apellido, dni, fecha_nacimiento, email, telefono } = req.body;
    const {rows} = await pool.query(
      'INSERT INTO pacientes (nombre, apellido, dni, fecha_nacimiento, email, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [nombre, apellido, dni, fecha_nacimiento, email, telefono]
    );
    res.status(201).json({
      id: rows[0].id,
      nombre, 
      apellido, 
      dni, 
      fecha_nacimiento, 
      email, 
      telefono
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el paciente' });
  }
}

const updatePaciente = async function (req, res) {
  try {
    const { id } = req.params;
    const { nombre, apellido, dni, fecha_nacimiento, email, telefono } = req.body;

    const result = await pool.query(
      `UPDATE pacientes SET nombre = $1, apellido = $2, dni = $3, fecha_nacimiento = $4, email = $5, telefono = $6 WHERE id = $7`,
      [nombre, apellido, dni, fecha_nacimiento, email, telefono, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.json({ message: 'Paciente actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el paciente' });
  }
}

const deletePaciente = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pacientes WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el paciente' });
  }
}

module.exports = {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};