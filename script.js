const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let Pblur = 80

let planetTrail = [];
const MAX_TRAIL_LENGTH = 45; 

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

let showVelocityVector = true;
let showAccelerationVector = true;

let startMass = 200;
let startVelocity = 1;
let startX = 200;

function update() {
  let dx = sun.x - planet.x
  let dy = sun.y - planet.y
  let distance = Math.sqrt(dx * dx + dy * dy)
  Pblur = 80 - distance / 1.25
  let force = sun.mass / (distance * distance)

  planet.ax = (force * dx) / distance
  planet.ay = (force * dy) / distance

  planet.vx += planet.ax
  planet.vy += planet.ay

  planet.x += planet.vx
  planet.y += planet.vy

  planetTrail.push({ x: planet.x, y: planet.y });
  
  if (planetTrail.length > MAX_TRAIL_LENGTH) {
    planetTrail.shift();
  }
}

function drawOrbitPrediction() {
  ctx.save();
  ctx.strokeStyle = 'rgb(255, 183, 27)';
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

    if (distance < 10) break; 

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
  ctx.fillStyle = '#050505'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (animationId === null) {
    drawOrbitPrediction();
  }

  if (planetTrail.length > 1) {
    ctx.save();
    ctx.lineWidth = 4; // Grubość ogona
    
    for (let i = 1; i < planetTrail.length; i++) {
      ctx.beginPath();
      ctx.moveTo(planetTrail[i - 1].x, planetTrail[i - 1].y);
      ctx.lineTo(planetTrail[i].x, planetTrail[i].y);
      
      let alpha = i / planetTrail.length * 0.4; 
      ctx.strokeStyle = `rgba(245, 39, 32, ${alpha})`;
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.beginPath()
  ctx.shadowBlur = 20
  ctx.shadowColor = '#ffb62e'
  ctx.arc(sun.x, sun.y, 22, 0, Math.PI * 2)
  ctx.fillStyle = '#ffad16'
  ctx.fill()
  ctx.closePath()
  ctx.shadowBlur = 0

  ctx.beginPath()
  ctx.shadowBlur = Pblur
  ctx.shadowColor = '#ff6d40'
  ctx.arc(planet.x, planet.y, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#f52720'
  ctx.fill()
  ctx.closePath()
  ctx.shadowBlur = 0

if (showVelocityVector) {
    ctx.shadowBlur = 0
    let scaleV = 30; 
    let targetX = planet.x + (planet.vx * scaleV);
    let targetY = planet.y + (planet.vy * scaleV);
    drawArrow(planet.x, planet.y, targetX, targetY, '#f52720', 1.5);
  }

  if (showAccelerationVector) {
    ctx.shadowBlur = 0
    let scaleA = 200;
    let targetX = planet.x + (planet.ax * scaleA);
    let targetY = planet.y + (planet.ay * scaleA);
    drawArrow(planet.x, planet.y, targetX, targetY, '#0066ff', 1.5);
  }
}

let animationId = null

function drawArrow(fromX, fromY, toX, toY, color, thickness = 1) {
  const headLength = 10; 
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = thickness;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
  ctx.fill();
}

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
planetTrail = [];
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
planetTrail = [];
  
  sun.mass = startMass;
  planet.x = sun.x + startX;
  planet.y = sun.y;
  planet.vx = 0;
  planet.vy = startVelocity;

  loop();
}

setTimeout(values, 100);


function toggleMenu() {
  const sidebar = document.getElementById('infoSidebar');
  sidebar.classList.toggle('active');
}

function toggleVectors() {
  showVelocityVector = document.getElementById('velCheck').checked;
  showAccelerationVector = document.getElementById('accCheck').checked;
}