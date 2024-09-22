let canvas, gl;

function initWebGL() {
  // Select the canvas from the HTML document
  canvas = document.getElementById("webgl-canvas");

  // Initialize WebGL context
  gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL not supported, falling back on experimental-webgl");
    gl = canvas.getContext("experimental-webgl");
  }

  if (!gl) {
    alert("Your browser does not support WebGL");
    return;
  }

  // Set canvas size
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Start rendering
  render();
}

function resizeCanvas() {
  // Ensure the canvas always covers the entire viewport
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function render() {
  // Set background color and clear the canvas
  gl.clearColor(0.1, 0.1, 0.1, 1.0); // Dark background color
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Keep rendering in a loop
  requestAnimationFrame(render);
}

// Initialize WebGL once the DOM is ready
document.addEventListener("DOMContentLoaded", initWebGL);
