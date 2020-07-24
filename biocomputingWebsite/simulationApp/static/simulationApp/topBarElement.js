class topBarElement {
    constructor(x, y, w, sketch){
        this.x = x;
        this.y = y;
        this.w = w;
        this.sketch = sketch;

    }

    update(){
        this.show();
    }

    show() {
        this.sketch.fill(255, 0, 0);
        this.sketch.square(this.x, this.y, this.w);
    }

}