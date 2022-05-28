const gridContainer = document.getElementById("grid-container");
const width = gridContainer.offsetWidth;
const height = gridContainer.offsetHeight;
const size = 16;

const elementWidth = width / size;
const elementHeight = height / size;

const elementsList = [];

for (let i = 0; i < size; i++) {
    let gridLine = document.createElement("div");
    gridLine.classList.add("grid-line");

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

function paint(element)
{
    element.currentTarget.classList.add("painted");
}