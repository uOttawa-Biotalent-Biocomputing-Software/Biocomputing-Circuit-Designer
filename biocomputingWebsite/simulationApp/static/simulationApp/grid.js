class Grid {
  constructor(sketch) {
    this.xOffset = 0;
    this.yOffset = 0;
    this.mousePressOffsetX = 0;
    this.mousePressOffsetY = 0;
    this.move = false;
    this.sketch = sketch;

    this.scallingFactor = 1;
  }

  resize(deltaScallingFactor) {
    this.scallingFactor += deltaScalingFactor;

    let x = this.getGridCoordinateX(this.sketch.mouseX);
    let y = this.getGridCoordinateY(this.sketch.mouseY);

    for (let comp of this.sketch.allComponents) {
      comp.x = ((1 + deltaScallingFactor) * (comp.x - x)) + x;
      comp.y = ((1 + deltaScallingFactor) * (comp.y - y)) + y;
      comp.w = comp.w * (1+deltaScallingFactor);
      comp.h = comp.h * (1+deltaScallingFactor);
    }

  }

  startMoving() {
    this.move = true;
  }

  stopMoving() { 
    this.move = false;
    this.resetOffset();
  }

  calculateOffset() {
    if (!this.move) {
      this.mousePressOffsetX = this.sketch.mouseX;
      this.mousePressOffsetY = this.sketch.mouseY;
    }
  }

  resetOffset() {
    this.xOffset += this.sketch.mouseX - this.mousePressOffsetX;
    this.yOffset += this.sketch.mouseY - this.mousePressOffsetY;

    this.mousePressOffsetX = this.sketch.mouseX;
    this.mousePressOffsetY = this.sketch.mouseY;
  }

  getSize(s) {
      return s * this.scallingFactor;
  }

  getRealCoordinateX(x) {
    this.calculateOffset();
    return (x + this.xOffset + (this.sketch.mouseX - this.mousePressOffsetX));
  }
  getRealCoordinateY(y) {
    this.calculateOffset();
    return (y + this.yOffset + (this.sketch.mouseY - this.mousePressOffsetY));
  }

  getGridCoordinateX(x) {
    this.calculateOffset();
    return (x - this.xOffset - (this.sketch.mouseX - this.mousePressOffsetX));
  }

  getGridCoordinateY(y) {
    this.calculateOffset();
    return (y - this.yOffset - (this.sketch.mouseY - this.mousePressOffsetY));
  }
}
