// ===============================
// 🍒 THE CHERRY CLUB - SCRIPT.JS
// ===============================

let carrito = [];
let total = 0;
let sliderIndex = 0;

// ===============================
// 🛒 AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(nombre, precio, idCantidad) {
  const inputCant = document.getElementById(idCantidad);
  const cantidad = inputCant ? parseInt(inputCant.value) || 1 : 1;

  const itemExistente = carrito.find(p => p.nombre === nombre);
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  renderizarCarrito();
}

// ===============================
// 🔄 RENDERIZAR CARRITO
// ===============================
function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  total = 0;

  carrito.forEach(prod => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.style.margin = "8px 0";
    li.textContent = `• ${prod.nombre} x${prod.cantidad} - $${subtotal}`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total;
  contarProductos();
}

// ===============================
// 🧹 VACIAR CARRITO
// ===============================
function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

// ===============================
// 🔢 CONTADOR DE PRODUCTOS (BADGE)
// ===============================
function contarProductos() {
  const contador = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  const badge = document.getElementById("contador-carrito");
  if (badge) badge.textContent = contador;
}

// ===============================
// 📲 WHATSAPP CHECKOUT
// ===============================
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío 🛒");
    return;
  }

  let mensaje = "Hola! Quiero realizar el siguiente pedido:%0A%0A";

  carrito.forEach(prod => {
    mensaje += `• ${prod.nombre} (x${prod.cantidad}) = $${prod.precio * prod.cantidad}%0A`;
  });

  mensaje += `%0A💰 Total a abonar: $${total}`;

  const telefono = "5492604204573";
  const url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank");
}

// ===============================
// 📂 MENÚ LATERAL Y OVERLAY
// ===============================
function toggleMenu() {
  const menu = document.getElementById("menu");
  const carritoEl = document.querySelector(".carrito");
  const overlay = document.getElementById("overlay");

  if (menu.classList.contains("activo")) {
    menu.classList.remove("activo");
    overlay.style.display = "none";
  } else {
    menu.classList.add("activo");
    carritoEl.classList.remove("activo");
    overlay.style.display = "block";
  }
}

function toggleCarrito() {
  const carritoEl = document.querySelector(".carrito");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");

  if (carritoEl.classList.contains("activo")) {
    carritoEl.classList.remove("activo");
    overlay.style.display = "none";
  } else {
    carritoEl.classList.add("activo");
    menu.classList.remove("activo");
    overlay.style.display = "block";
  }
}

function cerrarTodo() {
  const menu = document.getElementById("menu");
  const carritoEl = document.querySelector(".carrito");
  const overlay = document.getElementById("overlay");

  if (menu) menu.classList.remove("activo");
  if (carritoEl) carritoEl.classList.remove("activo");
  if (overlay) overlay.style.display = "none";
}

// ===============================
// 🔍 BUSCADOR DE PRODUCTOS
// ===============================
function buscarProducto() {
  const input = document.getElementById("buscador").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const nombre = card.querySelector("h4").textContent.toLowerCase();
    card.style.display = nombre.includes(input) ? "block" : "none";
  });
}

// ===============================
// 🧩 FILTROS POR CATEGORÍA
// ===============================
function filtrarCategoria(categoria) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (categoria === "todas" || card.classList.contains(categoria)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ===============================
// 🎞️ SLIDER DE IMÁGENES
// ===============================
function mostrarSlide(indice) {
  const slides = document.querySelectorAll('.slider-slide');
  if (slides.length === 0) return;

  slides.forEach(s => s.classList.remove('activo'));
  sliderIndex = (indice + slides.length) % slides.length;
  slides[sliderIndex].classList.add('activo');
}

function nextSlide() {
  mostrarSlide(sliderIndex + 1);
}

function prevSlide() {
  mostrarSlide(sliderIndex - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slider-slide');
  if (slides.length > 0) {
    mostrarSlide(0);
    setInterval(nextSlide, 4500);
  }
});
