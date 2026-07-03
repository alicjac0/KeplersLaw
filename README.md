# Kepler's Laws Simulation

An interactive, physics-based educational tool built with pure JavaScript and HTML5 Canvas that simulates planetary motion. The simulation models gravitational fields in real-time, allowing users to observe Kepler’s laws of planetary motion emerging naturally from numerical integration.

![Kepler's Law Simulation Preview](https://github.com/user-attachments/assets/973c2fe0-bac8-4bf0-b715-f3550340be71)

## Features & Physics Implemented

Unlike standard animations with hardcoded paths, this simulation uses real-time physics calculations:
* **Numerical Integration:** Planetary acceleration, velocity, and position are updated per frame using Newton's Law of Universal Gravitation.
* **Kepler's 1st Law (Ellipses):** Orbits naturally form ellipses with the Sun acting as one of the foci.
* **Kepler's 2nd Law (Equal Areas):** The planet dynamically accelerates when closer to the Sun (perihelion) and slows down when further away (aphelion).
* **Live Orbit Prediction:** The system calculates and renders a dotted preview line of the trajectory *before* the simulation starts, updating dynamically as parameters change.

## Interactive Controls

The control panel uses a modern glassmorphic UI allowing real-time adjustments:
* **Sun Mass:** Modifies the gravitational pull ($F_g$), altering the curvature of the orbit.
* **Planet Velocity:** Changes the initial tangential speed ($v_y$) to test stable, elliptical, or escape trajectories.
* **Planet X Position:** Adjusts the initial starting distance from the central mass.

---

## Tech Stack & Concepts

* **Frontend:** HTML5, CSS3 (Modern Glassmorphism & Grid), Vanilla JavaScript (ES6+).
* **Graphics:** HTML5 Canvas API (Path drawing, glowing shadows, alpha-trail effects for planet velocity visualization).
* **Physics engine:** Classical mechanics integration loop inside `requestAnimationFrame`.

### Core Physics Equations Used:

Distance vector calculation:

$$d = \sqrt{\Delta x^2 + \Delta y^2}$$

Gravitational force magnitude:

$$F = \frac{\text{Sun Mass}}{d^2}$$

Acceleration components:

$$a_x = \frac{F \cdot \Delta x}{d}, \quad a_y = \frac{F \cdot \Delta y}{d}$$

---

## Getting Started

Since this project uses native web technologies without external dependencies, running it is plug-and-play.

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/KeplersLaw.git](https://github.com/YOUR_USERNAME/KeplersLaw.git)
