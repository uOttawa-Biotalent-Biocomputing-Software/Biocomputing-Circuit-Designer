class Component {
  static active = [];
  static nextId = 0;

  static getNextId() {
    return Component.nextId++;
  }

  static isInActive(component) {
    return Component.active.includes(component);
  }

  static resetActiveComponents(){
    Component.active = [];
  }

  static addToActiveComponents(component) {
    Component.active.push(component);
  }
  static setActiveComponent(component) {
    Component.active = component;
  }

  static beginUpdate() {
    Component.mouseOnNode = false;
  }

  static mouseOnNode = false;
  static clickedNode;

  constructor(comp, type, initialX, initialY, id, sketch, grid) {
    this.component = comp;
    this.type = type;
    this.p5img = sketch.loadImage(baseUrl+ "simulationApp/images/" + this.type.folder + this.component.img, this.component.name);
    this.w = this.component.width;
    this.h = this.component.height;
    this.x = initialX;
    this.y = initialY;
    this.offsetX = 0;
    this.offsetY = 0;
    this.id = id;
    this.sketch = sketch;
    this.grid = grid;
    this.padding = 0.01;
    this.rectangleContour = new RectangleContour(this);
  }

  // show component on the canvas
  calculatePadding() {
    return this.grid.scalingFactor * this.padding * 300;
  }

  update() {
    // Component.mouseOnNode = false;
    this.updatePosition();
    this.show();
    this.sketch.stroke(0, 0, 0);

    this.rectangleContour.update();
    

  }

  updatePosition() {
    if (this.move) {
      this.x = this.sketch.mouseX - this.w/2 + this.offsetX;
      this.y = this.sketch.mouseY - this.h/2 + this.offsetY;

    }
  }

  show() {
    this.sketch.image(this.p5img, this.grid.getRealCoordinateX(this.x), this.grid.getRealCoordinateY(this.y), this.w, this.h);  

  }

  // return true if mouse is over the component
  isMouseOver() {
    let realX = this.grid.getRealCoordinateX(this.x);
    let realY = this.grid.getRealCoordinateY(this.y);
    let realPaddingX = this.calculatePadding();
    let realPaddingY = this.calculatePadding();
    if(realX-realPaddingX < this.sketch.mouseX && this.sketch.mouseX < realX+this.w+realPaddingX && realY-realPaddingY < this.sketch.mouseY && this.sketch.mouseY < realY+this.h+realPaddingY) {
      return true;
    }
    return false;
  }

  startMoving() {
    if (this.sketch.keyIsDown(17)) {

      Component.addToActiveComponents(this.id);
    } else {
      Component.active = [this.id];
    }
    if (!Component.mouseOnNode) {
      this.calculateOffset();
      this.move = true;
      this.grid.cursorMove();
    }
    
  }

  stopMoving() {
    this.move = false;
    this.resetOffset();
    this.grid.cursorNormal();
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
