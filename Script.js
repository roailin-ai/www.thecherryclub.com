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
// 📂 MENÚ LATERAL Y CARRITO
// ===============================
function toggleMenu(){
  const menu = document.getElementById("menu");
  const carrito = document.querySelector(".carrito");
  const overlay = document.getElementById("overlay");

  if(menu.classList.contains("activo")){
    menu.classList.remove("activo");
    overlay.style.display = "none";
  } else {
    menu.classList.add("activo");
    carrito.classList.remove("activo");
    overlay.style.display = "block";
  }
}

function toggleCarrito(){
  const carrito = document.querySelector(".carrito");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");

  if(carrito.classList.contains("activo")){
    carrito.classList.remove("activo");
    overlay.style.display = "none";
  } else {
    carrito.classList.add("activo");
    menu.classList.remove("activo");
    overlay.style.display = "block";
  }
}

function cerrarTodo(){
  document.getElementById("menu").classList.remove("activo");
  document.querySelector(".carrito").classList.remove("activo");
  document.getElementById("overlay").style.display = "none";
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
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const track = document.getElementById('sliderTrack');

function updateSlider(){
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide(){
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide(){
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

/* autoplay */
setInterval(nextSlide, 4000);

/* swipe mobile */
let startX = 0;

track.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e=>{
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) nextSlide();
  if(endX - startX > 50) prevSlide();
});
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
