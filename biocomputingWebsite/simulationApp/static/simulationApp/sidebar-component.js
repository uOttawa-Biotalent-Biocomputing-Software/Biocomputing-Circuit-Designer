class SB_Component {

    constructor (image, name, width, height, sketch, grid) {
        this.image = image;
        this.name = name;
        this.width = width;
        this.height = height;
        this.sketch = sketch;
        this.grid = grid;
        let self = this;

        this.button = sketch.createImg(image, name)
        this.button.parent(document.getElementById("components"));
        this.button.mousePressed(function() {
            self.addComponent();
        }) 
    }

    addComponent() {
        this.sketch.allComponents.push(new Component(this.image, 700, 400, this.sketch.componentCount, this.sketch, this.grid));
        this.sketch.componentCount++;
    }

    isMouseOver() {
        let realX = this.grid.getRealCoordinateX(this.x);
        let realY = this.grid.getRealCoordinateY(this.y);
        let realPaddingX = this.calculatePadding();
        let realPaddingY = this.calculatePadding();

        if(realX-realPaddingX < this.sketch.mouseX && this.sketch.mouseX < realX+this.w+realPaddingX && realY-realPaddingY < this.sketch.mouseY && this.sketch.mouseY < realY+this.h+realPaddingY) {
            console.log(true);
            return true;
        }
        return false;
    }
}
