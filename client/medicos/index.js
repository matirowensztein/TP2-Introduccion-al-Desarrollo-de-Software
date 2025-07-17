const listaMedicos = document.getElementById("medicos-list");
const formCrearMedico = document.getElementById("form-crear-medico");
const formEditarMedico = document.getElementById("form-editar-medico");
const modalCrear = document.getElementById("modal-crear-medico");
const modalEditar = document.getElementById("modal-editar-medico");
const modalEliminarMedico = document.getElementById("modal-eliminar-medico");
const botonConfirmarEliminarMedico = document.getElementById("confirmar-eliminar-medico");
const cargarMedicosButton = document.getElementById("medicosButton");
const inputId = document.getElementById("inputNumerico");
const ceroMedicos = document.getElementById("cero-medicos");
const modalMatriculaExiste = document.getElementById("modal-matricula-existe");

const API_BASE = "http://localhost:8080";

function mostrarModal(modal) {
  modal.style.display = "flex";
}

function ocultarModal(modal) {
  modal.style.display = "none";
}

function mostrarMedicos(medicos) {
  if (medicos.length === 0) {
    ceroMedicos.style.display = "flex";
    listaMedicos.innerHTML = "";
    return;
  }

  ceroMedicos.style.display = "none";
  let html = "";

  medicos.forEach((medico) => {
    html += `
      <div class="card">
        <p><strong>Id:</strong> ${medico.id}</p>
        <p><strong>Nombre:</strong> ${medico.nombre}</p>
        <p><strong>Apellido:</strong> ${medico.apellido}</p>
        <p><strong>Especialidad:</strong> ${medico.especialidad}</p>
        <p><strong>Matrícula:</strong> ${medico.matricula_profesional}</p>
        <p><strong>Email:</strong> ${medico.email}</p>
        <p><strong>Teléfono:</strong> ${medico.telefono}</p>
        <div class="buttons-card">
          <button onclick='cargarMedicoEnFormularioEditar(${JSON.stringify(medico)})'>Editar</button>
          <button onclick='abrirModalEliminarMedico(${medico.id})'>Eliminar</button>
        </div>
      </div>
    `;
  });

  listaMedicos.innerHTML = html;
}

async function cargarMedicos() {
  try {
    const response = await fetch(`${API_BASE}/medicos`);
    if (!response.ok) throw new Error("Error al obtener médicos");
    const medicos = await response.json();
    mostrarMedicos(medicos);
  } catch (error) {
    console.error(error);
    alert("Error al cargar médicos");
  }
}

async function cargarMedicoPorId(id) {
  try {
    const response = await fetch(`${API_BASE}/medicos/${id}`);

    if (response.status === 404) {
      mostrarMedicos([]);
      return;
    }

    if (!response.ok) throw new Error("Error al obtener médico");

    const medico = await response.json();
    mostrarMedicos([medico]);
  } catch (error) {
    console.error(error);
    alert("Error al cargar médico");
  }
}

cargarMedicosButton.addEventListener("click", () => {
  const id = inputId.value.trim();
  if (id === "") {
    cargarMedicos();
  } else {
    cargarMedicoPorId(id);
  }
});

function abrirModalEliminarMedico(id) {
  mostrarModal(modalEliminarMedico);
  botonConfirmarEliminarMedico.onclick = () => {
    eliminarMedicoConfirmado(id);
    ocultarModal(modalEliminarMedico);
  };
}

function CerrarModalEliminarMedico() {
  ocultarModal(modalEliminarMedico);
}

async function eliminarMedicoConfirmado(id) {
  try {
    const res = await fetch(`${API_BASE}/medicos/${id}`, {
      method: "DELETE",
    });

    if (res.status === 404) {
      alert("Médico no encontrado");
      return;
    }

    if (!res.ok) throw new Error("Error al eliminar médico");

    cargarMedicos();
  } catch (error) {
    console.error(error);
    alert("Error al eliminar médico");
  }
}

function cargarMedicoEnFormularioEditar(medico) {
  mostrarModal(modalEditar);
  document.getElementById("editar-id").value = medico.id;
  document.getElementById("editar-nombre").value = medico.nombre;
  document.getElementById("editar-apellido").value = medico.apellido;
  document.getElementById("editar-especialidad").value = medico.especialidad;
  document.getElementById("editar-matricula").value = medico.matricula_profesional;
  document.getElementById("editar-email").value = medico.email || "";
  document.getElementById("editar-tel").value = medico.telefono || "";
}

formCrearMedico.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("crear-nombre").value.trim();
  const apellido = document.getElementById("crear-apellido").value.trim();
  const especialidad = document.getElementById("crear-especialidad").value.trim();
  const matricula_profesional = document.getElementById("crear-matricula").value.trim();
  const email = document.getElementById("crear-email").value.trim();
  const telefono = document.getElementById("crear-tel").value.trim();

  try {
    const res = await fetch(`${API_BASE}/medicos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        apellido,
        especialidad,
        matricula_profesional,
        email,
        telefono,
      }),
    });

    if (res.status === 409) {
      mostrarModalMatriculaExiste();
      return;
    }

    if (!res.ok) throw new Error("Error en la creación");

    formCrearMedico.reset();
    CerrarModalAgregarMedico();
    cargarMedicos();
  } catch (error) {
    console.log(error);
  }
});

formEditarMedico.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editar-id").value.trim();
  const nombre = document.getElementById("editar-nombre").value.trim();
  const apellido = document.getElementById("editar-apellido").value.trim();
  const especialidad = document.getElementById("editar-especialidad").value.trim();
  const matricula_profesional = document.getElementById("editar-matricula").value.trim();
  const email = document.getElementById("editar-email").value.trim();
  const telefono = document.getElementById("editar-tel").value.trim();

  try {
    const res = await fetch(`${API_BASE}/medicos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        apellido,
        especialidad,
        matricula_profesional,
        email,
        telefono,
      }),
    });

    if (res.status === 409) {
      mostrarModalMatriculaExiste();
      return;
    }

    if (!res.ok) throw new Error("Error al actualizar médico");

    formEditarMedico.reset();
    CerrarModalEditarMedico();
    cargarMedicos();
  } catch (error) {
    console.log(error);
  }
});

function AbrirModalAgregarMedico() {
  mostrarModal(modalCrear);
}

function CerrarModalAgregarMedico() {
  ocultarModal(modalCrear);
}

function CerrarModalEditarMedico() {
  ocultarModal(modalEditar);
}
function mostrarModalMatriculaExiste() {
  mostrarModal(modalMatriculaExiste)
}
function cerrarModalMatriculaExiste() {
  ocultarModal(modalMatriculaExiste)
}

cargarMedicos();
