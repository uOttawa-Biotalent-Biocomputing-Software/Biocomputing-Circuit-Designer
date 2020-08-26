class Stack{
    constructor() 
    { 
        this.items = []; 
    } 
  
    // Adds element to stack
    push(element) 
    { 
        // push element into the items 
        this.items.push(element); 
    } 

    // Removes last element from stack and returns it 
    pop() 
    { 
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop(); 
    } 

    // Checks if stack is empty
    isEmpty() 
    { 
        // return true if stack is empty 
        return this.items.length == 0; 
    } 

    // Prints all elements in stack
    printStack() 
    { 
        var str = ""; 
        for (var i = 0; i < this.items.length; i++) 
            str += this.items[i] + " "; 
        return str; 
    }

    //FUTURE NOTE: Try adding a splice function
}