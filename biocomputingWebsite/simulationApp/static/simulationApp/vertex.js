class Node {
    constructor(contour) {
        this.contour = contour;
        this.sketch = contour.sketch;
        this.grid = contour.grid;
        this.component = contour.component;
    }

    show(x, y) {
        // console.log(this.grid.getRealCoordinateX(x));

        let size = this.contour.size1
        this.sketch.ellipse(this.grid.getRealCoordinateX(x), this.grid.getRealCoordinateY(y), this.grid.scalingFactor * this.contour.size1);
    }
}