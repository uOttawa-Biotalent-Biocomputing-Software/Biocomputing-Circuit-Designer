
class RectangleContour {
    constructor(component) {
        this.component = component;
        this.sketch = this.component.sketch;
        this.grid = this.component.grid;
    }

    show() {
        let paddingX = this.component.calculatePadding();
        let paddingY = this.component.calculatePadding();
        this.sketch.fill(0, 0, 0, 0)
        this.sketch.rect(this.grid.getRealCoordinateX(this.component.x) - paddingX/2, this.grid.getRealCoordinateY(this.component.y) - paddingY/2, this.component.w + paddingX, this.component.h + paddingY, 20);
    }
}