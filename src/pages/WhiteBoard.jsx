import React, { useState, useLayoutEffect } from "react";
import rough from "roughjs/bundled/rough.esm.js";
// Create a RoughJS generator instance
const generator = rough.generator();
const WhiteBoard = () => {
 // State for managing drawing elements and interactions
 const [elements, setElements] = useState([]);
 const [drawing, setDrawing] = useState(false);
 // UseLayoutEffect: Responsible for rendering drawing elements
 useLayoutEffect(() => {
  // Get the canvas element by its ID
  const canvas = document.getElementById("canvas");
  // Get the 2D rendering context of the canvas
  const ctx = canvas.getContext("2d");
  // Create a RoughJS canvas instance associated with the canvas element
  const roughCanvas = rough.canvas(canvas);
  // Set stroke style and line width for the canvas context
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  // Clear the entire canvas to ensure a clean drawing surface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // If there are saved elements to render
  if (elements && elements.length > 0) {
   // Iterate through each saved element
   elements.forEach(({ roughElement }) => {
    // Use RoughJS to draw the element on the canvas
    roughCanvas.draw(roughElement);
   });
  }
 }, [elements]);
 // Function to create a new drawing element
 const createElement = (x1, y1, x2, y2) => {
  // Use the RoughJS generator to create a rough element (line or rectangle)
  const roughElement = generator.line(x1, y1, x2, y2);
  // Return an object representing the element, including its coordinates and RoughJS representation
  return { x1, y1, x2, y2, roughElement };
 };
 // Event handler for mouse down
 const handleMouseDown = (e) => {
  setDrawing(true);
  const { clientX, clientY } = e;
  // Create a new drawing element when mouse down is detected
  const element = createElement(clientX, clientY, clientX, clientY);
  setElements((prevState) => [...prevState, element]);
 };
 // Event handler for mouse move
 const handleMouseMove = (e) => {
  if (!drawing) return;
  const { clientX, clientY } = e;
  // Find the index of the last element created during mouse down
  const index = elements.length - 1;
  const { x1, y1 } = elements[index];
  // Update the element's coordinates for dynamic drawing
  const UpdatedElement = createElement(x1, y1, clientX, clientY);
  const elementsCopy = [...elements];
  elementsCopy[index] = UpdatedElement;
  setElements(elementsCopy);
 };
 // Event handler for mouse up
 const handleMouseUp = () => {
  setDrawing(false);
 };
 // Return JSX to render the collaborative canvas
 return (
  <>
   <canvas
    id="canvas"
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    width={window.innerWidth}
    height={window.innerHeight}
   ></canvas>
  </>
 );
};
export default WhiteBoard;