window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");

  // Simulate loading delay (for demo purposes)
  setTimeout(() => {
    loadingScreen.style.display = "none";
    content.style.display = "block";
  }, 2000); // Adjust the delay as needed
});
