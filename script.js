/*
    Logic:

        Create an object that has all the brushes available to use
            it should have the (the chosen brush. the chosen color. the brush size)
        
        make the grid
            using math, Get the size of the dives that would be sufficient to fill drawing-box
            make a function that creates divs with the size we just calculated
            in css, make the divs be wrapped inside the drawing box

        add event listeners
            for each brush button that's pressed, Change the brush object accordingly

        TO BE CONTINUED.......
*/

let brushBtn = document.querySelector("#brush")
let eraserBtn = document.querySelector("#eraser")
let colorPaletteBtn = document.querySelector("#colorPalette")
let eyeDropperBtn = document.querySelector("#eyeDropper")
let clearCanvasBtn = document.querySelector("#clearCanvas")
let saveDrawingBtn = document.querySelector("#saveDrawing")
let gridSlider = document.querySelector("#gridSize")


let chosenBrush = {
    activeTool: "brush", // "brush" | "eraser" | "eyeDropper"
    color: "#000000"
}

// now to create the canvas
let drawingBox = document.querySelector("#drawing-box")

//calculate the div size
let canvasSize = parseInt(window.getComputedStyle(drawingBox).width);
let gridSize = parseInt(gridSlider.value);
let smallDivSizes =  canvasSize / gridSize;

createPixels(gridSize, smallDivSizes)
gridSlider.addEventListener("input", ()=> {
    gridSize = parseInt(gridSlider.value);
    smallDivSizes =  canvasSize / gridSize;
    drawingBox.innerHTML = "";
    createPixels(gridSize, smallDivSizes);
    console.log(smallDivSizes);
})
console.log(smallDivSizes)

//create the pixels
function createPixels(gridSize, pixelSize) {
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let pixel = document.createElement("div")
        pixel.style.width = (100 / gridSize) + "%";
        pixel.style.height = (100 / gridSize) + "%";
        pixel.style.boxSizing = "border-box";
        drawingBox.appendChild(pixel)
    }
}