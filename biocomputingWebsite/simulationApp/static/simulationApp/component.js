class Component {
  static active = [];
  static nextId = 0;
  static move = false;
  static compPressed = false;

  // Choosing a Unique Component ID
  static getNextId() {
    return Component.nextId++;
  }

  // Checking if Component is Selected
  static isInActive(component) {
    let result = Component.active.find((comp) => {return component.id==comp}) > -1;

    return result
  }

  // Deselecting all Components on the canvas
  static resetActiveComponents(){
    Component.active = [];
  }

  // Adding a component to the Selected Components list to use later for (Undo, Redo, Delete etc.)
  static addToActiveComponents(component) {
    Component.active.push(component.id);
  }

  // If no components are selected, set the list to the one component given
  static setActiveComponent(component) {
    Component.active = [component.id];
    Edge.activeEdges = [];
  }

  static beginUpdate() {
    Component.mouseOnNode = false;
  }

  static mouseOnNode = false;
  static clickedNode;
  
  /**
   * @constructors
   * @param  {} comp - Component Properties from JSON file
   * @param  {} type - Type of Component from JSON file
   * @param  {} initialX - X location of component on canvas
   * @param  {} initialY - Y location of component on canvas
   * @param  {} id - Component ID
   * @param  {} sketch
   * @param  {} grid
   */
  constructor(comp, type, initialX, initialY, id, sketch, grid) {
    this.component = comp;
    this.type = type;
    this.p5img = sketch.loadImage(baseUrl+ "simulationApp/images/" + this.type.folder + this.component.img);
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
    this.connectedEdges = [];
    this.create();
  }

  // Adding Component to canvas
  create() {
    this.sketch.allComponents.push(this);
  }

  // Deleting Component from canvas
  delete() {
    this.sketch.allComponents.splice(this.sketch.allComponents.indexOf(this), 1);
  }

  // Redo Component Action
  executeAction(details) {
    if(details.actionType == "create") {
      this.create();
    } else if (details.actionType == "delete") {
      this.delete();
    } else if (details.actionType == "move") {
      this.x = details.newX;
      this.y = details.newY;
    }
  }

  // Undo Component action
  // EX. (If user's actionType was to 'delete', when Undo is pressed, you need to run 'this.create' to show the component again)
  // Opposite of executeAction
  executeOppositeAction(details) {
    if(details.actionType == "create") {
      this.delete();
    } else if (details.actionType == "delete") {
      this.create();
    } else if (details.actionType == "move") {
      this.y = details.oldY;
      this.x = details.oldX;
    }
  }

  // Show component on the canvas
  calculatePadding() {
    return this.grid.scalingFactor * this.padding * 300;
  }

  update() {
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
    this.sketch.image(this.p5img, this.grid.getRealCoordinateX(this.x), this.grid.getRealCoordinateY(this.y), this.w*this.grid.scalingFactor, this.h*this.grid.scalingFactor);  

  }

  isMouseOverNode() {
    return this.rectangleContour.isMouseOverNode();
  }

  // Return TRUE if mouse is over the component
  isMouseOver() {
    let realX = this.grid.getRealCoordinateX(this.x);
    let realY = this.grid.getRealCoordinateY(this.y);
    let realPaddingX = this.calculatePadding();
    let realPaddingY = this.calculatePadding();

    if(realX-realPaddingX < this.sketch.mouseX && this.sketch.mouseX < realX+(this.w * this.grid.scalingFactor)+realPaddingX && realY-realPaddingY < this.sketch.mouseY && this.sketch.mouseY < realY+(this.h*this.grid.scalingFactor)+realPaddingY) {
      return true;
    } else{
      return false;
    }
  }

  // If mouse is clicked component and being dragged to move
  startMoving() {
    this.oldX = this.x;
    this.oldY = this.y;

    if (!Component.mouseOnNode) {
      Component.moving = true;
      this.calculateOffset();
      this.move = true;
      this.grid.cursorMove();
    }
    
  }

  // If mouse is not being dragged
  stopMoving() {
    if(!Component.mouseOnNode) {
      this.move = false;
      this.resetOffset();
      this.grid.cursorNormal();
  
      let newX = this.x;
      let newY = this.y;
      Component.moving = false;
  
      if (this.oldY != newY && this.oldX != this.newX){
        Action.undoStack.push(new Action(this, {
          "actionType": "move",
          oldY: this.oldY,
          oldX: this.oldX,
          newX: newX,
          newY: newY
        }))
      }
    }

  }
  // Calculate where the mouse is located relative to x and y of the component
  calculateOffset() {
    this.offsetX = -this.sketch.mouseX + this.x + this.w/2;
    this.offsetY = -this.sketch.mouseY + this.y + this.h/2;
  }

  // When mouse release, we need to reajust the x and y of the component with the offset
  resetOffset() {
    this.x = this.sketch.mouseX - this.w/2 + this.offsetX;
    this.y = this.sketch.mouseY - this.h/2 + this.offsetY;

    // Set the offset at 0 after ajusting x and y
    this.offsetX = 0;
    this.offsetY = 0;
  }
}
