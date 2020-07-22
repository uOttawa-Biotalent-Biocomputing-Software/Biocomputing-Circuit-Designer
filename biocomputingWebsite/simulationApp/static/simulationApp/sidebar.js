class Sidebar {

    // Entity Pool Nodes
    static pool_nodes_title;
    
    constructor (sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.entityPoolNodes = [];

        //Entity Pool Nodes
        Sidebar.pool_nodes_title = sketch.createElement('h4', 'Entity Pool Nodes:')
        Sidebar.pool_nodes_title.position(20, 20);

        this.entityPoolNodes.push(new SB_Component(empty, 'Empty Set', 20, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(macro, 'Macro Molecule', 100, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(nuc_acid, 'Nucleic Acid Feature', 180, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(pert_agent, 'Peturbing Agent', 20, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(simple_chem, 'Simple Chemical', 100, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(unspec_ent, 'Unspecified Entity', 180, 130, sketch, grid));
    }
}