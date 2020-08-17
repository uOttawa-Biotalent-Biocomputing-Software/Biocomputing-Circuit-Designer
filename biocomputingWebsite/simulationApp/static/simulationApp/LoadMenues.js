class LoadMenues {

    /**
     * Loads the sidebar and topbar buttons
     * @constructor
     * @param  {} sketch
     * @param  {} grid
     */
    constructor (sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.typesList = [];
        
    }
    
    /**
     * Sorts each component into their repected component type, intialzed in JSON file
     * @param  {} components - sbgnComponent.JSON as imported
     * @param  {} types - componentTypes.JSON as imported
     */
    SortComponentTypes(components, types) {
        for(let type of types["Components Types"]) {
            let comps = [];
            for(let c of components["Components"]) {
                if (c.typeId == type.id) {
                    comps.push(c);
                }
            }
            this.typesList.push(new ComponentType(type, comps, this.sketch, this.grid));
        }
    }

}

class ComponentType {
    
    /**
     * Creates an accordian in HTML for the component types and adds the corresponding compoents
     * @param  {} type
     * @param  {} components
     * @param  {} sketch
     * @param  {} grid
     */
    constructor (type, components ,sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.type = type;
        this.components = components;

        if (type.location == "side") {
            this.button = this.sketch.createButton(this.type.name);
            this.button.parent(document.getElementById('components'));
            this.button.class("accordion");
            
            this.div = this.sketch.createDiv();
            this.div.class('panel');
            this.div.parent(document.getElementById('components'));
            this.div.id(this.type.id);
        }
        
        this.eComponents = [];
        for (let comp of components) {
            this.eComponents.push(new SBGN_Component(this.type, comp, this.sketch, this.grid));
        }
    }
}

class SBGN_Component {
    /**
     * Creating an SBGN Compoent class
     * @param  {} type
     * @param  {} component
     * @param  {} sketch
     * @param  {} grid
     */
    constructor (type, component, sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.component = component;
        this.type = type;
        this.parent;
        
        if (type.location == "side") {      //Sidebar component
            this.div = this.sketch.createDiv();
            this.div.parent(document.getElementById(this.type.id));
            this.div.class("grid-item");
            this.div.id(this.component.id);

            this.parent = document.getElementById(this.component.id)
        } 
        else if(type.location == "top") {   //Topbar Component

            this.div = this.sketch.createDiv();
            this.div.parent(document.getElementsByClassName("top-bar")[0]);

            if(type.folder == "connecting_arcs/"){
                this.div.class("top-bar-element");
            }else{
                this.div.class("top-bar-interact");
            }
            this.div.id(this.component.id);
            this.parent = document.getElementById(this.component.id);
            
        }

        // Adding Image + Properties from JSON Components File
        this.img = this.sketch.createImg(baseUrl+ "simulationApp/images/" + this.type.folder + this.component.img, this.component.name);
        this.img.parent(this.parent);
        this.img.id = "img-" + this.component.id;
        this.img.title = this.component.name;

        this.div.mousePressed(eval(this.component.function));
        this.img.size(this.component.width, this.component.height);

    }
}