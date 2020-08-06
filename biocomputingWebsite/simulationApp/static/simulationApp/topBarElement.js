class topBarElement {
    constructor(x, y, w, sketch){
        this.x = x;
        this.y = y;
        this.w = w;
        this.sketch = sketch;
        this.mouseOnButton = false;

        this.boxFill = '#49b0cc';
        this.strokeVar = 2;
        this.strokeFill = '#f0d448';
    }

    update(){
        // if (case3==true){
        //     this.strokeFill = '#a6800d'; 
        //     this.strokeVar = 3;
        //     this.boxFill = '#11708a';
        // }
        // else{
            if (this.sketch.mouseX>this.x && this.sketch.mouseX<(this.x+this.w) && this.sketch.mouseY>this.y && this.sketch.mouseY<(this.y+this.w)){
                this.strokeFill = '#c79e22'; 
                this.strokeVar = 3;
                this.boxFill = '#1f8fad';
                this.mouseOnButton = true;
            }
            else{
                this.strokeFill = '#f0d448'; 
                this.strokeVar = 2;
                this.boxFill = '#49b0cc';
                this.mouseOnButton = false;
            }
        //}
        this.show();
    }

    show() {
        this.sketch.fill(this.boxFill);
        this.sketch.stroke(this.strokeFill);
        this.sketch.strokeWeight(this.strokeVar);
        this.sketch.square(this.x, this.y, this.w, 33, 5,5,5);
    }
}