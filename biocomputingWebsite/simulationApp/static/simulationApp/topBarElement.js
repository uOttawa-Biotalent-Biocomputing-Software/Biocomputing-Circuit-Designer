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
        let boxFill = '#49b0cc';
        let strokeVar = 3;
        let strokeFill = '#f0d448';
/*
        if (mouseX>this.x && mouseX<(this.x+this.w) && mouseY>this.y && mouseY<(this.y+this.w)){
            strokeFill = '#c79e22'; 
            strokeVar = 5;
            boxFill = '#1f8fad';
        }
        else{
            strokeFill = '#f0d448'; 
            strokeVar = 3;
            boxFill = '#49b0cc';
        }
*/
        this.sketch.fill(boxFill);
        this.sketch.stroke(strokeFill);
        this.sketch.strokeWeight(strokeVar);
        this.sketch.square(this.x, this.y, this.w, 33, 5,5,5);
    }

}