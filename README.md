# 🩺 TP2 - Introducción al Desarrollo de Software

## 👥 Hecho por
- **Matías Rowensztein**
- **Alejo Ilan Segal**

## 📄 Descripción

Este proyecto simula el funcionamiento de un consultorio médico, donde podés gestionar pacientes, médicos y citas. Permite **agregar, obtener, editar y eliminar** estos datos, facilitando cómo se agendan citas entre pacientes y médicos.

🔗 **Despliegue online:**  
[tp2-front-ids.onrender.com](https://tp2-front-ids.onrender.com)

## 🚀 Ejecución del proyecto

### 1️⃣ Clonar el repositorio

Cloná el repositorio para ejecutarlo localmente. En tu terminal, ejecutá:

```bash
git clone https://github.com/matirowensztein/TP2-Introduccion-al-Desarrollo-de-Software.git
cd TP2-Introduccion-al-Desarrollo-de-Software

  ```
<img width="1576" height="440" alt="image" src="https://github.com/user-attachments/assets/f881f653-7f6a-4e77-9721-8493f0199f0c" />
<img width="1530" height="342" alt="image" src="https://github.com/user-attachments/assets/fc6ac182-7d09-4695-9620-893500ffb30b" />

### 2️⃣ Levantar el proyecto con Docker

Asegurate de tener **Docker** instalado.

Luego, iniciá el proyecto con:
  ```bash
  docker-compose up -d
  ```
<img width="1587" height="356" alt="image" src="https://github.com/user-attachments/assets/84768b43-ad98-4264-8a96-a36b5e2ad1ef" />


  
### 3️⃣ Acceder a la aplicación

Una vez iniciado, accedé desde tu navegador a:

  ```bash
  http://localhost:3000/index.html
  ```

Ya desde aca, podés elegir si querés gestionar **pacientes**, **médicos** o **citas**.  
Podés acceder a cada sección fácilmente desde el **navbar** disponible en todas las páginas, o también desde la raíz del proyecto en el frontend.

<img width="1915" height="958" alt="image" src="https://github.com/user-attachments/assets/7e743c4a-4f4b-40a3-992e-8d130fe00d15" />

## 👤 Gestión de pacientes

En la vista de **pacientes** podés gestionar todos los pacientes del sistema.  
Desde esta sección es posible:

- **Agregar** nuevos pacientes
- **Buscar** pacientes por su ID
- **Editar** la información de los pacientes existentes
- **Eliminar** pacientes del sistema

<img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/4a2c0690-82c5-4d18-a0e2-1a4d717b2785" />

## 🩺 Gestión de médicos

En la vista de **médicos** podés gestionar todos los médicos registrados en el sistema.  
Desde esta sección es posible:

- **Agregar** nuevos médicos
- **Buscar** médicos por su ID
- **Editar** la información de los médicos existentes
- **Eliminar** médicos del sistema

<img width="1918" height="866" alt="image" src="https://github.com/user-attachments/assets/146c296f-eaaa-4fba-88cd-36a99b179caf" />

---

## 📅 Gestión de citas

En la vista de **citas** podés gestionar todas las citas agendadas en el sistema.  
Desde esta sección es posible:

- **Agregar** nuevas citas  
  > *Para poder agregar una cita, es necesario que exista al menos un paciente y un médico en el sistema.*
- **Buscar** citas por su ID
- **Editar** la información de las citas existentes
- **Eliminar** citas del sistema
- **Ver la información** del paciente y del médico vinculados a cada cita

<img width="1918" height="868" alt="image" src="https://github.com/user-attachments/assets/35606c60-00aa-4e07-a917-75a8b0b4b51f" />
