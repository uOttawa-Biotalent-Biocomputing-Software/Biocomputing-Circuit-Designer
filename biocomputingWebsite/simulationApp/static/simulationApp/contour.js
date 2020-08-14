class RectangleContour {
  constructor(component) {
    this.component = component;
    this.sketch = this.component.sketch;
    this.grid = this.component.grid;
    this.size1 = 10;
    this.size2 = 15;
    this.showBox = false;

    this.nodesLocation = [
      [
        function (component) {
          return component.x - component.calculatePadding() / 2;
        },
        function (component) {
          return component.y - component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w * component.grid.scalingFactor / 2;
        },
        function (component) {
          return component.y - component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w * component.grid.scalingFactor + component.calculatePadding() / 2;
        },
        function (component) {
          return component.y - component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w * component.grid.scalingFactor + component.calculatePadding() / 2;
        },
        function (component) {
          return component.y + component.h * component.grid.scalingFactor + component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w * component.grid.scalingFactor / 2;
        },
        function (component) {
          return component.y + component.h * component.grid.scalingFactor + component.calculatePadding() / 2;
        },
        2,
      ],
      [
        function (component) {
          return component.x - component.calculatePadding() / 2;
        },
        function (component) {
          return component.y + component.h * component.grid.scalingFactor + component.calculatePadding() / 2;
        },
      ],
    ];
    this.nodes = [];
    this.createNodes();
  }

  createNodes() {
    for (let node of this.nodesLocation) {
      this.nodes.push(new Node(this));
    }
  }

  update() {

    // let showBox = Component.isInActive(this.component) || Edge.isDrawingNewEdge;
    this.showBox = Component.isInActive(this.component)
    // console.log(this.component.id + " box | " + this.showBox);

    // console.log(showBox);
    for (let i = 0; i < this.nodesLocation.length; i++) {
      this.nodes[i].update(
        this.nodesLocation[i][0](this.component),
        this.nodesLocation[i][1](this.component)
      );

      if(this.showBox || Edge.isDrawingNewEdge) {
        // console.log(this.nodes[i]);
        this.nodes[i].show();
      }
    }
    if(this.showBox || Edge.isDrawingNewEdge) {
      this.show();
    }
  }

  isMouseOverNode() {
    let result = false
    for(let node of this.nodes) {
      if(node.getIsMouseOver()){
        result = true;
      };
    }
    return result;
  }

  show() {
    let paddingX = this.component.calculatePadding();
    let paddingY = this.component.calculatePadding();
    this.sketch.fill(0, 0, 0, 0);
    this.sketch.rect(
      this.grid.getRealCoordinateX(this.component.x) - paddingX / 2,
      this.grid.getRealCoordinateY(this.component.y) - paddingY / 2,
      this.component.w * this.grid.scalingFactor + paddingX,
      this.component.h * this.grid.scalingFactor + paddingY,
      this.grid.scalingFactor * 0
    );

    
  }
}
