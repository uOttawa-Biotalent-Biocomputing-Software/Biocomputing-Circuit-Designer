class Edge {

    static isDrawingNewEdge = false;

    constructor(from, sketch, type) {
        this.from = from;
        this.to;
        
        this.realx1;
        this.realy1;
        this.realx2;
        this.realy2;

        // Line 1
        this.v1 = sketch.createVector(0,0);
        this.v2 = sketch.createVector(0,0);

        // Line 2
        this.v3 = sketch.createVector(50, 50);
        this.v4 = sketch.createVector(100, 100);

        this.edgeType = type;
        console.log(this.edgeType);

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

            this.v3.x = this.sketch.mouseX + 12;
            this.v3.y = this.sketch.mouseY;
        } else if(this.state == 1) {
            this.v2.x = this.to.realX;
            this.v2.y = this.to.realY;

            this.v3.x = this.to.realX + 32;
            this.v3.y = this.to.realY;        
        }

    }

    perp()
    {
        // First convert the line to a normalised unit vector
        let b=(this.v2.copy().sub(this.v1)).setMag(1)
        
        // Translate the target point and get the dot product
        let lambda=(this.v3.copy().sub(this.v1)).dot(b)
        this.v4=b.copy().mult(lambda).add(this.v1)  
    }

    showEdge() {
        if (this.edgeType == 'ca1') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x - 12, this.v2.y);
            this.sketch.circle(this.v2.x, this.v2.y, 24);
        }
        else if (this.edgeType == 'ca2' || this.edgeType == 'ca3' ||this.edgeType == 'ca5') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
        }
        else if (this.edgeType == 'ca4') {
            this.sketch.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
            this.sketch.line(this.v3.x, this.v2.y, this.v4.x, this.v4.y);
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