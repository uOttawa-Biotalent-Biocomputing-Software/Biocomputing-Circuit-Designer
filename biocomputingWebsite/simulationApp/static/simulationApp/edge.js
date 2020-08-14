class Edge {

    static isDrawingNewEdge = false;
    static nextId = 0;
    static activeEdges = [];
    static edgePressed = false;

    static getNextId() {
        return Edge.nextId++;
    }


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

    executeOppositeAction(details) {
        if(details.actionType == "create") {
          this.delete();
        } else if (details.action == "delete") {
          this.create();
        }
        
    }

    executeAction(details) {
        if(details.actionType == "create") {
            this.create();
        } else if (details.action == "delete") {
            this.delete();
        }
    }
    
    create() {
        this.sketch.allEdges.push(this);

    }

    delete() {
        this.sketch.allEdges.pop(this);
    }

    isMouseOver() {
        let v3 = this.sketch.createVector(this.sketch.mouseX, this.sketch.mouseY);
        
        let angle = (this.sketch.createVector(v3.x-this.v1.x, v3.y-this.v1.y)).angleBetween(this.sketch.createVector(this.v2.x-this.v1.x, this.v2.y-this.v1.y))
        
        let dst = ((v3.x-this.v1.x)**2 + (v3.y-this.v1.y)**2)**0.5;
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
        // this.isMouseOver();
        this.calculateCoordinates();
        this.showEdge();
        
    }

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
        if(s == 1) {
            Action.undoStack.push(new Action(this, {
                "actionType": "create"
            }));
        }
    }
    
}