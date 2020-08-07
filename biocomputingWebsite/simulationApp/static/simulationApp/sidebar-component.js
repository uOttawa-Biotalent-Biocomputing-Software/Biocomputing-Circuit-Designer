class SB_Component {

    constructor (image, sketch, grid) {
        this.image = image;
        this.name = name;
        this.sketch = sketch;
        let self = this;
        this.grid = grid;
        // this.button = sketch.createImg(image["imPath"], name)
        // this.button.parent(document.getElementById('components'));
        // this.button.mousePressed(function() {
        //     self.addComponent();
        // }) 
        // this.button.id("side-bar-component")
    }

    addComponent() {
        this.sketch.allComponents.push(new Component(this.image, 700, 400, Component.getNextId(), this.sketch, this.grid));
    }

} 