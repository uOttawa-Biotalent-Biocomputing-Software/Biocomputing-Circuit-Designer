class Component {
  static active = [];
  static nextId = 0;
  static move = false;
  // static moving = false;
  static compPressed = false;

  static getNextId() {
    return Component.nextId++;
  }

  static isInActive(component) {
    let result = Component.active.find((comp) => {return component.id==comp}) > -1;

    return result
  }

  static resetActiveComponents(){
    Component.active = [];
  }

  static addToActiveComponents(component) {
    Component.active.push(component.id);
  }
  static setActiveComponent(component) {
    Component.active = [component.id];
    Edge.activeEdges = [];
  }

  static beginUpdate() {
    Component.mouseOnNode = false;
  }

  static mouseOnNode = false;
  static clickedNode;

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

  create() {
    this.sketch.allComponents.push(this);
  }

  delete() {
    this.sketch.allComponents.splice(this.sketch.allComponents.indexOf(this), 1);
    // for(let edge of this.connectedEdges) {
    //   edge.delete();
    //   Action.undoStack.push(new Action(edge, {
    //     "actionType": "delete"
    //   }))
    // }
  }


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

  // show component on the canvas
  calculatePadding() {
    return this.grid.scalingFactor * this.padding * 300;
  }

  update() {
    // this.updatePosition();
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
  // return true if mouse is over the component
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

  startMoving() {
    this.oldX = this.x;
    this.oldY = this.y;

    // if (this.sketch.keyIsDown(17)) {
    //   if(!Component.isInActive(this.id)) {
    //     Component.addToActiveComponents(this.id);
    //   }
    // } else {
    //   Component.active = [this.id];
    //   Edge.activeEdges = [];
    // }
    if (!Component.mouseOnNode) {
      Component.moving = true;
      this.calculateOffset();
      this.move = true;
      this.grid.cursorMove();
    }
    
  }

  stopMoving() {
    if(!Component.mouseOnNode) {
      // create an action
      this.move = false;
      this.resetOffset();
      this.grid.cursorNormal();
      // console.log("stop moving");
  
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
