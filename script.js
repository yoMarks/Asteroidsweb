const iniciar = document.getElementById("iniciar");
const menu = document.getElementById("menu");
const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");


const estadoTecla = {
  izq: false,
  der: false
};

// objeto nave, pensar si mi nave se trabajara funcinal o objetos, avanzar hasta disparos y rotacion 360(frame algo y loop)
const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0,
  velocidadRotacion: 0.06
};

//mantiene loop inactivo
let juegoActivo = false;

function pintarfondo() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarNave() {
  ctx.save();
  ctx.translate(nave.x, nave.y);
  ctx.rotate(nave.angulo);

  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(-15, -10);
  ctx.lineTo(-15, 10);
  ctx.closePath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function actualizarNave() {
  if (estadoTecla.izq) nave.angulo -= nave.velocidadRotacion;
  if (estadoTecla.der) nave.angulo += nave.velocidadRotacion;
}

function loopJuego() {
  if (!juegoActivo) return;

  actualizarNave();
  pintarfondo();
  dibujarNave();

  requestAnimationFrame(loopJuego); //rotacion continua, juego se repite 60veces por segundo
}

// function render() {
//   pintarfondo();
//   dibujarNave();
// }

iniciar.addEventListener("click", () => {
  menu.style.display = "none";
  canvas.style.display = "block";
  juegoActivo = true;
  loopJuego();
  // render();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") estadoTecla.izq = true;
  if (e.key === "ArrowRight") estadoTecla.der = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") estadoTecla.izq = false;
  if (e.key === "ArrowRight") estadoTecla.der = false;
});