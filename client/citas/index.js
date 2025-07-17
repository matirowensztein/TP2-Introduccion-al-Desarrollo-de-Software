const listaCitas = document.getElementById("citas-list");
const formCrearCita = document.getElementById("form-crear-cita");
const formEditarCita = document.getElementById("form-editar-cita");
const modalCrearCita = document.getElementById("modal-crear-cita");
const modalEditarCita = document.getElementById("modal-editar-cita");
const modalInfoPaciente = document.getElementById("modal-info-paciente");
const modalInfoMedico = document.getElementById("modal-info-medico");
const modalEliminarCita = document.getElementById("modal-eliminar-cita");
const botonConfirmarEliminarCita = document.getElementById(
  "confirmar-eliminar-cita"
);
const cargarCitasButton = document.getElementById("citasButton");
const inputIdCita = document.getElementById("inputNumerico");
const ceroCitas = document.getElementById("cero-citas");

let fecha = new Date();
fecha.setDate(fecha.getDate()+1);
let fechaMin = fecha.toISOString().split(':');
fechaMin.pop();
fechaMin=fechaMin.join(':');
document.getElementById("crear-fecha").min = fechaMin;
document.getElementById("editar-fecha").min = fechaMin;

const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:8080"
  : "https://tp2-backend-ids.onrender.com";


function mostrarModal(modal) {
  modal.style.display = "flex";
}

function ocultarModal(modal) {
  modal.style.display = "none";
}

function AbrirModalCrearCita() {
  mostrarModal(modalCrearCita);
}

function CerrarModalCrearCita() {
  ocultarModal(modalCrearCita);
}

function AbrirModalEditarCita() {
  mostrarModal(modalEditarCita);
}

function CerrarModalEditarCita() {
  ocultarModal(modalEditarCita);
}

function AbrirModalInfoPaciente() {
  mostrarModal(modalInfoPaciente);
}

function CerrarModalInfoPaciente() {
  ocultarModal(modalInfoPaciente);
}

function AbrirModalInfoMedico() {
  mostrarModal(modalInfoMedico);
}

function CerrarModalInfoMedico() {
  ocultarModal(modalInfoMedico);
}

function abrirModalEliminarCita(id) {
  mostrarModal(modalEliminarCita);
  botonConfirmarEliminarCita.onclick = () => {
    eliminarCitaConfirmado(id);
    ocultarModal(modalEliminarCita);
  };
}

function CerrarModalEliminarCita() {
  ocultarModal(modalEliminarCita);
}

async function mostrarCitas(citas) {
  if (citas.length === 0) {
    ceroCitas.style.display = "flex";
    listaCitas.innerHTML = "";
    return;
  }

  ceroCitas.style.display = "none";

  const { pacientes, medicos } = await cargarOpciones();

  const pacientesPorId = {};
  pacientes.forEach((p) => (pacientesPorId[p.id] = p));

  const medicosPorId = {};
  medicos.forEach((m) => (medicosPorId[m.id] = m));

  let html = "";

  citas.forEach((cita) => {
    const paciente = pacientesPorId[cita.paciente_id];
    const medico = medicosPorId[cita.medico_id];

    html += `
      <div class="card">
        <p><strong>ID:</strong> ${cita.id}</p>
        <p><strong>Paciente:</strong> ${
          paciente ? `${paciente.nombre} ${paciente.apellido}` : "Desconocido"
        }</p>
        <p><strong>Médico:</strong> ${
          medico ? `${medico.nombre} ${medico.apellido}` : "Desconocido"
        }</p>
        <p><strong>Fecha y hora:</strong> ${new Date(
          cita.fecha_hora
        ).toLocaleString()}</p>
        <p><strong>Motivo:</strong> ${cita.motivo}</p>
        <p><strong>Estado:</strong> ${cita.estado}</p>
        <p><strong>Observaciones:</strong> ${cita.observaciones || "N/A"}</p>
        <div class="buttons-card">
          <button onclick='cargarCitaEnFormularioEditar(${JSON.stringify(
            cita
          )})'>Editar</button>
          <button onclick='abrirModalEliminarCita(${cita.id})'>Eliminar</button>
          <button onclick='verInfoPaciente(${JSON.stringify(
            paciente
          )})'>Ver info paciente</button>
          <button onclick='verInfoMedico(${JSON.stringify(
            medico
          )})'>Ver info médico</button>
        </div>
      </div>
      `;

    listaCitas.innerHTML = html;
  });
}

async function cargarCitas() {
  try {
    const res = await fetch(`${API_BASE}/citas`);
    if (!res.ok) throw new Error("Error al obtener citas");
    const citas = await res.json();
    mostrarCitas(citas);
  } catch (error) {
    console.error(error);
    alert("Error al cargar citas");
  }
}

async function cargarCitaPorId(id) {
  try {
    const res = await fetch(`${API_BASE}/citas/${id}`);

    if (res.status === 404) {
      mostrarCitas([]);
      return;
    }

    if (!res.ok) throw new Error("Error al obtener cita");

    const cita = await res.json();
    mostrarCitas([cita]);
  } catch (error) {
    console.error(error);
    alert("Error al cargar cita");
  }
}

cargarCitasButton.addEventListener("click", () => {
  const id = inputIdCita.value.trim();
  if (id === "") {
    cargarCitas();
  } else {
    cargarCitaPorId(id);
  }
});

async function eliminarCitaConfirmado(id) {
  try {
    const res = await fetch(`${API_BASE}/citas/${id}`, {
      method: "DELETE",
    });

    if (res.status === 404) {
      alert("Cita no encontrada");
      return;
    }

    if (!res.ok) throw new Error("Error al eliminar cita");

    cargarCitas();
  } catch (error) {
    console.error(error);
    alert("Error al eliminar cita");
  }
}

function verInfoPaciente(paciente) {
  if (!paciente) return alert("Paciente no disponible");
  const infoPacienteDiv = document.getElementById("info-paciente");
  infoPacienteDiv.innerHTML = `
    <p><strong>Id:</strong> ${paciente.id}</p>
    <p><strong>Nombre:</strong> ${paciente.nombre}</p>
    <p><strong>Apellido:</strong> ${paciente.apellido}</p>
    <p><strong>DNI:</strong> ${paciente.dni}</p>
    <p><strong>Fecha de nacimiento:</strong> ${paciente.fecha_nacimiento.slice(0,10)}</p>
    <p><strong>Email:</strong> ${paciente.email}</p>
    <p><strong>Teléfono:</strong> ${paciente.telefono}</p>
  `;
  AbrirModalInfoPaciente();
}

function verInfoMedico(medico) {
  if (!medico) return alert("Médico no disponible");
  const infoMedicoDiv = document.getElementById("info-medico");
  infoMedicoDiv.innerHTML = `
    <p><strong>Id:</strong> ${medico.id}</p>
    <p><strong>Nombre:</strong> ${medico.nombre}</p>
    <p><strong>Apellido:</strong> ${medico.apellido}</p>
    <p><strong>Especialidad:</strong> ${medico.especialidad}</p>
    <p><strong>Matrícula:</strong> ${medico.matricula_profesional}</p>
    <p><strong>Email:</strong> ${medico.email}</p>
    <p><strong>Teléfono:</strong> ${medico.telefono}</p>
  `;
  AbrirModalInfoMedico();
}

async function cargarOpciones() {
  const pacientesResponse = await fetch(`${API_BASE}/pacientes`);
  const medicosResponse = await fetch(`${API_BASE}/medicos`);

  const pacientes = await pacientesResponse.json();
  const medicos = await medicosResponse.json();

  const crearPaciente = document.getElementById("crear-paciente");
  const crearMedico = document.getElementById("crear-medico");
  const editarPaciente = document.getElementById("editar-paciente");
  const editarMedico = document.getElementById("editar-medico");

  const pacientesOptions =
    `<option value="" disabled selected>Elegir paciente</option>` +
    pacientes.map((p) => `<option value="${p.id}">${p.nombre} ${p.apellido}</option>`).join("");

  const medicosOptions =
    `<option value="" disabled selected>Elegir médico</option>` +
    medicos.map((m) => `<option value="${m.id}">${m.nombre} ${m.apellido}</option>`).join("");

  [crearPaciente, editarPaciente].forEach((select) => {
    select.innerHTML = pacientesOptions;
  });

  [crearMedico, editarMedico].forEach((select) => {
    select.innerHTML = medicosOptions;
  });

  return { pacientes, medicos };
}

formCrearCita.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevaCita = {
    paciente_id: document.getElementById("crear-paciente").value,
    medico_id: document.getElementById("crear-medico").value,
    fecha_hora: document.getElementById("crear-fecha").value,
    motivo: document.getElementById("crear-motivo").value,
    estado: document.getElementById("crear-estado").value,
    observaciones: document.getElementById("crear-observaciones").value,
  };

  try {
    const res = await fetch(`${API_BASE}/citas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaCita),
    });

    if (!res.ok) throw new Error("Error al crear cita");

    formCrearCita.reset();
    CerrarModalCrearCita();
    cargarCitas();
  } catch (error) {
    console.error(error);
    alert("Error al crear cita");
  }
});

formEditarCita.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editar-id").value;

  const citaActualizada = {
    paciente_id: document.getElementById("editar-paciente").value,
    medico_id: document.getElementById("editar-medico").value,
    fecha_hora: document.getElementById("editar-fecha").value,
    motivo: document.getElementById("editar-motivo").value,
    estado: document.getElementById("editar-estado").value,
    observaciones: document.getElementById("editar-observaciones").value,
  };

  try {
    const res = await fetch(`${API_BASE}/citas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(citaActualizada),
    });

    if (res.status === 404) {
      alert("Cita no encontrada");
      return;
    }

    if (!res.ok) throw new Error("Error al editar cita");

    formEditarCita.reset();
    CerrarModalEditarCita();
    cargarCitas();
  } catch (error) {
    console.error(error);
    alert("Error al editar cita");
  }
});

function cargarCitaEnFormularioEditar(cita) {
  document.getElementById("editar-id").value = cita.id;
  document.getElementById("editar-fecha").value = cita.fecha_hora.slice(0, 16);
  document.getElementById("editar-motivo").value = cita.motivo;
  document.getElementById("editar-estado").value = cita.estado;
  document.getElementById("editar-observaciones").value =
    cita.observaciones || "";
  document.getElementById("editar-paciente").value = cita.paciente_id;
  document.getElementById("editar-medico").value = cita.medico_id;
  AbrirModalEditarCita();
}

cargarOpciones();
cargarCitas();