class Sidebar {

    // Sidebar Titles
    static pool_nodes_title;
    static logic_title;
    static process_nodes_title;
    static reference_nodes_title;
    static arcs_title;
    static sbgn_bricks_title;
    // SBGN bricks subtitles;
    static catalysis_sub; 
    static compart_sub;
    static complex_dis_sub;
    static complex_form_sub
    static oligom_sub;
    static protein_sub;
    static reg_trans_sub;
    static trans_sub;
    
    constructor (sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.entityPoolNodes = [];
        this.logicOperators = [];
        this.processNodes = [];
        this.referenceNode = [];
        this.connectingArcs = [];
        //SBGN bricks
        this.catalysis = [];
        this.compart = [];
        this.complex_dis = [];
        this.complex_form = [];
        this.oligom = [];
        this.protein = [];
        this.reg_trans = [];
        this.trans = [];
        

        //Entity Pool Nodes
        Sidebar.pool_nodes_title = sketch.createElement('h4', 'Entity Pool Nodes:');
        Sidebar.pool_nodes_title.position(20, 20);
        this.entityPoolNodes.push(new SB_Component(empty, 'Empty Set'               , 20, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(macro, 'Macro Molecule'          , 100, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(nuc_acid, 'Nucleic Acid Feature' , 180, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(pert_agent, 'Peturbing Agent'    , 20, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(simple_chem, 'Simple Chemical'   , 100, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(unspec_ent, 'Unspecified Entity' , 180, 130, sketch, grid));

        //Logic Operators
        Sidebar.logic_title = sketch.createElement('h4', 'Logic Operators:');
        Sidebar.logic_title.position(20, 200);
        this.logicOperators.push(new SB_Component(and, 'AND Operator', 20, 240, sketch, grid));
        this.logicOperators.push(new SB_Component(not, 'NOT Operator', 100, 240, sketch, grid));
        this.logicOperators.push(new SB_Component(or, 'OR Operator'  , 180, 240, sketch, grid));

        // Process Nodes
        Sidebar.process_nodes_title = sketch.createElement('h4', 'Process Nodes:');
        Sidebar.process_nodes_title.position(20, 310);
        this.processNodes.push(new SB_Component(assoc, 'Association'            , 20, 350, sketch, grid));
        this.processNodes.push(new SB_Component(dissoc, 'Dissociation'          , 100, 350, sketch, grid));
        this.processNodes.push(new SB_Component(omit_process, 'Omitted Process' , 180, 350, sketch, grid));
        this.processNodes.push(new SB_Component(pheno, 'Phenotype'              , 20, 420, sketch, grid));
        this.processNodes.push(new SB_Component(process, 'Process'              , 100, 420, sketch, grid));
        this.processNodes.push(new SB_Component(uncert_pro, 'Uncertain Process' , 180, 420, sketch, grid));

        // Reference Nodes
        Sidebar.reference_nodes_title = sketch.createElement('h4', 'Reference Nodes:');
        Sidebar.reference_nodes_title.position(20, 490);
        this.referenceNode.push(new SB_Component(tag, 'Tag', 20, 530, sketch, grid));

        // Connecting Arcs
        Sidebar.arcs_title = sketch.createElement('h4', 'Connecting Arcs:');
        Sidebar.arcs_title.position(20, 600);
        this.connectingArcs.push(new SB_Component(cat, 'Catalysis'                    , 20, 640, sketch, grid));
        this.connectingArcs.push(new SB_Component(consumption, 'Consumption'          , 100, 640, sketch, grid));
        this.connectingArcs.push(new SB_Component(eq_arc, 'Equinvalence Arc'          , 180, 640, sketch, grid));
        this.connectingArcs.push(new SB_Component(inhib, 'Inhibition'                 , 20, 710, sketch, grid));
        this.connectingArcs.push(new SB_Component(log_arc, 'Logic Arc'                , 100, 710, sketch, grid));
        this.connectingArcs.push(new SB_Component(mod, 'Modulation'                   , 180, 710, sketch, grid));
        this.connectingArcs.push(new SB_Component(nec_stim, 'Necessary Stimulation'   , 20, 780, sketch, grid));
        this.connectingArcs.push(new SB_Component(prod, 'Production'                  , 100, 780, sketch, grid));
        this.connectingArcs.push(new SB_Component(stim, 'Stimulation'                 , 180, 780, sketch, grid));

        // SBGN bricks 
        Sidebar.sbgn_bricks_title = sketch.createElement('h4', 'SBGN Bricks:');
        Sidebar.sbgn_bricks_title.position(20, 850);

        Sidebar.catalysis_sub = sketch.createElement('h5', 'Catalysis:');
        Sidebar.catalysis_sub.position(20, 880);
        

    }
}