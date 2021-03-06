const gridContainer = document.getElementById("grid-container");
const width = gridContainer.offsetWidth;
const height = gridContainer.offsetHeight;
let size = 16;

let elementsList = [];
let linesList = [];

let eraserActive = false;
let mouseDown = false;

// SLIDER
const slider = document.getElementById("resize-slider")
const output = document.getElementById("resize-slider-output");
output.innerHTML = slider.value;

// CLEAR
const clear = document.getElementById("clear-button");
clear.addEventListener("click", clearGrid);

// ERASER
const eraser = document.getElementById("eraser-button");
eraser.addEventListener("click", () => {
    eraserActive = !eraserActive
    updateMouse();
    mouseDown = false;
})

// COLOR PICKER
const colorPicker = document.getElementById("color");


slider.oninput = function() {
  output.innerHTML = this.value;
  size = this.value
  resizeGrid();
}

colorPicker.onclick = function() {
    eraserActive = false;
    updateMouse();
}

/////////////////////////////
// MAIN
/////////////////////////////
createGrid();


function updateMouse()
{
    if(eraserActive) 
        document.body.style.cursor = "url('./img/eraser.png'), auto";

    else{
        document.body.style.cursor = "default";
    }
}
//FUNCTIONS
function createGrid()
{

    gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr)`;

    

    for (let i = 0; i < size; i++) {
    
        for(let j = 0; j < size; j++)
        {
            let gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
    
            gridElement.addEventListener("click", (element) => {
                mouseDown = !mouseDown;
                paint(element);
            });

            gridElement.addEventListener("mouseover", paint);
            elementsList.push(gridElement);

            gridContainer.appendChild(gridElement);
            gridContainer.addEventListener("mouseleave", () => 
{
                mouseDown = false
                updateMouse();
            });
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

    if(eraserActive)
    {
        element.currentTarget.classList.remove("painted");
        element.currentTarget.style.backgroundColor = "";

        return;
    }
    element.currentTarget.classList.add("painted");
    element.currentTarget.style.backgroundColor = colorPicker.value;
}