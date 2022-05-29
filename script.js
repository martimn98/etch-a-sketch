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

slider.oninput = function() {
  output.innerHTML = this.value;
  size = this.value
  resizeGrid();
}

/////////////////////////////
// MAIN
/////////////////////////////
createGrid();



//FUNCTIONS
function createGrid()
{
    let elementWidth = width / size;
    let elementHeight = height / size;

    for (let i = 0; i < size; i++) {
        let gridLine = document.createElement("div");
        gridLine.classList.add("grid-line");
        linesList.push(gridLine);
    
        for(let j = 0; j < size; j++)
        {
            let gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridElement.style.width = elementWidth + "px";
            gridElement.style.height = elementHeight + "px";
    
            gridElement.addEventListener("mouseenter", paint);
        
            gridLine.appendChild(gridElement);    
    
            elementsList.push(gridElement);
        }
    
        gridContainer.appendChild(gridLine); 
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
    element.currentTarget.classList.add("painted");
}