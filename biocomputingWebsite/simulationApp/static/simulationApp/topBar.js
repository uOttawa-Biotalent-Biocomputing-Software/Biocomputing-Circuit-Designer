class topBar {
    constructor(heightPercent, sketch) {
        this.heightPercent = heightPercent;
        this.sketch = sketch;
        this.h = this.heightPercent * this.sketch.wanted_height / 100;
    }

    update() {
        this.show();
    }

    show(){
        this.sketch.fill(0, 60, 100, 255);
        this.sketch.noStroke();
        this.sketch.rect(0, 0, this.sketch.wanted_width, this.h);
    }
}
