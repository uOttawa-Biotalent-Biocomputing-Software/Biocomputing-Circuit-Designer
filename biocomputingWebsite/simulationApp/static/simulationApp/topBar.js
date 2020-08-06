class topBar {
    constructor(heightPercent, sketch) {
        this.heightPercent = heightPercent;
        this.sketch = sketch;
        this.h = this.heightPercent * this.sketch.wanted_height / 100;
        this.mouseOnBar = false;
        this.mouseOnButton = false;
        this.buttonID = 0;
        this.icons = []

        for (let i = 0; i<3; i++) {
            this.icons.push(new topBarElement((this.h)*(i) + 5, 5, this.h-10, this.sketch));
        }
    }

    update() {
        this.show();
        this.mouseOnBar = (this.sketch.mouseY > 0 && this.sketch.mouseY < this.h);

        for(let icon of this.icons) {
            icon.update();
        }

        if (this.icons[0].mouseOnButton || this.icons[1].mouseOnButton || this.icons[2].mouseOnButton){
            this.mouseOnButton = true;
            if(this.sketch.mouseX < 5 + (this.h-10)){
                //back button
                this.buttonID = 1;
            }else if(this.sketch.mouseX < (this.h+5) + (this.h-10)){
                //forward button
                this.buttonID = 2;
            }else{
                //connecting arcs button
                this.buttonID = 3;
            }
        }else{
            this.buttonID = 0;
        }
    }

    show(){
        this.sketch.fill(0, 60, 100, 255);
        this.sketch.noStroke();
        this.sketch.rect(0, 0, this.sketch.wanted_width, this.h);
    }

    mousePressed() {
        // console.log("mouse pressed on bar");
    }
}
