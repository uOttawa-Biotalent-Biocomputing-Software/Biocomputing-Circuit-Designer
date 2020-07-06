const s = ( sketch ) => {
  
  
  sketch.getDimensions = () => {
    sketch.wanted_height = document.body.clientHeight;
    sketch.wanted_width = document.body.clientWidth;
  }

  sketch.wanted_height = 0;
  sketch.wanted_width = 0;
  sketch.getDimensions();

  sketch.allComponents = [];

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    
    sketch.allComponents.push(new Component(im, 0, 0, 0));
    sketch.allComponents.push(new Component(im, 500, 500, 1));
    sketch.allComponents.push(new Component(im, 200, 400, 2));
    sketch.allComponents.push(new Component(im, 600, 500, 3));
    
  }

  // p5.js continuously call this method
  sketch.draw = () => {
    sketch.background(120);

    for (let comp of sketch.allComponents) {
      comp.show();
    }
    

  }
  
  // handle resize events
  sketch.resize = () => {
    sketch.getDimensions();
    sketch.resizeCanvas(sketch.wanted_width, sketch.wanted_height, true);
  }

  // mouse pressed event
  sketch.mousePressed = () => {
    // loop over each component in the canvas and drag it if the mouse is over it
    for (let comp of sketch.allComponents) {
      if (comp.isMouseOver()) {
        comp.calculateOffset();
        comp.move = true;
      }
    }
  }

  // mouse released event
  sketch.mouseReleased = () => {
    // drop each component if it was previously dragged
    for (let comp of sketch.allComponents) {
      if (comp.move) {
        comp.resetOffset();
        comp.move = false;
      }
    }
  }

  class Component {
    constructor(path, initialX, initialY, id) {
      this.img = sketch.loadImage(path);;
      this.w = 300;
      this.h = 100;
      this.x = initialX;
      this.y = initialY;
      this.move = false
      this.offsetX = 0;
      this.offsetY = 0;
      this.id = id;
    }

    // show component on the canvas
    show() {
      if (this.move) {
        this.x = sketch.mouseX - this.w/2 + this.offsetX;
        this.y = sketch.mouseY - this.h/2 + this.offsetY;
      }
      sketch.image(this.img, this.x, this.y, this.w, this.h);
    }

    // return true if mouse is over the component
    isMouseOver() {
      if(this.x < sketch.mouseX && sketch.mouseX < this.x+this.w && this.y < sketch.mouseY && sketch.mouseY < this.y+this.h && sketch.mouseIsPressed) {
        return true;
      }
      return false;
    }

    // calculate where the mouse is located relative to x and y of the component
    calculateOffset() {
      this.offsetX = -sketch.mouseX + this.x + this.w/2;
      this.offsetY = -sketch.mouseY + this.y + this.h/2;
    }
    
    // when mouse release, we need to reajust the x and y of the component with the offset
    resetOffset() {
      this.x = sketch.mouseX - this.w/2 + this.offsetX;
      this.y = sketch.mouseY - this.h/2 + this.offsetY;
      
      // set the offset at 0 after ajusting x and y
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }


}
// create the canvas with the sketch
var myp5 = new p5(s, document.getElementById("myContainer"));

// handle the resize event from the body
// call the resize method in p5
function resize(){
  myp5.resize();
}
