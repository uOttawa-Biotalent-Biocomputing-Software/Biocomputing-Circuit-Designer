class Action {

    static undoStack = new Stack();
    static redoStack = new Stack();

    static undo() {
        //pop an event from undoStack and add to redoStack

        if(!Action.undoStack.isEmpty()) {

            let action = Action.undoStack.pop();
            console.log(action);
            
            action.undoAction();
    
            
            Action.redoStack.push(action);
        }
    }

    static redo(){
        if(!Action.redoStack.isEmpty()) {

            //pop an event from redoStack and add to undoStack
            let action = Action.redoStack.pop();
            console.log("Redo");
            action.redoAction()
    
    
            Action.undoStack.push(action);
        }

    }

    constructor(element, actionType) {
        this.element = element;
        this.actionType = actionType; // created = 1 or deleted = 0

        //keeping track of any event 
        Action.redoStack = new Stack();
    }


    undoAction() {
        if(this.actionType == 1) { //if it was created
            this.element.delete();
        } else {//if it was deleted
            this.element.create();
        }
    }

    redoAction() {
        if(this.actionType == 0) { //if it was deleted
            this.element.delete();
        } else {//if it was added
            this.element.create();
        }
    }
}
