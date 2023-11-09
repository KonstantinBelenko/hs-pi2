import { cuteRobotsData } from "./robots.js";

const tileContainer = document.getElementById("tile-container");
const searchBar = document.getElementById("search-bar");
const sortButton = document.getElementById("sort-button");
let isSortedAscending = true;

function renderRobotTiles(cuteRobots) {
  tileContainer.innerHTML = "";
  cuteRobots.forEach(robot => {
    const tile = document.createElement("div");
    tile.className = 'tile';
    tile.innerHTML = `
      <img class="tile-image" src="${robot.imageUrl}" alt="${robot.alt}">
      <div class="tile-title">${robot.name}</div>
      <div>${robot.description}</div>
    `;
    tileContainer.appendChild(tile);
  });
}

searchBar.addEventListener("keyup", (event) => {
  const searchText = event.target.value.toLowerCase();
  const filteredRobots = cuteRobotsData.filter(robot =>
    robot.name.toLowerCase().includes(searchText)
  );
  renderRobotTiles(filteredRobots);
});

sortButton.addEventListener("click", () => {
  cuteRobotsData.sort((a, b) => 
    (isSortedAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  );
  renderRobotTiles(cuteRobotsData);
  isSortedAscending = !isSortedAscending;
  sortButton.textContent = isSortedAscending ? "Sort A-Z" : "Sort Z-A";
});

// Initial render
renderRobotTiles(cuteRobotsData);

