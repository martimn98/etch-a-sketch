const gridContainer = document.getElementById("grid-container");
const width = gridContainer.offsetWidth;
const height = gridContainer.offsetHeight;
let size = 16;

let elementsList = [];
let linesList = [];

// SLIDER
const slider = document.getElementById("resize-slider")
const output = document.getElementById("resize-slider-output");
output.innerHTML = slider.value;

// CLEAR
const clear = document.getElementById("clear-button");
clear.addEventListener("click", clearGrid);

// COLOR PICKER
const colorPicker = document.getElementById("color");

let mouseDown = false;

slider.oninput = function() {
  output.innerHTML = this.value;
  size = this.value
  resizeGrid();
}

/////////////////////////////
// MAIN
/////////////////////////////
createGrid();

document.body.onmouseup = function() {
    mouseDown = false;
}

//FUNCTIONS
function createGrid()
{
    let elementWidth = width / size;
    let elementHeight = height / size;

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`

    for (let i = 0; i < size; i++) {
    
        for(let j = 0; j < size; j++)
        {
            let gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridElement.style.width = elementWidth + "px";
            gridElement.style.height = elementHeight + "px";
    
            gridElement.addEventListener("mousedown", () => mouseDown = true);
            gridElement.addEventListener("mouseover", paint);
            elementsList.push(gridElement);

            gridContainer.appendChild(gridElement); 
        }
    }
}


function deleteGrid()
{
    elementsList.forEach(element => {
        element.remove();
    });

    linesList.forEach(element => {
        element.remove();
    })
}

function clearGrid()
{
    elementsList.forEach(element => {
        element.classList.remove("painted");
        element.style.backgroundColor = "";
    })
}

function resizeGrid()
{
    deleteGrid();
    createGrid();
}

function resize()
{
    do{
        size = parseInt(window.prompt("Grid size (1 to 100):", ""), 10);
    }while(isNaN(size) || size > 100 || size < 1);

    resizeGrid();
}

function paint(element)
{
    if(!mouseDown) return;

    element.currentTarget.classList.add("painted");
    element.currentTarget.style.backgroundColor = colorPicker.value;
}