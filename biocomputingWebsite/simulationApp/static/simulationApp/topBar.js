class topBar {
    constructor(heightPercent, sketch) {
        this.heightPercent = heightPercent;
        this.sketch = sketch;
        this.h = this.heightPercent * this.sketch.wanted_height / 100;
        this.mouseOnBar = false;
        this.icons = []

        for (let i = 0; i<3; i++) {
            this.icons.push(new topBarElement((this.h)*(i), 2, this.h-2, this.sketch));
        }
    }

    update() {
        this.show();
        this.mouseOnBar = (this.sketch.mouseY > 0 && this.sketch.mouseY < this.h);

        for(let icon of this.icons) {
            icon.update();
        }
        
    }

    show(){
        this.sketch.fill(0, 60, 100, 255);
        this.sketch.noStroke();
        this.sketch.rect(0, 0, this.sketch.wanted_width, this.h);
    }
}
