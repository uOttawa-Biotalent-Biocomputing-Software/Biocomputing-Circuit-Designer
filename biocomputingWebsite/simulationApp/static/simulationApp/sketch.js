const s = ( sketch ) => {

  sketch.getDimensions = () => {
    sketch.wanted_height = document.getElementById("myContainer").scrollHeight;
    sketch.wanted_width = document.getElementById("myContainer").scrollWidth;
  }

  sketch.grid = new Grid(sketch);
  sketch.backgroundPressed = false;
  sketch.wanted_height = 0;
  sketch.wanted_width = 0;
  sketch.getDimensions();

  sketch.allComponents = [];
  sketch.allEdges = [];

  sketch.edgeType = 'ca'; // Default
  
  sketch.selectedComp = -1; //index of selected component in allComponents array
  sketch.saveComponents = []; //any components to be saved for back/forward button
  sketch.backRecent = []; //any events/actions to be saved for back button
  sketch.forwardRecent = []; //any events/actions to be saved for the forward button
  sketch.deletedComp = []; //index of deleted components when they were in allComponents array
  sketch.addedComp = [];
  sketch.backEvent = ''; //current backEvent

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    sketch.pixelDensity(1);

    sketch.menu = new LoadMenues(sketch, sketch.grid);
    
    sketch.resize();
  }

  // p5.js continuously call this method
  sketch.draw = () => {
    sketch.background(183, 206, 212); // background color
    Component.beginUpdate();
    for (let comp of sketch.allComponents) {
      comp.update();
    }

    for (let edge of sketch.allEdges) {
      edge.update();
    }
    
  }

  // handle resize events
  sketch.resize = () => {
    sketch.getDimensions();
    sketch.resizeCanvas(sketch.wanted_width, sketch.wanted_height, true);

  }

  sketch.drag = null;
  sketch.select = null;
  sketch.click = null;
  
  // mouse pressed event
  sketch.mousePressed = () => {
    if(sketch.mouseY < 0) {return;}
    
    //if mousePressed on sidebar
    if(sketch.mouseX < 0) {
      return;
    }
    else{
      sketch.drag = null;
    }

    sketch.backgroundPressed = true;

    if (Component.mouseOnNode) {
      Action.undoStack.push(new Action(new Edge(Component.clickedNode, sketch, sketch.edgeType), 1));
      

      Component.resetActiveComponents();
      Edge.isDrawingNewEdge = true;

    } else if (!Component.mouseOnNode) {
      // loop over each component in the canvas and drag it if the mouse is over it
      for (let comp of sketch.allComponents) {
        if (comp.isMouseOver()) {
          sketch.backgroundPressed = false;
          sketch.selectedComp = sketch.allComponents.indexOf(comp);
          comp.startMoving();
        }
      }

      for (comp of sketch.allComponents) {
        if (Component.isInActive(comp.id)) {
          comp.startMoving();
        }
      }

      if (sketch.backgroundPressed) {
        sketch.selectedComp = -1;
        Component.resetActiveComponents();
        sketch.grid.startMoving();
        for (let comp of sketch.allComponents) {
          if (comp.move) {
            comp.stopMoving();
          }
        }
      }
    }
  }

  // mouse released event
  sketch.mouseReleased = () => {

    //Drag and drop elements to canvas from sidebar
    if(sketch.drag!=null && sketch.mouseX>0 && sketch.mouseY>0){

      x = sketch.grid.getGridCoordinateX(sketch.mouseX) - (sketch.drag[0].width*sketch.grid.scalingFactor)/2;
      y = sketch.grid.getGridCoordinateY(sketch.mouseY) - (sketch.drag[0].height*sketch.grid.scalingFactor)/2;

      // need to changed the new componentImg in future!!
      Action.undoStack.push(new Action(new Component(sketch.drag[0], sketch.drag[1], x, y, Component.getNextId(), sketch, sketch.grid), 1));
      sketch.backRecent.push('added');
      sketch.drag = null;
    }

    // Changing Arc Selection
    if (sketch.select != null) {
      var allArcs = document.getElementById("top-bar").querySelectorAll(".top-bar-element");
      for (arc of allArcs) {
        arc.style.border = "1px solid black";
      }
      document.getElementById(sketch.select[0].id).style.border = '2px solid #F00';
      sketch.edgeType = sketch.select[0].id;
    }

    if (Edge.isDrawingNewEdge) {
      Edge.isDrawingNewEdge = false;

      let valid = sketch.allEdges[sketch.allEdges.length -1].isOnANode();
      if (valid) {
        sketch.allEdges[sketch.allEdges.length -1].changeState(1);
      } else {
        sketch.allEdges.pop();
      }
    }
    
    //Top bar buttons for back/forward/delete
    /*
    if (sketch.click != null){

      if(sketch.click[0].id=='back'){
        //back button 
        if(sketch.backRecent.length > 0){
          var backToForwad = sketch.backRecent.pop();
          sketch.forwardRecent.push(backToForwad);
          sketch.backEvent = backToForwad;
          switch(sketch.backEvent){
            case 'deleted':
              var toDelete = sketch.saveComponents.pop();
              var addIndex = sketch.deletedComp.pop();
              sketch.addedComp.push(addIndex);

              sketch.allComponents.splice(addIndex,0,toDelete);
              break;
            case 'added':
              sketch.saveComponents.push(sketch.allComponents.pop());
              break;
            default:
              break;
          }
          //////
          console.log(sketch.backRecent, sketch.forwardRecent);
          console.log(sketch.saveComponents);
        }
        

      }else if(sketch.click[0].id=='forward'){
        //forward button
        if(sketch.forwardRecent.length > 0){
          var forwardToBack = sketch.forwardRecent.pop();
          sketch.backRecent.push(forwardToBack);
          switch(sketch.backEvent){
            case 'deleted':
              
              var toAdd = sketch.allComponents.pop();
              var deleteIndex = sketch.addedComp.pop();
              sketch.deletedComp.push(deleteIndex);

              sketch.saveComponents.splice(deleteIndex,0,toAdd);
              
              
              break;
            case 'added':
              sketch.allComponents.push(sketch.saveComponents.pop());
              //////
              console.log(sketch.backRecent, sketch.forwardRecent);
              console.log(sketch.saveComponents);
              break;
            default:
              break;
          }
        }


      }else if(sketch.click[0].id=='delete'){
        //delete component button
        if (sketch.selectedComp!=-1){
          sketch.saveComponents.push(sketch.allComponents[sketch.selectedComp]);
          sketch.allComponents.splice(sketch.selectedComp, 1);
          sketch.backRecent.push('deleted');
          sketch.deletedComp.push(sketch.selectedComp);
          sketch.selectedComp = -1;
        }
      }
      sketch.click = null;
    }*/

    // drop each component if it was previously dragged
    for (let comp of sketch.allComponents) {
      if (comp.move) {
        comp.stopMoving();
      }
    }
    if(sketch.backgroundPressed) {
      sketch.grid.stopMoving();
    }
  }
  for (comp of sketch.allComponents) {
    if (Component.isInActive(comp.id)) {
      comp.stopMoving();
    }
  }

  // when user scroll to resize the grid
  sketch.mouseWheel = (event) => {
    // call the resize method in each component
    if(sketch.mouseX<0){return;};
    if(sketch.mouseY<0){return;};
    sketch.grid.resize(-event.delta/1000) 
  }
}


// create the canvas with the sketch
var myp5 = new p5(s, document.getElementById("myContainer"));

// handle the resize event from the body
// call the resize method in p5
function resize(){
  myp5.resize();
}