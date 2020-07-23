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
  // Entity Pool Nodes
  let empty_button, macro_button, nuc_button, pert_button, simple_chem_button, unspec_ent_button;
  let pool_nodes_title;

  componentCount = 4;

  sketch.topBar = new topBar(5, sketch);

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    sketch.allComponents.push(new Component(im, 100, 50, 0, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 500, 50, 1, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 900, 50, 2, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 1300, 50, 3, sketch, sketch.grid));

    // Entity Pool Nodes
    pool_nodes_title = sketch.createElement('h4', 'Entity Pool Nodes:')
    pool_nodes_title.position(20, 20);
    empty_button = sketch.createImg(empty, 'DSNA')
    empty_button.position(20, 60);
    empty_button.mousePressed(function() {
      sketch.addComponent(1);
    }) 
    macro_button = sketch.createImg(macro, 'Generic SBGN');
    macro_button.position(100, 60);
    macro_button.mousePressed(function() {
      sketch.addComponent(2);
    })
    nuc_button = sketch.createImg(nuc_acid, 'Macro Molecule');
    nuc_button.position(180, 60);
    nuc_button.mousePressed(function() {
      sketch.addComponent(3);
    })
    pert_button = sketch.createImg(pert_agent, 'NA SBGN');
    pert_button.position(20, 130);
    pert_button.mousePressed(function() {
      sketch.addComponent(4);
    })
    simple_chem_button = sketch.createImg(simple_chem, 'No Glyph Assigned');
    simple_chem_button.position(100, 130);
    simple_chem_button.mousePressed(function() {
      sketch.addComponent(5);
    })
    unspec_ent_button = sketch.createImg(unspec_ent, 'Replacement Glyph');
    unspec_ent_button.position(180, 130);
    unspec_ent_button.mousePressed(function() {
      sketch.addComponent(6);
    })
  }

  sketch.addComponent = (type) => {
    switch (type) {
      case 1:
        sketch.allComponents.push(new Component(empty, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 2:
        sketch.allComponents.push(new Component(macro, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 3:
        sketch.allComponents.push(new Component(nuc_acid, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 4:
        sketch.allComponents.push(new Component(pert_agent, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 5:
        sketch.allComponents.push(new Component(simple_chem, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 6:
        sketch.allComponents.push(new Component(unspec_ent, 700, 400, componentCount, sketch, sketch.grid));
        break;
    }
    componentCount++;
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

  // mouse pressed event
  sketch.mousePressed = () => {
    if(sketch.mouseY < 0) {return;}

    if (sketch.topBar.mouseOnBar) {
      sketch.topBar.mousePressed();
      return;
    }

    sketch.backgroundPressed = true;
    console.log('Canvas is Clicked');

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