class Action {

    static undoStack = new Stack();
    static redoStack = new Stack();

    // Pop an element from undoStack and add to redoStack
    static undo() {
        if(!Action.undoStack.isEmpty()) {
            let action = Action.undoStack.pop();
            
            action.undoAction();
    
            Action.redoStack.push(action);
        }
    }

    // Pop an element from redoStack and add to undoStack
    static redo(){
        if(!Action.redoStack.isEmpty()) {
            let action = Action.redoStack.pop();

            action.redoAction()
    
            Action.undoStack.push(action);
        }

    }
    /**
     * @constructor
     * @param  {} element - element to perfom action on
     * @param  {} details - what action to perfom on element
     */
    constructor(element, details) {
        this.element = element;
        this.details = details;

        // Keeping track of any event 
        Action.redoStack = new Stack();
    }

    // Undo Action performed on selected elements
    undoAction() {
        this.element.executeOppositeAction(this.details);
    }

    // Redo Action performed on selected elements
    redoAction() {
        this.element.executeAction(this.details);
    }
}


class ActionGroup {

    /**
     * Deleting/Creating a set of selected components (instead of one at aa time)
     * @param  {} actions
     */
    constructor(actions) {
        this.actions = actions;
    }

    // Explanitory from Action class above
    undoAction() {
        for(let action of this.actions) {
            action.element.executeOppositeAction(action.details);
        }
    }

    redoAction() {
        for (let action of this.actions) {
            action.element.executeAction(action.details);
        }
    }
}