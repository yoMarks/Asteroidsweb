const iniciar = document.getElementById("iniciar");
const menu = document.getElementById("menu");
const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");

const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0
};

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

function render() {
  pintarfondo();
  dibujarNave();
}

iniciar.addEventListener("click", () => {
  menu.style.display = "none";
  canvas.style.display = "block";
  render();
});