class Edge {

    constructor(from, sketch) {
        this.from = from;
        this.to;
        
        this.realx1;
        this.realy1;

        this.realx2;
        this.realy2;

        this.state = 0;
        
        this.sketch = sketch;
        this.grid = sketch.grid;
    }
    

    update() {
        this.calculateCoordinates();
        this.showEdge();
        
    }

    calculateCoordinates() {
        this.realx1 = this.from.realX;
        this.realy1 = this.from.realY;

        if(this.state == 0) {
            this.realx2 = this.sketch.mouseX;
            this.realy2 = this.sketch.mouseY;
        } else if(this.state == 1) {
            this.realx2 = this.to.realX
            this.realy2 = this.to.realY;
        }
    }

    showEdge() {
        this.sketch.line(this.realx1, this.realy1, this.realx2, this.realy2);
    }

}