const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let Pblur = 100

let sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  mass: 200,
}

let planet = {
  x: sun.x + 200,
  y: sun.y,
  vx: 0,
  vy: 1.2,
  mass: 1,
}

let startMass = 200;
let startVelocity = 1;
let startX = 200;

function update() {
  let dx = sun.x - planet.x
  let dy = sun.y - planet.y
  let distance = Math.sqrt(dx * dx + dy * dy)
  Pblur = 100 - distance / 1.25
  let force = sun.mass / (distance * distance)

  let ax = (force * dx) / distance
  let ay = (force * dy) / distance

  planet.vx += ax
  planet.vy += ay

  planet.x += planet.vx
  planet.y += planet.vy
}

function drawOrbitPrediction() {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 187, 0, 0.61)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 6]);

  let vPlanet = {
    x: sun.x + startX,
    y: sun.y,
    vx: 0,
    vy: startVelocity
  };

  ctx.beginPath();
  ctx.moveTo(vPlanet.x, vPlanet.y);

  for (let i = 0; i < 2000; i++) {
    let dx = sun.x - vPlanet.x;
    let dy = sun.y - vPlanet.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20) break; 

    let force = startMass / (distance * distance);
    let ax = (force * dx) / distance;
    let ay = (force * dy) / distance

    vPlanet.vx += ax;
    vPlanet.vy += ay;
    vPlanet.x += vPlanet.vx;
    vPlanet.y += vPlanet.vy;

    ctx.lineTo(vPlanet.x, vPlanet.y);
  }

  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.fillStyle = '#07070750'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.beginPath()
  ctx.shadowBlur = 20
  ctx.shadowColor = '#ffd000'
  ctx.arc(sun.x, sun.y, 22, 0, Math.PI * 2)
  ctx.fillStyle = '#ffdd47'
  ctx.fill()
  ctx.closePath()
  ctx.shadowBlur = 0

  ctx.beginPath()
  ctx.shadowBlur = Pblur
  ctx.shadowColor = '#b83726'
  ctx.arc(planet.x, planet.y, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#df3832'
  ctx.fill()
  ctx.closePath()
  ctx.shadowBlur = 0
}

let animationId = null

function loop() {
  update()
  draw()
  animationId = requestAnimationFrame(loop)
}

function stopLoop() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function values() {
  stopLoop();

  startMass = Number(document.getElementById('sunMass').value);
  startVelocity = Number(document.getElementById('planetVelocity').value);
  startX = Number(document.getElementById('planetX').value);

  document.getElementById('sunMassValue').innerText = startMass;
  document.getElementById('planetVelocityValue').innerText = startVelocity;
  document.getElementById('planetXValue').innerText = startX;

  sun.mass = startMass;
  planet.x = sun.x + startX;
  planet.y = sun.y;
  planet.vx = 0;
  planet.vy = startVelocity;

  ctx.fillStyle = '#070707';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  drawOrbitPrediction();
  
  draw(); 
}

function startSimulation() {
  stopLoop(); 
  
  sun.mass = startMass;
  planet.x = sun.x + startX;
  planet.y = sun.y;
  planet.vx = 0;
  planet.vy = startVelocity;

  loop();
}

setTimeout(values, 100);