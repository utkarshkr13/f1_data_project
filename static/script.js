// Loading animation control
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");

  // Simulate loading delay, then hide the loading screen
  setTimeout(function () {
    loadingScreen.style.display = "none";
    content.style.display = "block";
  }, 2000); // Adjust this delay to fit your loading animation duration
});

// F1 car follows the mouse cursor
document.addEventListener("mousemove", function (e) {
  const car = document.querySelector(".f1-car");
  car.style.left = e.pageX + "px";
  car.style.top = e.pageY + "px";
});
