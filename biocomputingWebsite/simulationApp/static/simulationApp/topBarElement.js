let boxFill = '#49b0cc';
let strokeVar = 2;
let strokeFill = '#f0d448';

class topBarElement {
    constructor(x, y, w, sketch){
        this.x = x;
        this.y = y;
        this.w = w;
        this.sketch = sketch;
        this.mouseOnButton = false;
    }

    update(){
        if (this.sketch.mouseX>this.x && this.sketch.mouseX<(this.x+this.w) && this.sketch.mouseY>this.y && this.sketch.mouseY<(this.y+this.w)){
            strokeFill = '#c79e22'; 
            strokeVar = 3;
            boxFill = '#1f8fad';
            this.mouseOnButton = true;
        }
        else{
            strokeFill = '#f0d448'; 
            strokeVar = 2;
            boxFill = '#49b0cc';
            this.mouseOnButton = false;
        }
        this.show();
    }

    show() {
        this.sketch.fill(boxFill);
        this.sketch.stroke(strokeFill);
        this.sketch.strokeWeight(strokeVar);
        this.sketch.square(this.x, this.y, this.w, 33, 5,5,5);
    }
}