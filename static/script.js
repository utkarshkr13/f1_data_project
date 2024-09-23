document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year-select");
  const raceSelect = document.getElementById("race-select");
  const showResultsButton = document.getElementById("show-results");
  const tableBody = document.querySelector("#results-table tbody");

  // Populate year dropdown
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  // Fetch races for the selected year
  yearSelect.addEventListener("change", async () => {
    const year = yearSelect.value;
    raceSelect.innerHTML = ""; // Clear previous options
    raceSelect.disabled = true;
    showResultsButton.disabled = true;

    if (year) {
      const response = await fetch(`https://ergast.com/api/f1/${year}.json`);
      const data = await response.json();
      const races = data.MRData.RaceTable.Races;

      races.forEach((race) => {
        const option = document.createElement("option");
        option.value = race.round;
        option.textContent = race.raceName;
        raceSelect.appendChild(option);
      });

      raceSelect.disabled = false;
    }
  });

  // Enable show results button when a race is selected
  raceSelect.addEventListener("change", () => {
    showResultsButton.disabled = !raceSelect.value;
  });

  // Fetch and display results
  showResultsButton.addEventListener("click", async () => {
    const year = yearSelect.value;
    const round = raceSelect.value;
    tableBody.innerHTML = ""; // Clear previous results

    if (year && round) {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/${round}/results.json`
      );
      const data = await response.json();
      const results = data.MRData.RaceTable.Races[0].Results;

      results.forEach((result) => {
        const row = document.createElement("tr");

        const positionCell = document.createElement("td");
        positionCell.textContent = result.position;
        row.appendChild(positionCell);

        const driverCell = document.createElement("td");
        driverCell.textContent = `${result.Driver.givenName} ${result.Driver.familyName}`;
        row.appendChild(driverCell);

        const teamCell = document.createElement("td");
        teamCell.textContent = result.Constructor.name;
        row.appendChild(teamCell);

        const pointsCell = document.createElement("td");
        pointsCell.textContent = result.points;
        row.appendChild(pointsCell);

        tableBody.appendChild(row);
      });
    }
  });
  // Add ripple effect to header on hover
  const header = document.querySelector("header");
  header.addEventListener("mousemove", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = header.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - ripple.offsetWidth / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - ripple.offsetHeight / 2}px`;
    header.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
});
