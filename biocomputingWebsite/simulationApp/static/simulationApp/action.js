class Action {

    static undoStack = new Stack();
    static redoStack = new Stack();

    static undo() {
        //pop an event from undoStack and add to redoStack

        if(!Action.undoStack.isEmpty()) {

            let action = Action.undoStack.pop();
            
            action.undoAction();
    
            
            Action.redoStack.push(action);
        }
    }

    static redo(){
        if(!Action.redoStack.isEmpty()) {

            //pop an event from redoStack and add to undoStack
            let action = Action.redoStack.pop();
            action.redoAction()
    
    
            Action.undoStack.push(action);
        }

    }


    constructor(element, details) {
        this.element = element;
        this.details = details;

        //keeping track of any event 
        Action.redoStack = new Stack();
    }


    undoAction() {
        this.element.executeOppositeAction(this.details);
    }

    redoAction() {
        this.element.executeAction(this.details);

    }
}


class ActionGroup {
    constructor(actions) {
        this.actions = actions;
    }


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