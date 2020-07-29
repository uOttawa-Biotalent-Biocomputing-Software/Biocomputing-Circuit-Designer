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
        this.button.parent(document.getElementById('components'));
        this.button.position(width, height);
        this.button.mousePressed(function() {
            self.addComponent();
        }) 
    }

    addComponent() {
        this.sketch.allComponents.push(new Component(this.image, 700, 400, this.sketch.componentCount, this.sketch, this.grid));
        this.sketch.componentCount++;
    }

} 