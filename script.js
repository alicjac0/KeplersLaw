const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  mass: 1000,
}

var planet = {
  x: sun.x + 500,
  y: sun.y,
  vx: 0,
  vy: 1,
  mass: 500,
}

function update() {
  let dx = sun.x - planet.x
  let dy = sun.y - planet.y
  let distance = Math.sqrt(dx * dx + dy * dy)
  let force = sun.mass / (distance * distance)

  let ax = (force * dx) / distance
  let ay = (force * dy) / distance

  planet.vx += ax
  planet.vy += ay

  planet.x += planet.vx
  planet.y += planet.vy
}

function draw() {
  ctx.fillStyle = '#07070733'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.beginPath()
  ctx.arc(sun.x, sun.y, 20, 0, Math.PI * 2)
  ctx.fillStyle = '#ffd000'
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.arc(planet.x, planet.y, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#da6767'
  ctx.lineTo(planet.x, planet.y)
  ctx.fill()
  ctx.closePath()
}

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}
loop()
