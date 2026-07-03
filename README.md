# Kepler's Laws Simulation

An interactive, physics-based educational tool built with pure JavaScript and HTML5 Canvas that simulates planetary motion. The system models gravitational fields in real-time using numerical integration, allowing Kepler’s laws to emerge naturally from fundamental physical equations.

<img width="1898" height="940" alt="image" src="https://github.com/user-attachments/assets/a03c163e-2cc7-4cd9-8c23-dcb7f243849d" />


## Features & Physics Implemented

Unlike standard animations with predefined paths, this simulation computes motion frame-by-frame:
* **Kepler's 1st Law (Ellipses):** Orbits naturally form ellipses with the Sun acting as one of the foci.
* **Kepler's 2nd Law (Equal Areas):** The planet dynamically accelerates at the perihelion (closest to the Sun) and slows down at the aphelion (furthest away).
* **Live Orbit Prediction:** Calculates and renders a dotted preview line of the trajectory *before* the simulation starts, updating instantly as parameters change.
* **Dynamic Motion Trail:** A custom rendering system creates a smooth, fading trajectory trail behind the planet without blurring other UI elements.

## HUD & Interactive Controls

The simulation features a modern Heads-Up Display (HUD) layout optimized for clean visuals and mobile screens:
* **Sliding Info Sidebar:** A responsive, elegant panel holding the physical descriptions of Kepler's laws, easily toggled via the hamburger menu.
* **Vector Visualizers:** Real-time interactive arrow overlays originating from the planet:
   * **Velocity Vector ($v$):** Shows the instantaneous direction and speed (lengthens as the planet speeds up).
  * **Gravity Vector ($g$):** Represents the gravitational acceleration pulling the planet directly toward the central mass.
* **Parameter Sliders:** Adjust Sun Mass, Initial Planet Velocity, and Starting Position on the fly.

---

## Tech Stack & Concepts

* **Frontend:** HTML5, CSS3 (Modern Glassmorphism, Fixed HUD Layout), Vanilla JavaScript (ES6+).
* **Graphics:** HTML5 Canvas API (Path drawing, dynamic alpha-trails, clean vector arrow rendering loops).
* **Physics engine:** Classical mechanics integration loop inside `requestAnimationFrame`.

### Core Physics Equations Used:

Distance vector calculation:
$$d = \sqrt{\Delta x^2 + \Delta y^2}$$

Gravitational acceleration field ($g$):
$$g = \frac{\text{Sun Mass}}{d^2}$$

Vector components applied to velocity ($v_x, v_y$):
$$g_x = \frac{g \cdot \Delta x}{d}, \quad g_y = \frac{g \cdot \Delta y}{d}$$

---

## Getting Started

Since this project uses native web technologies without external dependencies, running it is plug-and-play.

1. Clone the repository:
   ```bash
   git clone [https://github.com/alicjac0/KeplersLaw.git](https://github.com/alicjac0/KeplersLaw.git)
