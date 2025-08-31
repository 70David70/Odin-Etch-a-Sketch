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

let body = document.querySelector("body")
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

//calculate the pixel size
let canvasSize = parseInt(window.getComputedStyle(drawingBox).width);
let gridSize = parseInt(gridSlider.value);
let smallDivSizes =  canvasSize / gridSize;

createPixels(gridSize, smallDivSizes)
gridSlider.addEventListener("input", ()=> {
    gridSize = parseInt(gridSlider.value);
    smallDivSizes =  canvasSize / gridSize;
    drawingBox.innerHTML = "";
    createPixels(gridSize, smallDivSizes);
})

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

// Make buttons work
body.addEventListener("click", (e)=> {
    if (e.target.id == "brush") {
        chosenBrush.activeTool = "brush";
        e.target.style.border = "3px solid yellow";
        chosenBrush.color = colorPaletteBtn.value;

        eraserBtn.style.border = "";
        eyeDropperBtn.style.border = "";
    }
    else if (e.target.id == "eraser") {
        chosenBrush.activeTool = "eraser";
        e.target.style.border = "3px solid yellow"
        chosenBrush.color = "#FFFFFF";

        brushBtn.style.border = "";
        eyeDropperBtn.style.border = "";
    }
    else if (e.target.id == "eyeDropper") {
        chosenBrush.activeTool == "eyedropper";
        e.target.style.border = "3px solid yellow"

        eraserBtn.style.border = "";
        brushBtn.style.border = "";
    }
    else if (e.target.id == "clearCanvas") {
        drawingBox.innerHTML = "";
        createPixels(gridSize, smallDivSizes);
    }
    else if (e.target.id == "saveDrawing") {
        //to do saveDrawing function
    }
})

// make the color buttons functional
body.addEventListener("input", (e)=> {
    if (e.target.id == "colorPalette" && chosenBrush.activeTool == "brush") chosenBrush.color = e.target.value
})

// Add drawing ability

drawingBox.addEventListener("mousedown", (e)=> {
    e.target.style.backgroundColor = chosenBrush.color
})