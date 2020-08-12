class Stack{
    // Array is used to implement stack 
    constructor() 
    { 
        this.items = []; 
    } 
  
    // push function 
    push(element) 
    { 
        // push element into the items 
        this.items.push(element); 
    } 

    // pop function 
    pop() 
    { 
        // return top most element in the stack 
        // and removes it from the stack 
        // Underflow if stack is empty 
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop(); 
    } 

    // isEmpty function 
    isEmpty() 
    { 
        // return true if stack is empty 
        return this.items.length == 0; 
    } 

    // printStack function 
    printStack() 
    { 
        var str = ""; 
        for (var i = 0; i < this.items.length; i++) 
            str += this.items[i] + " "; 
        return str; 
    }
}