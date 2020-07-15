class Edge {

    static isDrawingNewEdge = false;

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

    isOnANode() {
        let onNode = false;
        let selectedNode;
        for(let component of this.sketch.allComponents) {
            for(let node of component.rectangleContour.nodes) {
                if (node.getIsMouseOver()) {
                    onNode = true;
                    selectedNode = node; 
                }
            }
        }

        this.to = selectedNode;
        if(this.from.component == this.to.component) {
            return false;
        }

        return onNode;
    }

    changeState(s) {
        this.state = s;
    }
    
}