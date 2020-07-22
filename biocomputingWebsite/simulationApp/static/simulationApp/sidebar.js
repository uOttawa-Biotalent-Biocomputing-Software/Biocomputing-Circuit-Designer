class Sidebar {

    // Entity Pool Nodes
    static pool_nodes_title;
    static empty_button
    static macro_button
    static nuc_button
    static pert_button
    static simple_chem_button
    static unspec_ent_button;
    
    constructor (count, sketch, grid) {
        this.sketch = sketch;
        this.componentCount = count;
        this.grid = grid;

        //Entity Pool Nodes
        Sidebar.pool_nodes_title = sketch.createElement('h4', 'Entity Pool Nodes:')
        Sidebar.pool_nodes_title.position(20, 20);
        Sidebar.empty_button = sketch.createImg(empty, 'DSNA')
        Sidebar.empty_button.position(20, 60);
        Sidebar.empty_button.mousePressed(function() {
            addComponent(1);
        }) 
        Sidebar.macro_button = sketch.createImg(macro, 'Generic SBGN');
        Sidebar.macro_button.position(100, 60);
        Sidebar.macro_button.mousePressed(function() {
            addComponent(2);
        })
        Sidebar.nuc_button = sketch.createImg(nuc_acid, 'Macro Molecule');
        Sidebar.nuc_button.position(180, 60);
        Sidebar.nuc_button.mousePressed(function() {
            addComponent(3);
        })
        Sidebar.pert_button = sketch.createImg(pert_agent, 'NA SBGN');
        Sidebar.pert_button.position(20, 130);
        Sidebar.pert_button.mousePressed(function() {
            addComponent(4);
        })
        Sidebar.simple_chem_button = sketch.createImg(simple_chem, 'No Glyph Assigned');
        Sidebar.simple_chem_button.position(100, 130);
        Sidebar.simple_chem_button.mousePressed(function() {
            addComponent(5);
        })
        Sidebar.unspec_ent_button = sketch.createImg(unspec_ent, 'Replacement Glyph');
        Sidebar.unspec_ent_button.position(180, 130);
        Sidebar.unspec_ent_button.mousePressed(function() {
            addComponent(6);
        })
    }

    addComponent = (type) => {
        switch (type) {
        case 1:
            this.sketch.allComponents.push(new Component(empty, 700, 400, this.componentCount, this.sketch, this.grid));
            break;
        case 2:
            this.sketch.allComponents.push(new Component(macro, 700, 400, this.componentCount, this.sketch, this.grid));
            break;
        case 3:
            this.sketch.allComponents.push(new Component(nuc_acid, 700, 400, this.componentCount, this.sketch, this.grid));
            break;
        case 4:
            this.sketch.allComponents.push(new Component(pert_agent, 700, 400, this.componentCount, this.sketch, this.grid));
            break;
        case 5:
            this.sketch.allComponents.push(new Component(simple_chem, 700, 400, this.componentCount, this.sketch, this.grid));
            break;
        case 6:
            this.sketch.allComponents.push(new Component(unspec_ent, 700, 400, this.componentCount, this.sketch, this.grid));
            break;
        }
        this.componentCount++;
    }
}