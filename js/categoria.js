import { listarDatos, crearRegistro } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const nombreCategoria = document.querySelector("#nombre");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const data = { nombre: "" };

async function cargarCategorias() {
  const dataCategorias = await listarDatos("categoria", "idcategoria", "*");

  function mostrarCategorias() {
    const { data: categorias, error } = dataCategorias;
    if (error) {
      alert("Error al cargar las categorias");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    categorias.forEach((categoria) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="table__cell">${categoria.idcategoria}</td>
          <td class="table__cell">${categoria.nombre}</td>
          <td class="table__cell">
          <button class="table__button">
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/color/48/edit--v1.png"
              alt="edit--v1"
            />
          </button>
          <button class="table__button">
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/color/48/delete.png"
              alt="delete"
            />
          </button>
        </td>
      `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarCategorias();
}

cargarCategorias();

function limpiarFormulario() {
  nombreCategoria.value = "";
}

nombreCategoria.addEventListener("input", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;
}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { nombre } = data;
  if (nombre.trim() === "") {
    alert("El campo nombre no puede estar vacio");
    return;
  }

  btnAgregar.value = "Agregando...";
  const respuesta = await crearRegistro("categoria", data);
  if (respuesta.error) {
    alert("Error al agregar la categoria");
    mensajeAgregar.textContent = "Error al agregar la categoria";
    return;
  }
  btnAgregar.value = "Crear Categoria";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Categoria agregada correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarCategorias();
    limpiarFormulario();
    mensajeAgregar.textContent = "";
  }, 4000);
});
