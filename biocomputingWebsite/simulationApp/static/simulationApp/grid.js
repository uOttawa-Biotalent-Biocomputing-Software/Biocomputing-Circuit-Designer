class Grid {
  constructor(sketch) {
    this.xOffset = 0;
    this.yOffset = 0;
    this.mousePressOffsetX = 0;
    this.mousePressOffsetY = 0;
    this.move = false;
    this.sketch = sketch;

    this.scallingFactor = 1;
    this.scroll = 1;
  }

  resize(deltaScallingFactor) {
    this.scallingFactor += deltaScalingFactor;

    let x = this.getGridCoordinateX(this.sketch.mouseX);
    let y = this.getGridCoordinateY(this.sketch.mouseY);

    for (let comp of this.sketch.allComponents) {
        comp.x = ((1 + deltaScallingFactor) * (comp.x - x)) + x;
        comp.y = ((1 + deltaScallingFactor) * (comp.y - y)) + y;
    }

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
    return (x + this.xOffset + (this.sketch.mouseX - this.mousePressOffsetX)) * this.scroll;
  }
  getRealCoordinateY(y) {
    this.calculateOffset();
    return (y + this.yOffset + (this.sketch.mouseY - this.mousePressOffsetY)) * this.scroll;
  }

  getGridCoordinateX(x) {
    this.calculateOffset();
    return (x - this.xOffset - (this.sketch.mouseX - this.mousePressOffsetX)) * this.scroll;
  }

  getGridCoordinateY(y) {
    this.calculateOffset();
    return (y - this.yOffset - (this.sketch.mouseY - this.mousePressOffsetY)) * this.scroll;
  }
}
