class EventHandler {
    constructor(sketch) {
        this.sketch = sketch;
        this.onSketch = true;
    }

    
    // when mouse is pressed
    mousePressed() {
        let sketch = this.sketch;
        this.onSketch = true;

        // verify if the mouse is on the sketch
        if(sketch.mouseY < 0) { //if mousePressed on top bar
            this.onSketch = false;
            return;
        } else if(sketch.mouseX < 0) { //if mousePressed on sidebar
            this.onSketch = false;
            return;
        } else{
            sketch.drag = null;
        }

        let pressedOnComponent = false;
        let pressedOnEdge = false;
        let drawEdge = false;

        // Selection component. Draw new edge if required
        for(let comp of sketch.allComponents) {

            if(comp.isMouseOverNode()) {
                new Edge(Component.clickedNode, sketch, sketch.edgeType)
                drawEdge = true;
                Edge.isDrawingNewEdge = true;
            } else if(comp.isMouseOver()) {
                pressedOnComponent = true;
                if(sketch.keyIsDown(17)) {
                    Component.addToActiveComponents(comp);
                } else {
                    Component.setActiveComponent(comp);
                    Edge.activeEdges = [];
                }
            }
        }

        // Selecting Edges
        for(let edge of sketch.allEdges) {
            if(edge.isMouseOver()) {
                pressedOnEdge = true;
                if(sketch.keyIsDown(17)) {
                    Edge.activeEdges.push(edge);
                } else {
                    Edge.activeEdges = [edge];
                    Component.resetActiveComponents();
                }
            }
        }
        
        // if pressed on the background
        if(!pressedOnComponent && !pressedOnEdge && !drawEdge) { 
            Edge.activeEdges = [];
            Component.resetActiveComponents();

            this.sketch.grid.startMoving()
        } else {// if pressed on a component or an edge
            for(let comp of sketch.allComponents) {
                if(Component.isInActive(comp) && !Component.mouseOnNode) {
                    Component.move = true;
                    //start moving
                    comp.startMoving();
                }
            }
        }


    }
    mouseDragged() {
        for(let comp of this.sketch.allComponents) {
            if(Component.isInActive(comp)) {
                comp.updatePosition()
            }
        }
    }

    mouseReleased() {
        let sketch = this.sketch;
        //Drag and drop elements to canvas from sidebar
        if(sketch.drag!=null && sketch.mouseX>0 && sketch.mouseY>0){

            let x = sketch.grid.getGridCoordinateX(sketch.mouseX) - (sketch.drag[0].width*sketch.grid.scalingFactor)/2;
            let y = sketch.grid.getGridCoordinateY(sketch.mouseY) - (sketch.drag[0].height*sketch.grid.scalingFactor)/2;
    
            // need to changed the new componentImg in future!!
            Action.undoStack.push(new Action(new Component(sketch.drag[0], sketch.drag[1], x, y, Component.getNextId(), sketch, sketch.grid), {
            "actionType": "create",
            }));
            sketch.drag = null;
        }

        if(this.sketch.grid.move) {
            this.sketch.grid.stopMoving();
        }

        // Changing Arc Selection
        if (sketch.select != null) {
            var allArcs = document.getElementById("top-bar").querySelectorAll(".top-bar-element");
            for (let arc of allArcs) {
                arc.style.border = "1px solid black";
            }
            document.getElementById(sketch.select[0].id).style.border = '2px solid #F00';
            sketch.edgeType = sketch.select[0].id;
        }

        if(!Edge.isDrawingNewEdge && this.onSketch) {
            console.log("stop")
            for(let comp of sketch.allComponents) {
                if(Component.isInActive(comp)) {
                    
                    //stop moving
                    comp.stopMoving();
                }
            }
        }

        Component.move = false;

        if (Edge.isDrawingNewEdge) {
            Edge.isDrawingNewEdge = false;
      
            let valid = sketch.allEdges[sketch.allEdges.length -1].isOnANode();
            if (valid) {
              sketch.allEdges[sketch.allEdges.length -1].changeState(1);
            } else {
              sketch.allEdges.pop();
            }
          }
    
    }

    resize() {
        let sketch = this.sketch;
        sketch.getDimensions();
        sketch.resizeCanvas(sketch.wanted_width, sketch.wanted_height, true);
    }

    mouseWheel(event) {
        // call the resize method in each component
        if(this.sketch.mouseX<0){return;};
        if(this.sketch.mouseY<0){return;};
        this.sketch.grid.resize(-event.delta/1000);
    }
}
