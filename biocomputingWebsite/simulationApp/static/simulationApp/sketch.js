let idClicked="empty";
let case3 = false;

const s = ( sketch ) => {


  sketch.getDimensions = () => {
    sketch.wanted_height = document.getElementById("myContainer").offsetHeight;
    sketch.wanted_width = document.getElementById("myContainer").offsetWidth;
  }

  sketch.grid = new Grid(sketch);
  sketch.backgroundPressed = false;
  sketch.wanted_height = 0;
  sketch.wanted_width = 0;
  sketch.getDimensions();

  sketch.allComponents = [];
  sketch.allComponentsBack = [];
  sketch.allEdges = [];

  //top bar
  sketch.topBar = new topBar(5, sketch);
  //connecting arc drop down menu
  sketch.connectArc = sketch.createSelect();
  sketch.connectArc.position(350,43);
  sketch.connectArc.option('Catalysis');
  sketch.connectArc.option('Consumption');
  sketch.connectArc.option('Equivalence Arc');
  sketch.connectArc.option('Inhibition');
  sketch.connectArc.option('Logic Arc');
  sketch.connectArc.option('Modulation');
  sketch.connectArc.option('Necessary Stimulation');
  sketch.connectArc.option('Production');
  sketch.connectArc.option('Stimulation');
  sketch.connectArc.hide();
  sketch.lineProperty = 1;

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    sketch.menu = new LoadMenues(sketch, sketch.grid)
    
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
    
    sketch.topBar.update();
  }

  // handle resize events
  sketch.resize = () => {
    sketch.getDimensions();
    sketch.resizeCanvas(sketch.wanted_width, sketch.wanted_height, true);
  }

  sketch.drag = null;
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

    //topbar
    if (sketch.topBar.mouseOnBar){
      if(sketch.topBar.mouseOnButton){
        console.log(sketch.topBar.buttonID);
        switch (sketch.topBar.buttonID){
          case 1:
            //back button
            if(sketch.allComponents.length>0){
              sketch.allComponentsBack.push(sketch.allComponents.pop());
            }
            break;
          case 2:
            //forward button
            if(sketch.allComponentsBack.length > 0){
              sketch.forwardComp = sketch.allComponentsBack.pop();
              sketch.allComponents.push(sketch.forwardComp);
            }
            break;
          case 3:
            //connecting arcs button
            if(case3 == true){
              sketch.connectArc.hide();
              console.log("hide select");
              case3 = false;
            }
            else{
              sketch.connectArc.show();
              sketch.connectArc.changed(sketch.connectArcSelect);
              console.log("appear select");
              case3 = true;
            }
            break;
          default:
            break;
        }
      }
    }
    else{

      sketch.backgroundPressed = true;
      // console.log('Canvas is Clicked');

      if (Component.mouseOnNode) {
        sketch.allEdges.push(new Edge(Component.clickedNode, sketch, sketch.lineProperty));
        Component.resetActiveComponents();
        Edge.isDrawingNewEdge = true;

      } else if (!Component.mouseOnNode) {
        // loop over each component in the canvas and drag it if the mouse is over it
        for (let comp of sketch.allComponents) {
          if (comp.isMouseOver()) {
            sketch.backgroundPressed = false;
            comp.startMoving();
          }
        }

        for (comp of sketch.allComponents) {
          if (Component.isInActive(comp.id)) {
            comp.startMoving();
          }
        }

        if (sketch.backgroundPressed) {
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
  }

  //connect arc option select event
  sketch.connectArcSelect = () => {
    let selected = sketch.connectArc.value();
    switch(selected){
      case 'Catalysis':
        sketch.lineProperty = 1;
        break;
      case 'Consumption':
        sketch.lineProperty = 2;
        break;
      case 'Equivalence Arc':
        sketch.lineProperty = 3;
        break;
      case 'Inhibition':
        sketch.lineProperty = 4;
        break;
      case 'Logic Arc':
        sketch.lineProperty = 5;
        break;
      case 'Modulation':
        sketch.lineProperty = 6;
        break;
      case 'Necessary Stimulation':
        sketch.lineProperty = 7;
        break;
      case 'Production':
        sketch.lineProperty = 8;
        break;
      case 'Stimulation':
        sketch.lineProperty = 9;
        break;
      default:
        break;
    }
  }

  // mouse released event
  sketch.mouseReleased = () => {

    //Drag and drop elements to canvas from sidebar
//    if(drag!=null && sketch.mouseX>0 && sketch.mouseY>0){
//      let w = 120 * sketch.grid.scalingFactor;
//      let h = 96 * sketch.grid.scalingFactor;
//      let x = sketch.grid.getGridCoordinateX(sketch.mouseX-w/2);
//      let y = sketch.grid.getGridCoordinateY(sketch.mouseY-h/2);

    if(sketch.drag!=null && sketch.mouseX>0 && sketch.mouseY>0){

      x = sketch.grid.getGridCoordinateX(sketch.mouseX) - (sketch.drag[0].width*sketch.grid.scalingFactor)/2;
      y = sketch.grid.getGridCoordinateY(sketch.mouseY) - (sketch.drag[0].height*sketch.grid.scalingFactor)/2;

      // need to changed the new componentImg in future!!
      sketch.allComponents.push(new Component(sketch.drag[0], sketch.drag[1], x, y, Component.getNextId(), sketch, sketch.grid));
      sketch.drag = null;
    }


    if (Edge.isDrawingNewEdge) {
      Edge.isDrawingNewEdge = false;
      // console.log(sketch.allEdges[sketch.allEdges.length -1]);
      // console.log(sketch.allEdges);

      let valid = sketch.allEdges[sketch.allEdges.length -1].isOnANode();
      if (valid) {
        sketch.allEdges[sketch.allEdges.length -1].changeState(1);
      } else {
        sketch.allEdges.pop();
      }
    }
    

    // drop each component if it was previously dragged
    for (let comp of sketch.allComponents) {
      if (comp.move) {
        comp.stopMoving();
      }
    }
    if(sketch.backgroundPressed) {
      sketch.grid.stopMoving();
    }
  
    for (comp of sketch.allComponents) {
      if (Component.isInActive(comp.id)) {
        comp.stopMoving();
      }
    }
  }

    // when user scroll to resize the grid
    sketch.mouseWheel = (event) => {
    // call the resize method in each component
    if(sketch.mouseX<0){return;};
    if(sketch.mouseY<0){return;};
    if (sketch.topBar.mouseOnBar){return;};
    sketch.grid.resize(-event.delta/1000); 
  }
}

// create the canvas with the sketch
var myp5 = new p5(s, document.getElementById("myContainer"));

// handle the resize event from the body
// call the resize method in p5
function resize(){
  myp5.resize();
}
