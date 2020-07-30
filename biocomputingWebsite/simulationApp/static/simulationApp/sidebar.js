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
        this.entityPoolNodes.push(new SB_Component(empty_img, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(macro_img, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(nuc_acid_img, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(pert_agent_img, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(simple_chem_img, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(unspec_ent_img, sketch, grid));

        // this.entityPoolNodesGroup = new sideBarGroup('Entity Pool Nodes', this.entityPoolNodes);

        //Logic Operators
        // Sidebar.logic_title = sketch.createElement('h4', 'Logic Operators:')
        // Sidebar.logic_title.position(20, 200);
        this.logicOperators.push(new SB_Component(and_img, sketch, grid));
        this.logicOperators.push(new SB_Component(not_img, sketch, grid));
        this.logicOperators.push(new SB_Component(or_img, sketch, grid));

        // Process Nodes
        // Sidebar.process_nodes_title = sketch.createElement('h4', 'Process Nodes:')
        // Sidebar.process_nodes_title.position(20, 310);
        this.processNodes.push(new SB_Component(assoc1_img, sketch, grid));
        this.processNodes.push(new SB_Component(dissoc1_img, sketch, grid));
        this.processNodes.push(new SB_Component(omit_process1_img, sketch, grid));
        this.processNodes.push(new SB_Component(pheno1_img, sketch, grid));
        this.processNodes.push(new SB_Component(process1_img, sketch, grid));
        this.processNodes.push(new SB_Component(uncert_pro1_img, sketch, grid));

        // Reference Nodes
        // Sidebar.reference_nodes_title = sketch.createElement('h4', 'Reference Nodes:')
        // Sidebar.reference_nodes_title.position(20, 490);
        this.referenceNode.push(new SB_Component(tag_img, sketch, grid));

        // Connecting Arcs
        // Sidebar.arcs_title = sketch.createElement('h4', 'Connecting Arcs:')
        // Sidebar.arcs_title.position(20, 590);
        this.connectingArcs.push(new SB_Component(cat_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(consumption_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(eq_arc_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(inhib_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(log_arc_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(mod_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(nec_stim_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(prod_img, sketch, grid));
        this.connectingArcs.push(new SB_Component(stim_img, sketch, grid));
    }
}