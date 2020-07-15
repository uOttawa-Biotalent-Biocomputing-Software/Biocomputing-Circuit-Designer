class RectangleContour {
  constructor(component) {
    this.component = component;
    this.sketch = this.component.sketch;
    this.grid = this.component.grid;
    this.size1 = 10;
    this.size2 = 20;

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
          return component.x + component.w / 2;
        },
        function (component) {
          return component.y - component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w + component.calculatePadding() / 2;
        },
        function (component) {
          return component.y - component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w + component.calculatePadding() / 2;
        },
        function (component) {
          return component.y + component.h + component.calculatePadding() / 2;
        },
      ],
      [
        function (component) {
          return component.x + component.w / 2;
        },
        function (component) {
          return component.y + component.h + component.calculatePadding() / 2;
        },
        2,
      ],
      [
        function (component) {
          return component.x - component.calculatePadding() / 2;
        },
        function (component) {
          return component.y + component.h + component.calculatePadding() / 2;
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
    let showBox = Component.active.includes(this.component.id);
    for (let i = 0; i < this.nodesLocation.length; i++) {
      this.nodes[i].update(
        this.nodesLocation[i][0](this.component),
        this.nodesLocation[i][1](this.component)
      );

      if(showBox) {
        // console.log(this.nodes[i]);
        this.nodes[i].show();
      }
    }
    if(showBox) {
      this.show();
    }
  }

  show() {
    let paddingX = this.component.calculatePadding();
    let paddingY = this.component.calculatePadding();
    this.sketch.fill(0, 0, 0, 0);
    this.sketch.rect(
      this.grid.getRealCoordinateX(this.component.x) - paddingX / 2,
      this.grid.getRealCoordinateY(this.component.y) - paddingY / 2,
      this.component.w + paddingX,
      this.component.h + paddingY,
      this.grid.scalingFactor * 0
    );

    
  }
}
