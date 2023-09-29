function infixToPostfix(infixExpression) {
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3
    };
  
    const isOperator = (char) => ['+', '-', '*', '/', '^'].includes(char);
    
    const outputQueue = [];
    const operatorStack = [];
  
    for (let token of infixExpression.split(/\s+/)) {
      token = token.trim();
  
      if (!isNaN(token)) {
        // Token is a number, so push it to the output queue.
        outputQueue.push(token);
      } else if (isOperator(token)) {
        // Token is an operator.
        while (
          operatorStack.length > 0 &&
          isOperator(operatorStack[operatorStack.length - 1]) &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          // Pop operators from the stack to the output queue until we find an operator
          // with lower precedence or an opening parenthesis.
          outputQueue.push(operatorStack.pop());
        }
        // Push the current operator onto the stack.
        operatorStack.push(token);
      } else if (token === '(') {
        // Token is an opening parenthesis, so push it onto the stack.
        operatorStack.push(token);
      } else if (token === ')') {
        // Token is a closing parenthesis.
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          // Pop operators from the stack to the output queue until we find an opening parenthesis.
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.length === 0 || operatorStack[operatorStack.length - 1] !== '(') {
          // Mismatched parentheses
          throw new Error('Mismatched parentheses in the expression');
        }
        // Pop the opening parenthesis from the stack (but do not push it to the output queue).
        operatorStack.pop();
      } else {
        // Invalid token
        throw new Error('Invalid token in the expression');
      }
    }
  
    // Pop any remaining operators from the stack to the output queue.
    while (operatorStack.length > 0) {
      if (operatorStack[operatorStack.length - 1] === '(' || operatorStack[operatorStack.length - 1] === ')') {
        // Mismatched parentheses
        throw new Error('Mismatched parentheses in the expression');
      }
      outputQueue.push(operatorStack.pop());
    }
  
    // Join the output queue into a space-separated string to get the postfix expression.
    return outputQueue.join(' ');
  }
  
  // Example usage:


  function evaluatePostfix(postfixExpression) {
    const stack = [];
    
    // Helper function to check if a token is an operator.
    const isOperator = (char) => ['+', '-', '*', '/', '^'].includes(char);
    
    for (let token of postfixExpression.split(/\s+/)) {
      token = token.trim();
      
      if (!isNaN(token)) {
        // Token is a number, push it onto the stack.
        stack.push(parseFloat(token));
      } else if (isOperator(token)) {
        // Token is an operator, pop the top two numbers from the stack,
        // apply the operator, and push the result back onto the stack.
        if (stack.length < 2) {
          throw new Error('Not enough operands for the operator ' + token);
        }
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        let result;
        switch (token) {
          case '+':
            result = operand1 + operand2;
            break;
          case '-':
            result = operand1 - operand2;
            break;
          case '*':
            result = operand1 * operand2;
            break;
          case '/':
            if (operand2 === 0) {
              throw new Error('Division by zero');
            }
            result = operand1 / operand2;
            break;
          case '^':
            result = Math.pow(operand1, operand2);
            break;
          default:
            throw new Error('Invalid operator ' + token);
        }
        stack.push(result);
      } else {
        // Invalid token
        throw new Error('Invalid token in the expression');
      }
    }
  
    if (stack.length !== 1) {
      throw new Error('Invalid expression');
    }
  
    // The result should be the only element left on the stack.
    return stack[0];
  }
  
  // Example usage:
  const infixExpression = "3 + 4 * 2 - 1";
  
 

  export { infixToPostfix,evaluatePostfix };
