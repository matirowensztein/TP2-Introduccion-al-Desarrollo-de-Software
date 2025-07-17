const listaPacientes = document.getElementById("pacientes-list");
const formCrearPaciente = document.getElementById("form-crear-paciente");
const formEditarPaciente = document.getElementById("form-editar-paciente");
const cargarPacientesButton = document.getElementById("pacientesButton");
const inputId = document.getElementById("inputNumerico");
const modalCrearPaciente = document.getElementById("modal-crear-paciente");
const modalEditarPaciente = document.getElementById("modal-editar-paciente");
const modalEliminarPaciente = document.getElementById("modal-eliminar-paciente");
const ceroPacientes = document.getElementById("cero-pacientes");
const eliminarButton = document.getElementById("confirmar-eliminar");
const modalDniExiste = document.getElementById("modal-dni-existe");

  let fecha = new Date();
  fecha.setDate(fecha.getDate());
  let fechaMax = fecha.toISOString().split('T');
  document.getElementById("crear-fecha").max = fechaMax[0];
  document.getElementById("editar-fecha").max = fechaMax[0];

const API_BASE = "http://localhost:8080";

function mostrarModal(modal) {
  modal.style.display = "flex";
}
function ocultarModal(modal) {
  modal.style.display = "none";
}

async function mostrarPacientes(pacientes) {
  try {
    if (pacientes.length === 0) {
      listaPacientes.innerHTML = "";
      ceroPacientes.style.display = "flex";
      return;
    }
    ceroPacientes.style.display = "none";
    let html = "";

    pacientes.forEach((paciente) => {
      html += `
        <div class="card">
          <p><strong>Id:</strong> ${paciente.id}</p>
          <p><strong>Nombre:</strong> ${paciente.nombre}</p>
          <p><strong>Apellido:</strong> ${paciente.apellido}</p>
          <p><strong>DNI:</strong> ${paciente.dni}</p>
          <p><strong>Fecha de nacimiento:</strong> ${paciente.fecha_nacimiento.slice(0, 10)}</p>
          <p><strong>Email:</strong> ${paciente.email}</p>
          <p><strong>Teléfono:</strong> ${paciente.telefono}</p>
          <div class="buttons-card">
            <button onclick='cargarPacienteEnFormularioEditar(${JSON.stringify(paciente)})'>
              Editar
            </button>
            <button onclick='abrirModalEliminarPaciente(${paciente.id})'>
              Eliminar
            </button>
          </div>
        </div>
      `;
    });

    listaPacientes.innerHTML = html;
  } catch (error) {
    console.error(error);
    alert("Error al cargar pacientes");
  }
}

async function cargarTodos() {
  try {
    const response = await fetch(`${API_BASE}/pacientes`);
    const pacientes = await response.json();
    mostrarPacientes(pacientes);
  } catch (error) {
    console.error(error);
    alert("Error al cargar pacientes");
  }
}

async function cargarPorId(id) {
  try {
    const res = await fetch(`${API_BASE}/pacientes/${id}`);
    if (res.status === 404) {
      mostrarPacientes([]);
      return;
    }
    if (!res.ok) throw new Error("Error al obtener paciente");
    const paciente = await res.json();
    mostrarPacientes([paciente]);
  } catch (error) {
    console.error(error);
    alert("Error al cargar paciente");
  }
}

cargarPacientesButton.addEventListener("click", () => {
  const id = inputId.value.trim();
  if (id === "") {
    cargarTodos();
  } else {
    cargarPorId(id);
  }
});

function abrirModalEliminarPaciente(id) {
  mostrarModal(modalEliminarPaciente);
  eliminarButton.onclick = () => {
    eliminarPaciente(id);
    ocultarModal(modalEliminarPaciente);
  };
}

async function eliminarPaciente(id) {
  try {
    const res = await fetch(`${API_BASE}/pacientes/${id}`, { method: "DELETE" });
    if (res.status === 404) {
      alert("Paciente no encontrado");
      return;
    }
    if (!res.ok) throw new Error("Error al eliminar paciente");
    cargarTodos();
  } catch (error) {
    console.error(error);
    alert("Error al eliminar paciente");
  }
}

function cargarPacienteEnFormularioEditar(paciente) {
  mostrarModal(modalEditarPaciente);
  document.getElementById("editar-id").value = paciente.id;
  document.getElementById("editar-nombre").value = paciente.nombre;
  document.getElementById("editar-apellido").value = paciente.apellido;
  document.getElementById("editar-dni").value = paciente.dni;
  document.getElementById("editar-fecha").value = paciente.fecha_nacimiento.slice(0, 10);
  document.getElementById("editar-email").value = paciente.email || "";
  document.getElementById("editar-tel").value = paciente.telefono || "";
}

formCrearPaciente.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("crear-nombre").value.trim();
  const apellido = document.getElementById("crear-apellido").value.trim();
  const dni = document.getElementById("crear-dni").value.trim();
  const fecha_nacimiento = document.getElementById("crear-fecha").value;
  const email = document.getElementById("crear-email").value.trim();
  const telefono = document.getElementById("crear-tel").value.trim();

  try {
    const res = await fetch(`${API_BASE}/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, dni, fecha_nacimiento, email, telefono }),
    });
    

    if (res.status === 409) {
      mostrarModalDniExiste();
      return;
    }

    if (!res.ok) throw new Error("Error en la creación");

    formCrearPaciente.reset();
    ocultarModal(modalCrearPaciente);
    cargarTodos();
  } catch (error) {
    console.log(error);
  }
});

formEditarPaciente.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editar-id").value.trim();
  const nombre = document.getElementById("editar-nombre").value.trim();
  const apellido = document.getElementById("editar-apellido").value.trim();
  const dni = document.getElementById("editar-dni").value.trim();
  const fecha_nacimiento = document.getElementById("editar-fecha").value;
  const email = document.getElementById("editar-email").value.trim();
  const telefono = document.getElementById("editar-tel").value.trim();

  try {
    const res = await fetch(`${API_BASE}/pacientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, dni, fecha_nacimiento, email, telefono }),
    });

    if (res.status === 404) {
      alert("Paciente no encontrado");
      return;
    }

    if (res.status === 409) {
      ocultarModal(modalEditarPaciente);
      mostrarModalDniExiste();
      return;
    }


    if (!res.ok) throw new Error("Error al actualizar paciente");

    ocultarModal(modalEditarPaciente);
    formEditarPaciente.reset();
    cargarTodos();
  } catch (error) {
    console.log(error);
  }
});

function AbrirModalAgregarPaciente() {
  mostrarModal(modalCrearPaciente);
}

function CerrarModalAgregarPaciente() {
  ocultarModal(modalCrearPaciente);
}

function CerrarModalEditarPaciente() {
  ocultarModal(modalEditarPaciente);
}

function CerrarModalEliminarPaciente() {
  ocultarModal(modalEliminarPaciente);
}

function mostrarModalDniExiste() {
  mostrarModal(modalDniExiste)
}
function cerrarModalDniExiste() {
  ocultarModal(modalDniExiste)
}

cargarTodos();
