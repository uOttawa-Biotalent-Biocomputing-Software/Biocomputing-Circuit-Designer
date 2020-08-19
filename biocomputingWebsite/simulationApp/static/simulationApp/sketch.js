// Skecth is the P5.JS canvas and is used as a parameter in almost every other class
const s = ( sketch ) => {

  sketch.getDimensions = () => {
    sketch.wanted_height = document.getElementById("myContainer").scrollHeight;
    sketch.wanted_width = document.getElementById("myContainer").scrollWidth;
  }

  sketch.eventHandler = new EventHandler(sketch)

  sketch.grid = new Grid(sketch);
  sketch.wanted_height = 0;
  sketch.wanted_width = 0;
  sketch.getDimensions();

  sketch.allComponents = [];
  sketch.allEdges = [];

  sketch.edgeType = 'ca'; // Default selected arc
  

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    sketch.pixelDensity(1);

    // Sidebar
    sketch.menu = new LoadMenues(sketch, sketch.grid);
    
    sketch.resize();
  }

  // p5.js continuously call this method
  sketch.draw = () => {
    sketch.background(183, 206, 212); // background color
    sketch.strokeWeight(sketch.grid.scalingFactor*2)
    Component.beginUpdate();
    for (let comp of sketch.allComponents) {
      comp.update();
    }

    for (let edge of sketch.allEdges) {
      edge.update();
    }
  }

  // handle resize events
  sketch.resize = () => {
    sketch.eventHandler.resize();
  }

  sketch.drag = null;
  sketch.select = null;
  sketch.click = null;
  
  // mouse pressed event
  sketch.mousePressed = () => {
    sketch.eventHandler.mousePressed();
  }

  // mouse released event
  sketch.mouseReleased = () => {
    sketch.eventHandler.mouseReleased();
  }
  
  
  // when user scroll to resize the grid
  sketch.mouseWheel = (event) => {
    sketch.eventHandler.mouseWheel(event)
  }

  sketch.mouseDragged = () => {
    sketch.eventHandler.mouseDragged();
  }
  
  sketch.keyPressed = () => {
    sketch.eventHandler.keyPressed();
  }
}

// Create the canvas with the sketch
var myp5 = new p5(s, document.getElementById("myContainer"));

// Handle the resize event from the body
// Calls the resize method in p5
function resize(){
  myp5.resize();
}