class RectangleContour {
  
  /**
   * Creating the vertex points for the component
   * @param  {} component
   */
  constructor(component) {
    this.component = component;
    this.sketch = this.component.sketch;
    this.grid = this.component.grid;
    this.size1 = 10;
    this.size2 = 15;
    this.showBox = false;

    // Vertex Locations
    if(component.type.id == "lg") {
      this.nodesLocation = [
        [
          function (component) {
            return component.x + component.w * component.grid.scalingFactor + component.calculatePadding() / 2
          },
          function (component) {
            return component.y + (component.h *(0.47)) * component.grid.scalingFactor + component.calculatePadding() / 2;
          },
        ],
        
        
      ]
      if(component.component.in == 1) {
        this.nodesLocation.push(
          [
            function (component) {
              return component.x - component.calculatePadding() / 2;
            },
            function (component) {
              return component.y + (component.h *(0.47)) * component.grid.scalingFactor + component.calculatePadding() / 2;
            },
          ],
        )
      } else if(component.component.in == 2) {
        this.nodesLocation.push(
          [
            function (component) {
              return component.x - component.calculatePadding() / 2;
            },
            function (component) {
              return component.y + (component.h *(0.27)) * component.grid.scalingFactor + component.calculatePadding() / 2;
            },
          ]
        );
        this.nodesLocation.push(
          [
            function (component) {
              return component.x - component.calculatePadding() / 2;
            },
            function (component) {
              return component.y + (component.h *(2/3)) * component.grid.scalingFactor + component.calculatePadding() / 2;
            },
          ]
        )
      }
    } else {
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
            return component.y + (component.h / 2) * component.grid.scalingFactor + component.calculatePadding() / 2;
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
        [
          function (component) {
            return component.x - component.calculatePadding() / 2;
          },
          function (component) {
            return component.y + (component.h / 2) * component.grid.scalingFactor + component.calculatePadding() / 2;
          },
        ],
      ];
    }
    this.nodes = [];
    this.createNodes();
  }

  // Creating an instance of the Vertex
  createNodes() {
    for (let node of this.nodesLocation) {
      this.nodes.push(new Node(this));
    }
  }

  // Showing the selected componen's border and nodes
  update() {
    this.showBox = Component.isInActive(this.component)

    for (let i = 0; i < this.nodesLocation.length; i++) {
      this.nodes[i].update(
        this.nodesLocation[i][0](this.component),
        this.nodesLocation[i][1](this.component)
      );

      if(this.showBox || Edge.isDrawingNewEdge) {
        this.nodes[i].show();
      }
    }
    if(this.showBox || Edge.isDrawingNewEdge) {
      this.show();
    }
  }

  // Checks if mouse is over vertex point
  isMouseOverNode() {
    let result = false
    for(let node of this.nodes) {
      if(node.getIsMouseOver()){
        result = true;
      };
    }
    return result;
  }

  // Show component border if selected
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
