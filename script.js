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

let brush = document.querySelector("#brush")
let eraser = document.querySelector("#eraser")
let colorPalette = document.querySelector("#colorPalette")
let eyeDropper = document.querySelector("#eyeDropper")
let clearCanvas = document.querySelector("#clearCanvas")
let saveDrawing = document.querySelector("#saveDrawing")

