//Create divs for the grid.
function createDivs(gridAmount) {
  for (let i = 0; i < gridAmount; i++) {
    const div = document.createElement("div");
    div.setAttribute("style", "border: solid 1px black; margin:0px;");
    div.classList.add("created");
    wrap.appendChild(div);
  }
}

//Add hover functionality to the grid and specific color.
//The colors are always the value of the colorInput unless its the eraser buttons.
function activateGrid(color) {
  const gridDiv = document.querySelectorAll("div.created");
  gridDiv.forEach((gridDiv) => {
    gridDiv.addEventListener("mouseover", () =>
      gridDiv.setAttribute(
        "style",
        `background-color: ${color}; border: solid 1px black`
      )
    );
  });
}

//Party Button
function generateRandomColor() {
  let random = Math.floor(Math.random() * 16777215).toString(16);
  return `#${random}`;
}
function generateParty() {
  const gridDiv = document.querySelectorAll("div.created");
  gridDiv.forEach((gridDiv) => {
    gridDiv.addEventListener("mouseover", () =>
      gridDiv.setAttribute(
        "style",
        `background-color: ${generateRandomColor()}; border: solid 1px black`
      )
    );
  });
}

//Remove background color for all created divs
function removeBackgroundColor() {
  const gridDiv = document.querySelectorAll("div.created");
  gridDiv.forEach((gridDiv) =>
    gridDiv.setAttribute(
      "style",
      "background-color: white; border: solid 1px black"
    )
  );
}

//Remove Elements by Class
function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

//Initialization & Event Listeners

//Color input
const colorInput = document.querySelector("#color");
colorInput.addEventListener("input", () => activateGrid(colorInput.value));

//Starting Page
const wrap = document.querySelector("#wrapper");
wrap.setAttribute(
  "style",
  `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr;)`
);
const sliderValue = document.querySelector("#sliderValue");
sliderValue.textContent = "16 x 16";
createDivs(256);
activateGrid(colorInput.value);

//Party Button
const partyMode = document.querySelector("#partyMode");
partyMode.addEventListener("click", () => generateParty());

//Eraser button
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
  activateGrid("white");
});

//Erase button (Remove all color button)
const eraseEverything = document.querySelector("#eraseEverything");
eraseEverything.addEventListener("click", () => removeBackgroundColor());

//Slider
const slider = document.querySelector(".slider");
slider.addEventListener("input", () => {
  removeElementsByClass("created");
  wrap.setAttribute("style", `grid-template-columns: 0; grid-template-rows: 0`);
  let gridSelected = slider.value;
  let gridSize = gridSelected * gridSelected;
  wrap.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridSelected}, 1fr); grid-template-rows: repeat(${gridSelected}, 1fr;)`
  );
  createDivs(gridSize);
  sliderValue.textContent = `${gridSelected} x ${gridSelected}`;
  activateGrid(colorInput.value);
});