const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let Pblur = 100

let sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  mass: 400,
}

let planet = {
  x: sun.x + 200,
  y: sun.y,
  vx: 0,
  vy: 1.2,
  mass: 1,
}

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

loop()

function reset() {
  planet.vx = 0
  planet.vy = 1
  planet.x = sun.x + 200
  planet.y = sun.y
  sun.mass = 1000
}

function values() {
  let sunMass = document.getElementById('sunMass').value
  let pVelocity = document.getElementById('planetVelocity').value
  let pX = document.getElementById('planetX').value
  reset()
  stopLoop()
  sun.mass = Number(sunMass)
  planet.vy = Number(pVelocity)
  planet.x = sun.x + Number(pX)
  loop()
}
