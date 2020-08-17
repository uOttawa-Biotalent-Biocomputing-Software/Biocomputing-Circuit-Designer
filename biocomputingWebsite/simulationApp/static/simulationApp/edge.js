class Edge {
    static isDrawingNewEdge = false;
    static nextId = 0;
    static activeEdges = [];
    static edgePressed = false;

    // Choosing a Unique Edge ID
    static getNextId() {
        return Edge.nextId++;
    }

    // Checking if Edge is Selected
    static isInActive(edge) {
        let result = Edge.activeEdges.find(element => element === edge);

        return result;
    }

    /**
     * @param  {} from - edge starting component
     * @param  {} sketch
     * @param  {} type - type of connecting arc
     */
    constructor(from, sketch, type) {
        this.from = from;
        this.to;
        this.id = Edge.getNextId();
        
        //Line
        this.v1 = sketch.createVector(0,0);
        this.v2 = sketch.createVector(0,0);

        this.edgeType = type;

        this.state = 0;
        
        this.sketch = sketch;
        this.grid = sketch.grid;
        this.mouseOver = false;
        this.distToMouse = 20;
        this.create();
    }

    // Check explanation in Component.JS

    // Undo Component action
    executeOppositeAction(details) {
        if(details.actionType == "create") {
            this.delete();
        } else if (details.actionType == "delete") {
            this.create();
        }
        
    }

    // Redo Component action
    executeAction(details) {
        if(details.actionType == "create") {
            this.create();
        } else if (details.actionType == "delete") {
            this.delete();
        }
    }
    
    // Adding Edge to canvas
    create() {
        this.sketch.allEdges.push(this);
    }

    // Deleting Edge to canvas
    delete() {
        this.sketch.allEdges.splice(this.sketch.allEdges.indexOf(this), 1);
    }

    isMouseOver() {
        let tempVector = this.sketch.createVector(this.sketch.mouseX, this.sketch.mouseY); // New vector as mouse click
        
        // Angle between (v1/v2) and (v1/tempVector)
        let angle = (this.sketch.createVector(tempVector.x-this.v1.x, tempVector.y-this.v1.y)).angleBetween(this.sketch.createVector(this.v2.x-this.v1.x, this.v2.y-this.v1.y))
        
        let dst = ((tempVector.x-this.v1.x)**2 + (tempVector.y-this.v1.y)**2)**0.5;
        let dst1 = (dst*this.sketch.sin(angle));
        let dst2 = ((this.v2.x-this.v1.x)**2 + (this.v2.y-this.v1.y)**2)**0.5;
        if(this.sketch.abs(angle) < this.sketch.PI/2 && 
           this.sketch.abs(this.sketch.PI/2 && dst1) < this.distToMouse * this.grid.scalingFactor && 
           dst < dst2) {
            this.mouseOver = true;
            return true;
        } else {
            this.mouseOver = false;
            return false;
        }
    }
    
    update() {
        this.calculateCoordinates();
        this.showEdge();
    }

    // Get coordinates for v1 and v2 points location
    calculateCoordinates() {
        this.v1.x = this.from.realX;
        this.v1.y = this.from.realY;

        if(this.state == 0) {
            this.v2.x = this.sketch.mouseX;
            this.v2.y = this.sketch.mouseY;
        } 
        else if(this.state == 1) {
            this.v2.x = this.to.realX;
            this.v2.y = this.to.realY; 
        }
    }

    // Choosing which edge to display on the canvas, based on topbar in sketch
    showEdge() {
        if(Edge.activeEdges.find(element => element === this)) {
            this.sketch.stroke(0, 0, 0);
        } else {
            this.sketch.stroke(100, 100, 100)
        }
        if (this.edgeType == 'ca') {

            this.initializeEdge(() => {
                let radius = 17 * this.grid.scalingFactor;
               
                this.sketch.fill(0, 0, 0, 0);
                this.sketch.circle(0, (radius/2), (radius));
                
                return radius;
            })
        }   
        else if (this.edgeType == 'co' || this.edgeType == 'ea' ||this.edgeType == 'la') {
            this.initializeEdge(() => {return 0});
        }
        else if (this.edgeType == 'in') {
            
            this.initializeEdge(() => {
                let width = 15;
                
                this.sketch.line((-width*this.grid.scalingFactor), 0, width*this.grid.scalingFactor, 0);
                let distance = ((this.v2.x - this.v1.x)**2 + (this.v2.y-this.v1.y)**2)**(0.5);

                return 0;
            })
            
        }
        else if (this.edgeType == 'mo') {

            this.initializeEdge(() => {
                let width = 15 * this.grid.scalingFactor;
    
                this.sketch.push();
                this.sketch.rotate(this.sketch.PI/4);
                this.sketch.rect(0, 0, width, width);
                this.sketch.pop();

                return ((width**2) + (width**2))**0.5;
            })
        }
        else if (this.edgeType == 'ns') {
            
            this.initializeEdge(() => {
                let distLine = 15 * this.grid.scalingFactor;
                let triangle = 10 * this.grid.scalingFactor;
    
                this.sketch.fill(0, 0, 0, 0);
                this.sketch.triangle(0, 0, triangle, triangle, -triangle, triangle);
                this.sketch.line(-triangle, distLine, triangle, distLine);

                return distLine;
            })
        }
        else if (this.edgeType == 'pr') {
            
            this.initializeEdge(() => {
                let triangle = 10 * this.grid.scalingFactor;
                this.sketch.fill(0)
                this.sketch.triangle(0, 0, triangle, triangle, -triangle, triangle);

                return triangle;
            })
        }
        else if (this.edgeType == 'st') {
            
            this.initializeEdge(() => {
                let triangle = 10 * this.grid.scalingFactor;
                this.sketch.fill(0, 0, 0, 0);
                this.sketch.triangle(0, 0, triangle, triangle, -triangle, triangle);

                return triangle;
            })
        }
    }

    // Creating the base edge properties
    // EX. (Each edge always has a line)
    initializeEdge(drawFunction) {
        this.sketch.push();
        let a = this.sketch.atan2(this.v2.y- this.v1.y, this.v2.x-this.v1.x);
        this.sketch.translate(this.v2.x, this.v2.y);
        this.sketch.rotate(a + this.sketch.PI/2);

        let distLine = drawFunction();

        let distance = ((this.v2.x - this.v1.x)**2 + (this.v2.y-this.v1.y)**2)**(0.5);
        this.sketch.line(0, distLine, 0, distance);
        
        this.sketch.pop()
    }
    
    // Check if edge is connected to a node when being created
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

    // State changes when edge is connected to valid vertex
    changeState(s) {
        this.state = s;
        if(s == 1) {
            this.to.component.connectedEdges.push(this);
            this.from.component.connectedEdges.push(this);

            Action.undoStack.push(new Action(this, {
                "actionType": "create"
            }));
        }
    }
    
}