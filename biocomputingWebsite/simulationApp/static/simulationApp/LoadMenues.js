class LoadMenues {


    constructor (sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.typesList = [];
        
    }

    loadMenues(components, types) {


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
            this.eComponents.push(new ExampleComponent(this.type, comp, this.sketch, this.grid));
        }
    }
}

// class topBarButtons {
//     // create the html components
//     constructor(f)
// }

class ExampleComponent{
    constructor (type, component, sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.component = component;
        this.type = type;
        this.parent;
        
        if (type.location == "side") {
            this.div = this.sketch.createDiv();
            this.div.parent(document.getElementById(this.type.id));
            this.div.class("grid-item");
            this.div.id(this.component.id);
            this.parent = document.getElementById(this.component.id)
            
            
        } else if(type.location == "top") {
            this.div = this.sketch.createDiv();
            this.div.parent(document.getElementsByClassName("top-bar")[0]);
            this.div.class("top-bar-element");
            this.div.id(this.component.id);

            this.parent = document.getElementById(this.component.id);
            
        }
        this.img = this.sketch.createImg(baseUrl+ "simulationApp/images/" + this.type.folder + this.component.img, this.component.name);
        this.img.parent(this.parent);
        this.img.id = "img-" + this.component.id;
        this.img.title = this.component.name;
        this.img.mousePressed(eval(this.component.function));

    }

    
}