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
      //let empty_bool = false;
  let pool_nodes_title;
  // Connecting Arcs
  let cat_button, consumption_button, eq_arc_button, inhib_button, log_arc_button, mod_button, nec_stim_button, prod_button, stim_button;
  let connect_arc_title;
  // Logic Operators
  let and_button, not_button, or_button;
  let logic_op_title;
  // Process Nodes
  let association_button, dissoc_button, omit_process_button, pheno_button, process_button, uncert_process_button;
  let proc_nodes_title;
  // Reference Node
  let tag_button;
  let ref_node_title;

  // SBGN bricks
  let sbgn_bricks_title;
    // Catalysis
  let cat_subtitle;
  let PD_catirr_11_button, PD_catirr_12_button, PD_catirr_21_button, PD_catirr_22_button, PD_catrev_11_button, PD_catrev_22_button;
    // Compartmentation Transport 
  let compart_trans_subtitle;
  let PD_comp_act_button, PD_comp_pass_button;
    // Complex Dissociation
  let complex_diss_subtitle;
  let PD_comp_dissoc_button;
    // Complex Formation
  let complex_form_subtitle;
  let PD_comp_form_button;
    // Oligomerization Homodimerization
  let olig_homodimer_subtitle;
  let PD_homodimer_button;
    // Protein Phosphorylation
  let protein_phos_subtitle;
  let PD_phos_button;
    // Regulation of Transcription
  let reg_trans_subtitle;
  let PD_direct_reg_button, PD_trans_and_button;
    // Translation
  let translation_subtitle;
  let PD_translation_button;
  

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
    //empty_button.mouseOver(() => empty_bool = true);
    //empty_button.mouseOver(() => empty_bool = false);

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

    //Connecting Arcs
    connect_arc_title = sketch.createElement('h4', 'Connecting Arcs:')
    connect_arc_title.position(20, 200);

    cat_button = sketch.createImg(cat, 'Catalysis')
    cat_button.position(20, 240);
    cat_button.mousePressed(function() {
      sketch.addComponent(7);
    }) 
    consumption_button = sketch.createImg(consumption, 'Consumption');
    consumption_button.position(100, 240);
    consumption_button.mousePressed(function() {
      sketch.addComponent(8);
    })
    eq_arc_button = sketch.createImg(eq_arc, 'Equivalence Arc');
    eq_arc_button.position(180, 240);
    eq_arc_button.mousePressed(function() {
      sketch.addComponent(9);
    })
    inhib_button = sketch.createImg(inhib, 'Inhibition');
    inhib_button.position(20, 300);
    inhib_button.mousePressed(function() {
      sketch.addComponent(10);
    })
    log_arc_button = sketch.createImg(log_arc, 'Logic Arc');
    log_arc_button.position(100, 300);
    log_arc_button.mousePressed(function() {
      sketch.addComponent(11);
    })
    mod_button = sketch.createImg(mod, 'Modulation');
    mod_button.position(180, 300);
    mod_button.mousePressed(function() {
      sketch.addComponent(12);
    })
    nec_stim_button = sketch.createImg(nec_stim, 'Necessary Stimulation');
    nec_stim_button.position(20, 370);
    nec_stim_button.mousePressed(function() {
      sketch.addComponent(13);
    })
    prod_button = sketch.createImg(prod, 'Production');
    prod_button.position(100, 370);
    prod_button.mousePressed(function() {
      sketch.addComponent(14);
    })
    stim_button = sketch.createImg(stim, 'Stiumalation');
    stim_button.position(180, 370);
    stim_button.mousePressed(function() {
      sketch.addComponent(15);
    })

    //Logic Operators
    logic_op_title = sketch.createElement('h4', 'Logic Operators: ');
    logic_op_title.position(20, 430);

    and_button = sketch.createImg(and, 'And');
    and_button.position(20, 470);
    and_button.mousePressed(function() {
      sketch.addComponent(16);
    })
    or_button = sketch.createImg(or, 'Or');
    or_button.position(100, 470);
    or_button.mousePressed(function() {
      sketch.addComponent(17);
    })
    not_button = sketch.createImg(not, 'Not');
    not_button.position(180, 470);
    not_button.mousePressed(function() {
      sketch.addComponent(18);
    })

    //Process Nodes
    proc_nodes_title = sketch.createElement('h4', 'Process Nodes: ');
    proc_nodes_title.position(20, 530);

    association_button = sketch.createImg(assoc, 'Association');
    association_button.position(20, 570);
    association_button.mousePressed(function() {
      sketch.addComponent(19);
    })
    dissoc_button = sketch.createImg(dissoc, 'Dissociation');
    dissoc_button.position(100, 570);
    dissoc_button.mousePressed(function() {
      sketch.addComponent(20);
    })
    omit_process_button = sketch.createImg(omit_process, 'Omitted Process');
    omit_process_button.position(180, 570);
    omit_process_button.mousePressed(function() {
      sketch.addComponent(21);
    })
    pheno_button = sketch.createImg(pheno, 'Phenotype');
    pheno_button.position(20, 640);
    pheno_button.mousePressed(function() {
      sketch.addComponent(22);
    })
    process_button = sketch.createImg(process, 'Process');
    process_button.position(100, 640);
    process_button.mousePressed(function() {
      sketch.addComponent(23);
    })
    uncert_process_button = sketch.createImg(uncert_pro, 'Uncertain Process');
    uncert_process_button.position(180, 640);
    uncert_process_button.mousePressed(function() {
      sketch.addComponent(24);
    })

    //Reference Nodes
    ref_node_title = sketch.createElement('h4', 'Reference Node: ');
    ref_node_title.position(20,700);

    tag_button = sketch.createImg(tag, 'Tag');
    tag_button.position(20,740);
    tag_button.mousePressed(function() {
      sketch.addComponent(25);
    })

    //SBGN bricks
    //to include or not?
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
      case 7: 
        sketch.allComponents.push(new Component(cat, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 8:
        sketch.allComponents.push(new Component(consumption, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 9:
        sketch.allComponents.push(new Component(eq_arc, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 10:
        sketch.allComponents.push(new Component(inhib, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 11:
        sketch.allComponents.push(new Component(log_arc, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 12:
        sketch.allComponents.push(new Component(mod, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 13:
        sketch.allComponents.push(new Component(nec_stim, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 14:
        sketch.allComponents.push(new Component(prod, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 15:
        sketch.allComponents.push(new Component(stim, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 16:
        sketch.allComponents.push(new Component(and, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 17:
        sketch.allComponents.push(new Component(or, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 18:
        sketch.allComponents.push(new Component(not, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 19:
        sketch.allComponents.push(new Component(assoc, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 20:
        sketch.allComponents.push(new Component(dissoc, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 21:
        sketch.allComponents.push(new Component(omit_process, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 22:
        sketch.allComponents.push(new Component(pheno, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 23:
        sketch.allComponents.push(new Component(process, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 24:
        sketch.allComponents.push(new Component(uncert_pro, 700, 400, componentCount, sketch, sketch.grid));
        break;
      case 25:
        sketch.allComponents.push(new Component(tag, 700, 400, componentCount, sketch, sketch.grid));
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