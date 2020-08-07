let idClicked="empty";

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
  sketch.allEdges = [];

  sketch.topBar = new topBar(5, sketch);

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    // sketch.allComponents.push(new Component(imTest, 100, 50, Component.getNextId(), sketch, sketch.grid));
    // sketch.allComponents.push(new Component(imTest, 500, 50, Component.getNextId(), sketch, sketch.grid));
    // sketch.allComponents.push(new Component(imTest, 900, 50, Component.getNextId(), sketch, sketch.grid));
    // sketch.allComponents.push(new Component(imTest, 1300, 50, Component.getNextId(), sketch, sketch.grid));

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
      // if(idClicked!="empty"){
      //   drag = document.getElementById(idClicked).src;
      //   idClicked = 'empty';
      // }else{
      //   drag = null;
      // }
      // return;
    }
    else{
      sketch.drag = null;
    }

    if (sketch.topBar.mouseOnBar) {
      sketch.topBar.mousePressed();
      return;
    }

    sketch.backgroundPressed = true;
    // console.log('Canvas is Clicked');

    if (Component.mouseOnNode) {
      sketch.allEdges.push(new Edge(Component.clickedNode, sketch));
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

  // mouse released event
  sketch.mouseReleased = () => {

    //Drag and drop elements to canvas from sidebar
    if(sketch.drag!=null && sketch.mouseX>0 && sketch.mouseY>0){

      let x;
      let y;
      let w = 300;
      let h = 100;
      let offsetX = 0;
      let offsetY = 0;

      x = sketch.mouseX - w/2 + offsetX;
      y = sketch.mouseY - h/2 + offsetY;

      offsetX = -sketch.mouseX + x + w/2;
      offsetY = -sketch.mouseY + y + h/2;

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
    if (sketch.topBar.mouseOnBar){return;};
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