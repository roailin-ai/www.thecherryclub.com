// ===============================
// 🍒 THE CHERRY CLUB - SCRIPT.JS
// ===============================

// ===== VARIABLES GLOBALES =====
let carrito = [];
let total = 0;

// ===============================
// 🛒 AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(nombre, precio, idCantidad){
  let cantidad = parseInt(document.getElementById(idCantidad).value);

  carrito.push({
    nombre: nombre,
    precio: precio,
    cantidad: cantidad
  });

  let lista = document.getElementById("lista-carrito");

  let item = document.createElement("li");
  item.textContent = `${nombre} x${cantidad} - $${precio * cantidad}`;
  lista.appendChild(item);

  total += precio * cantidad;
  document.getElementById("total").textContent = total;

  contarProductos();
}

// ===============================
// 🧹 VACIAR CARRITO
// ===============================
function vaciarCarrito(){
  carrito = [];
  total = 0;
  document.getElementById("lista-carrito").innerHTML = "";
  document.getElementById("total").textContent = 0;

  let badge = document.getElementById("contador-carrito");
  if(badge) badge.textContent = 0;
}

// ===============================
// 🔢 CONTADOR DE PRODUCTOS
// ===============================
function contarProductos(){
  let contador = carrito.reduce((acc,prod)=> acc + prod.cantidad, 0);
  let badge = document.getElementById("contador-carrito");
  if(badge) badge.textContent = contador;
}

// ===============================
// 📲 WHATSAPP CHECKOUT
// ===============================
function finalizarCompra(){
  if(carrito.length === 0){
    alert("El carrito está vacío 🛒");
    return;
  }

  let mensaje = "Hola! Quiero comprar:%0A%0A";

  carrito.forEach(prod => {
    mensaje += `• ${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad}%0A`;
  });

  mensaje += `%0A💰 Total: $${total}`;

  // 📲 TU NÚMERO (solo acá)
  let telefono = "5492604204573"; 

  let url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank");
}

// ===============================
// 📂 MENÚ LATERAL
// ===============================
function toggleMenu(){
  document.getElementById("menu").classList.toggle("activo");
}

// ===============================
// 🛍️ CARRITO LATERAL
// ===============================
function toggleCarrito(){
  document.querySelector(".carrito").classList.toggle("activo");
}

// ===============================
// 🔍 BUSCADOR DE PRODUCTOS
// ===============================
function buscarProducto(){
  let input = document.getElementById("buscador").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card=>{
    let nombre = card.querySelector("h4").textContent.toLowerCase();
    if(nombre.includes(input)){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }
  });
}

// ===============================
// 🧩 FILTROS POR CATEGORÍA
// ===============================
function filtrarCategoria(categoria){
  let cards = document.querySelectorAll(".card");

  cards.forEach(card=>{
    if(card.classList.contains(categoria)){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }
  });
}

// ===============================
// 🎁 SLIDER "ELEGÍ EL REGALO PERFECTO ACÁ"
// ===============================
let indexSlide = 0;

function sliderRegalos(){
  let slides = document.querySelectorAll("#sliderRegalos .slide");

  slides.forEach(slide => slide.style.display = "none");

  indexSlide++;
  if(indexSlide > slides.length){ indexSlide = 1 }

  slides[indexSlide - 1].style.display = "block";
}

setInterval(sliderRegalos, 3000); // cada 3 segundos

// ===============================
// ✨ ANIMACIONES UI
// ===============================
function animarBoton(btn){
  btn.classList.add("animado");
  setTimeout(()=>{
    btn.classList.remove("animado");
  },300);
}
