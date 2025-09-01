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

let mouseDown = false;


let chosenBrush = {
    activeTool: "Not chosen", // "brush" | "eraser" | "eyeDropper"
    color: "#000000"
}

// now to create the canvas
let drawingBox = document.querySelector("#drawing-box")
let canvasSliderValue = document.querySelector("#canvasSliderValue")

//calculate the pixel size
let canvasSize = parseInt(window.getComputedStyle(drawingBox).width);
let gridSize = parseInt(gridSlider.value);
canvasSliderValue.textContent = gridSize;
let smallDivSizes =  canvasSize / gridSize;

createPixels(gridSize, smallDivSizes)
gridSlider.addEventListener("input", ()=> {
    gridSize = parseInt(gridSlider.value);
    canvasSliderValue.textContent = gridSize;
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
        pixel.setAttribute("draggable", "false");
        pixel.addEventListener("dragstart", (e) => e.preventDefault());
        drawingBox.appendChild(pixel)
    }
}

// Make buttons work
body.addEventListener("mousedown", (e)=> {
    if (e.target.id == "brush") {
        chosenBrush.activeTool = "brush";
        e.target.classList = "chosen";
        chosenBrush.color = colorPaletteBtn.value;

        eraserBtn.classList = "";
        eyeDropperBtn.classList = "";
    }
    else if (e.target.id == "eraser") {
        chosenBrush.activeTool = "eraser";
        e.target.classList = "chosen";
        chosenBrush.color = "#FFFFFF";

        brushBtn.classList = "";
        eyeDropperBtn.classList = "";
    }
    else if (e.target.id == "eyeDropper") {
        chosenBrush.activeTool = "eyeDropper";
        e.target.classList = "chosen";

        eraserBtn.classList = "";
        brushBtn.classList = "";
    }
    else if (e.target.id == "clearCanvas") {
        drawingBox.innerHTML = "";
        createPixels(gridSize, smallDivSizes);
    }
    else if (e.target.id == "saveDrawing") {
        //to do saveDrawing function
        saveDrawing()
    }
})

// make the color buttons functional
body.addEventListener("input", (e)=> {
    if (e.target.id == "colorPalette" && chosenBrush.activeTool == "brush") chosenBrush.color = e.target.value
})

//listen to the mouse
    drawingBox.addEventListener("mousedown", ()=> mouseDown = true);
    drawingBox.addEventListener("mouseup", ()=> mouseDown = false);

// Add drawing ability

drawingBox.addEventListener("mouseover", (e)=> {
    
    if (mouseDown && (chosenBrush.activeTool == "brush" || chosenBrush.activeTool == "eraser")) {
        e.target.style.backgroundColor = chosenBrush.color
        console.log(chosenBrush.activeTool)
    }
    else if (chosenBrush.activeTool == "eyeDropper") {
        console.log("the eye dropper been used")
        colorPaletteBtn.value = toHex(e.target.style.backgroundColor)
        chosenBrush.color = colorPaletteBtn.value;
    }
    
})

//functions from copilot
function toHex(rgbString) {
    // Match rgb or rgba string and extract the numbers
    const result = rgbString.match(/\d+/g);
    if (!result || result.length < 3) return "#000000";
    // Parse the first three values as integers for r, g, b
    const [r, g, b] = result.slice(0, 3).map(Number);
    return (
        "#" +
        [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
    );
}

function saveDrawing() {
    const gridSize = parseInt(gridSlider.value);
    const scale = 20; // How much bigger you want the saved image (20x20 per pixel)
    const canvas = document.createElement("canvas");
    canvas.width = gridSize * scale;
    canvas.height = gridSize * scale;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const pixels = drawingBox.children;

    // Draw each pixel as a big square
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const pixel = pixels[y * gridSize + x];
            let color = pixel.style.backgroundColor || "rgb(255,255,255)";
            ctx.fillStyle = color;
            ctx.fillRect(x * scale, y * scale, scale, scale);
        }
    }

    // Create a download link
    const link = document.createElement("a");
    link.download = "etch-a-sketch.png";
    link.href = canvas.toDataURL();
    link.click();
}