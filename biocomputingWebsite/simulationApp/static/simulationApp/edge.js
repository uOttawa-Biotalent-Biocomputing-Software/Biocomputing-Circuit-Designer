class Edge {

    static isDrawingNewEdge = false;

    constructor(from, sketch, type) {
        this.from = from;
        this.to;
        
        // Line 1
        this.v1 = sketch.createVector(0,0);
        this.v2 = sketch.createVector(0,0);

        // Line 2
        this.v3 = sketch.createVector(50, 50);
        this.v4 = sketch.createVector(100, 100);

        this.edgeType = type;

        this.state = 0;
        
        this.sketch = sketch;
        this.grid = sketch.grid;
    }
    

    update() {
        this.calculateCoordinates();
        this.perp();
        this.showEdge();
        
    }

    calculateCoordinates() {
        this.v1.x = this.from.realX;
        this.v1.y = this.from.realY;

        if(this.state == 0) {
            this.v2.x = this.sketch.mouseX;
            this.v2.y = this.sketch.mouseY;

            this.v3.x = this.sketch.mouseX;
            this.v3.y = this.sketch.mouseY;
        } 
        else if(this.state == 1) {
            this.v2.x = this.to.realX;
            this.v2.y = this.to.realY;

            this.v3.x = this.to.realX;
            this.v3.y = this.to.realY;    
        }
    }

    // Perpendicular Line Function
    perp() {
        // First convert the line to a normalised unit vector
        let b=(this.v2.copy().sub(this.v1)).setMag(1)
        
        // Translate the target point and get the dot product
        let lambda=(this.v3.copy().sub(this.v1)).dot(b)
        this.v4=b.copy().mult(lambda).add(this.v1)  
    }

    showEdge() {
        if (this.edgeType == 'ca') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x - 12, this.v2.y);
            this.sketch.fill(0, 0, 0, 0);
            this.sketch.circle(this.v2.x, this.v2.y, 24);
        }
        else if (this.edgeType == 'co' || this.edgeType == 'ea' ||this.edgeType == 'la') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
        }
        else if (this.edgeType == 'in') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
            this.sketch.line(this.v3.x + 32, this.v3.y, this.v4.x - 32, this.v4.y);
        }
        else if (this.edgeType == 'mo') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x - 32, this.v2.y);
            // Diamond Shape
            this.sketch.beginShape();
                this.sketch.fill(0, 0, 0, 0);
                this.sketch.vertex(this.v2.x - 32, this.v2.y);
                this.sketch.vertex(this.v2.x - 16, this.v2.y + 16);
                this.sketch.vertex(this.v2.x, this.v2.y);
                this.sketch.vertex(this.v2.x - 16, this.v2.y - 16);
            this.sketch.endShape(this.sketch.CLOSE);
        }
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

        if (selectedNode == undefined) {
            return false;
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