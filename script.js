const iniciar = document.getElementById("iniciar");
const menu = document.getElementById("menu");
const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");

const estadoTecla = {
  izq: false,
  der: false
};

const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0,
  velocidadRotacion: 0.04
};

//mantiene loop inactivo
let asteroides = [];
let balas = [];
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

function disparar(){
  balas.push({
    x: nave.x + Math.cos(nave.angulo) * 20,
    y: nave.y + Math.sin(nave.angulo) * 20,
    dx: Math.cos(nave.angulo) * 5,
    dy: Math.sin(nave.angulo) * 5,
    atenuacion: 100
  });
}

function actualizarDisparo(){
  balas.forEach((bala) => {
    bala.x += bala.dx;
    bala.y += bala.dy;
    bala.atenuacion--;
  });

  balas = balas.filter((bala) =>
    bala.atenuacion > 0 &&
    bala.x >= 0 &&
    bala.x <= canvas.width &&
    bala.y >= 0 &&
    bala.y <= canvas.height
  );
}

function dibujarBala(){
  balas.forEach((bala) =>{
    const opacidad = bala.atenuacion / 100;
    ctx.beginPath();
    ctx.arc(bala.x, bala.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`;
    ctx.fill();
  });
}

function crearAsteroide(){
  asteroides.push({
    x:Math.random() * canvas.width,
    y:Math.random() * canvas.height,
    dx:(Math.random()-0.5)*2,
    dy:(Math.random()-0.5)*2,
    radio: 30
  });
}

function actualizarAsteroide() {
  asteroides.forEach((ast) => {
    ast.x += ast.dx;
    ast.y += ast.dy;
  });
}

function dibujarAsteroide() {
  asteroides.forEach((ast) => {
    ctx.beginPath();
    ctx.arc(ast.x, ast.y, ast.radio, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.stroke();
  });
}

function loopJuego() {
  if (!juegoActivo) return;
  actualizarNave();
  actualizarDisparo();
  actualizarAsteroide();
  verificarColisionesBalasAsteroides();
  pintarfondo();
  dibujarNave();
  dibujarBala();
  dibujarAsteroide();
  requestAnimationFrame(loopJuego); //rotacion continua, juego se repite 60veces por segundo
}

function detectarColisionAsteroide(x1, y1, r1, x2, y2, r2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const distancia = Math.sqrt(dx * dx + dy * dy);

  return distancia < r1 + r2;
}
function verificarColisionesBalasAsteroides() {
  for (let i = balas.length - 1; i >= 0; i--) {
    for (let j = asteroides.length - 1; j >= 0; j--) {
      const bala = balas[i];
      const ast = asteroides[j];

      const colision = detectarColisionAsteroide(
        bala.x, bala.y, 3,
        ast.x, ast.y, ast.radio
      );

      if (colision) {
        balas.splice(i, 1);
        asteroides.splice(j, 1);
        break;
      }
    }
  }
}


iniciar.addEventListener("click", () => {
  menu.style.display = "none";
  canvas.style.display = "block";
  juegoActivo = true;
  for (let i = 0; i < 10; i++) {
    crearAsteroide();
  }
  loopJuego();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") estadoTecla.izq = true;
  if (e.key === "ArrowRight") estadoTecla.der = true;
  if (e.code === "Space" && juegoActivo && !e.repeat){
    disparar();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") estadoTecla.izq = false;
  if (e.key === "ArrowRight") estadoTecla.der = false;
});