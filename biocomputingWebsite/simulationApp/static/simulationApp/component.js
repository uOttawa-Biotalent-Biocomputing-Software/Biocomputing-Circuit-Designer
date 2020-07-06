class Component {
    constructor(path, initialX, initialY, id, sketch, grid) {
      this.img = sketch.loadImage(path);;
      this.w = 300;
      this.h = 100;
      this.x = initialX;
      this.y = initialY;
      this.move = false
      this.offsetX = 0;
      this.offsetY = 0;
      this.id = id;
      this.sketch = sketch;
      this.grid = grid;
      this.scalingFactor = 1;
    }
  
    // show component on the canvas
    show() {
      if (this.move) {
        this.x = this.sketch.mouseX - this.w/2 + this.offsetX;
        this.y = this.sketch.mouseY - this.h/2 + this.offsetY;
        
      }
      this.sketch.image(this.img, this.grid.getRealCoordinateX(this.x), this.grid.getRealCoordinateY(this.y), this.grid.getSize(this.w), this.grid.getSize(this.h));
    }

    // return true if mouse is over the component
    isMouseOver() {
      let realX = this.grid.getRealCoordinateX(this.x);
      let realY = this.grid.getRealCoordinateY(this.y);
      if(realX < this.sketch.mouseX && this.sketch.mouseX < realX+this.w && realY < this.sketch.mouseY && this.sketch.mouseY < realY+this.h) {
        return true;
      }
      return false;
    }
  
    // calculate where the mouse is located relative to x and y of the component
    calculateOffset() {
      this.offsetX = -this.sketch.mouseX + this.x + this.w/2;
      this.offsetY = -this.sketch.mouseY + this.y + this.h/2;
    }
    
    // when mouse release, we need to reajust the x and y of the component with the offset
    resetOffset() {
      this.x = this.sketch.mouseX - this.w/2 + this.offsetX;
      this.y = this.sketch.mouseY - this.h/2 + this.offsetY;
      
      // set the offset at 0 after ajusting x and y
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }
  