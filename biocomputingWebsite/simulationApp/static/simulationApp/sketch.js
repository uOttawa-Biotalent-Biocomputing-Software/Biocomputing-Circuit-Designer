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
  // Molecular Species
  let dsna_button, genericSBGN_button, macro_button, naSBGN_button, noGlyphAssigned_button, replacementGlyph_button, smallMolecule_button, ssNA_button, complexPPSpec_button, complexSBGNSpec_button  ;

  componentCount = 4;

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    sketch.allComponents.push(new Component(im, 100, 50, 0, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 500, 50, 1, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 900, 50, 2, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 1300, 50, 3, sketch, sketch.grid));

    dsna_button = sketch.createImg(dsNA, 'DSNA');
    dsna_button.position(20, 50);
    dsna_button.mousePressed(function() {
      sketch.addComponent(1);
    }) 
    genericSBGN_button = sketch.createImg(generic_sbgn, 'Generic SBGN');
    genericSBGN_button.position(20, 100);
    genericSBGN_button.mousePressed(function() {
      sketch.addComponent(2);
    })
    macro_button = sketch.createImg(macromolecule, 'Macro Molecule');
    macro_button.position(20, 150);
    macro_button.mousePressed(function() {
      sketch.addComponent(3);
    })
    naSBGN_button = sketch.createImg(na_sbgn, 'NA SBGN');
    naSBGN_button.position(20, 200);
    naSBGN_button.mousePressed(function() {
      sketch.addComponent(4);
    })
    noGlyphAssigned_button = sketch.createImg(no_glyph_assigned, 'No Glyph Assigned');
    noGlyphAssigned_button.position(20, 250);
    noGlyphAssigned_button.mousePressed(function() {
      sketch.addComponent(5);
    })
    replacementGlyph_button = sketch.createImg(replacement_glyph, 'Replacement Glyph');
    replacementGlyph_button.position(20, 300);
    replacementGlyph_button.mousePressed(function() {
      sketch.addComponent(6);
    })
    smallMolecule_button = sketch.createImg(small_molecule, 'Small Molecule');
    smallMolecule_button.position(20, 350);
    smallMolecule_button.mousePressed(function() {
      sketch.addComponent(7);
    })
    ssNA_button = sketch.createImg(ssNA, 'SSNA');
    ssNA_button.position(20, 400);
    ssNA_button.mousePressed(function() {
      sketch.addComponent(8);
    })
    complexPPSpec_button = sketch.createImg(complex_pp_spec, 'Complex PP Spec');
    complexPPSpec_button.position(20, 450);
    complexPPSpec_button.mousePressed(function() {
      sketch.addComponent(9);
    })
    complexSBGNSpec_button = sketch.createImg(complex_sbgn_spec, 'Complex SBGN Spec');
    complexSBGNSpec_button.position(20, 500);
    complexSBGNSpec_button.mousePressed(function() {
      sketch.addComponent(10);
    })
    
  }

  sketch.addComponent = (type) => {
    switch (type) {
      case 1:
        sketch.allComponents.push(new Component(dsNA, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 2:
        sketch.allComponents.push(new Component(generic_sbgn, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 3:
        sketch.allComponents.push(new Component(macromolecule, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 4:
        sketch.allComponents.push(new Component(na_sbgn, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 5:
        sketch.allComponents.push(new Component(no_glyph_assigned, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 6:
        sketch.allComponents.push(new Component(replacement_glyph, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 7:
        sketch.allComponents.push(new Component(small_molecule, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 8:
        sketch.allComponents.push(new Component(ssNA, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 9:
        sketch.allComponents.push(new Component(complex_pp_spec, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 10:
        sketch.allComponents.push(new Component(complex_sbgn_spec, 700, 400, componentCount, sketch, sketch.grid));
        break;
    }
    componentCount++;
  }

  // p5.js continuously call this method
  sketch.draw = () => {
    sketch.background(255, 255, 255); // background color
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

  // mouse pressed event
  sketch.mousePressed = () => {
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