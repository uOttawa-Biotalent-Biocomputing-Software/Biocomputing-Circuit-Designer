class Sidebar {

    // Sidebar Titles
    static pool_nodes_title;
    static logic_title;
    static process_nodes_title;
    static reference_nodes_title;
    static arcs_title;

    constructor (sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.entityPoolNodes = [];
        this.logicOperators = [];
        this.processNodes = [];
        this.referenceNode = [];
        this.connectingArcs = [];

        //Entity Pool Nodes
        this.entityPoolNodes.push(new SB_Component(empty_img, 'Empty Set'               , 20, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(macro_img, 'Macro Molecule'          , 100, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(nuc_acid_img, 'Nucleic Acid Feature' , 180, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(pert_agent_img, 'Peturbing Agent'    , 20, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(simple_chem_img, 'Simple Chemical'   , 100, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(unspec_ent_img, 'Unspecified Entity' , 180, 130, sketch, grid));

        // this.entityPoolNodesGroup = new sideBarGroup('Entity Pool Nodes', this.entityPoolNodes);

        //Logic Operators
        Sidebar.logic_title = sketch.createElement('h4', 'Logic Operators:')
        Sidebar.logic_title.position(20, 200);
        this.logicOperators.push(new SB_Component(and_img, 'AND Operator', 20, 240, sketch, grid));
        this.logicOperators.push(new SB_Component(not_img, 'NOT Operator', 100, 240, sketch, grid));
        this.logicOperators.push(new SB_Component(or_img, 'OR Operator'  , 180, 240, sketch, grid));

        // Process Nodes
        Sidebar.process_nodes_title = sketch.createElement('h4', 'Process Nodes:')
        Sidebar.process_nodes_title.position(20, 310);
        this.processNodes.push(new SB_Component(assoc1_img, 'Association'            , 20, 350, sketch, grid));
        this.processNodes.push(new SB_Component(dissoc1_img, 'Dissociation'          , 100, 350, sketch, grid));
        this.processNodes.push(new SB_Component(omit_process1_img, 'Omitted Process' , 180, 350, sketch, grid));
        this.processNodes.push(new SB_Component(pheno1_img, 'Phenotype'              , 20, 420, sketch, grid));
        this.processNodes.push(new SB_Component(process1_img, 'Process'              , 100, 420, sketch, grid));
        this.processNodes.push(new SB_Component(uncert_pro1_img, 'Uncertain Process' , 180, 420, sketch, grid));

        // Reference Nodes
        Sidebar.reference_nodes_title = sketch.createElement('h4', 'Reference Nodes:')
        Sidebar.reference_nodes_title.position(20, 490);
        this.referenceNode.push(new SB_Component(tag_img, 'Tag', 20, 530, sketch, grid));

        // Connecting Arcs
        Sidebar.arcs_title = sketch.createElement('h4', 'Connecting Arcs:')
        Sidebar.arcs_title.position(20, 590);
        this.connectingArcs.push(new SB_Component(cat_img, 'Catalysis'                    , 20, 630, sketch, grid));
        this.connectingArcs.push(new SB_Component(consumption_img, 'Consumption'          , 100, 630, sketch, grid));
        this.connectingArcs.push(new SB_Component(eq_arc_img, 'Equinvalence Arc'          , 180, 630, sketch, grid));
        this.connectingArcs.push(new SB_Component(inhib_img, 'Inhibition'                 , 20, 700, sketch, grid));
        this.connectingArcs.push(new SB_Component(log_arc_img, 'Logic Arc'                , 100, 700, sketch, grid));
        this.connectingArcs.push(new SB_Component(mod_img, 'Modulation'                   , 180, 700, sketch, grid));
        this.connectingArcs.push(new SB_Component(nec_stim_img, 'Necessary Stimulation'   , 20, 770, sketch, grid));
        this.connectingArcs.push(new SB_Component(prod_img, 'Production'                  , 100, 770, sketch, grid));
        this.connectingArcs.push(new SB_Component(stim_img, 'Stimulation'                 , 180, 770, sketch, grid));
    }
} 