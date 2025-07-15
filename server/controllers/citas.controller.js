const { pool } = require("../db.js");

const getCitas = async function (req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM citas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las citas" });
  }
}

const getCitaById = async function (req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM citas WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la cita" });
  }
}

const createCita = async function (req, res) {
  try {
    const {
      paciente_id,
      medico_id,
      fecha_hora,
      motivo,
      estado,
      observaciones,
    } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO citas (paciente_id, medico_id, fecha_hora, motivo, estado, observaciones)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [paciente_id, medico_id, fecha_hora, motivo, estado, observaciones]
    );
    res.status(201).json({
      id: rows[0].id,
      paciente_id,
      medico_id,
      fecha_hora,
      motivo,
      estado,
      observaciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
}

const updateCita = async function (req, res) {
  try {
    const { id } = req.params;
    const {
      paciente_id,
      medico_id,
      fecha_hora,
      motivo,
      estado,
      observaciones,
    } = req.body;

    const result = await pool.query(
      `UPDATE citas
       SET paciente_id = $1, medico_id = $2, fecha_hora = $3, motivo = $4, estado = $5, observaciones = $6
       WHERE id = $7`,
      [paciente_id, medico_id, fecha_hora, motivo, estado, observaciones, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.json({ message: "Cita actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
}

const deleteCita = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM citas WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la cita" });
  }
} 

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita
};