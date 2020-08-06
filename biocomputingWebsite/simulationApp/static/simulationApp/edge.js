class Edge {

    static isDrawingNewEdge = false;

    constructor(from, sketch, lineProperty) {
        this.from = from;
        this.to;
        
        this.realx1;
        this.realy1;

        this.realx2;
        this.realy2;

        this.state = 0;
        
        this.sketch = sketch;
        this.grid = sketch.grid;

        //testing line property with different colour lines
        this.lineProperty = lineProperty;
        this.lineFill = 0;
        //replaced as colours for now to test functionality
        //later replace with proper connecting arc shape
        switch(this.lineProperty){
            case 1:
                this.lineFill = 'red';
                break;
            case 2:
                this.lineFill = 'blue';
                break;
            case 3:
                this.lineFill = 'green';
                break;
            case 4:
                this.lineFill = 'yellow';
                break;
            case 5:
                this.lineFill = 'pink'
                break;
            case 6:
                this.lineFill = 'orange';
                break;
            case 7:
                this.lineFill = 'white';
                break;
            case 8:
                this.lineFill = 'purple';
                break;
            case 9:
                this.lineFill = 'grey';
                break;
            default:
                break;
        }
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
        //later replace with proper connecting arc shape
        this.sketch.stroke(this.lineFill);
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