export interface OperationResult {
  success: boolean;
  result?: number[];
  error?: string;
}

export function add(stack: number[]): OperationResult {
  if (stack.length < 2) {
    return { success: false, error: "Insufficient operands for addition" };
  }

  const b = stack[stack.length - 1];
  const a = stack[stack.length - 2];
  const newStack = stack.slice(0, -2);
  newStack.push(a + b);

  return { success: true, result: newStack };
}

export function subtract(stack: number[]): OperationResult {
  if (stack.length < 2) {
    return { success: false, error: "Insufficient operands for subtraction" };
  }

  const b = stack[stack.length - 1];
  const a = stack[stack.length - 2];
  const newStack = stack.slice(0, -2);
  newStack.push(a - b);

  return { success: true, result: newStack };
}

export function multiply(stack: number[]): OperationResult {
  if (stack.length < 2) {
    return { success: false, error: "Insufficient operands for multiplication" };
  }

  const b = stack[stack.length - 1];
  const a = stack[stack.length - 2];
  const newStack = stack.slice(0, -2);
  newStack.push(a * b);

  return { success: true, result: newStack };
}

export function divide(stack: number[]): OperationResult {
  if (stack.length < 2) {
    return { success: false, error: "Insufficient operands for division" };
  }

  const b = stack[stack.length - 1];
  const a = stack[stack.length - 2];

  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }

  const newStack = stack.slice(0, -2);
  newStack.push(a / b);

  return { success: true, result: newStack };
}

export function swap(stack: number[]): OperationResult {
  if (stack.length < 2) {
    return { success: false, error: "Insufficient operands for swap" };
  }

  const newStack = [...stack];
  const temp = newStack[newStack.length - 1];
  newStack[newStack.length - 1] = newStack[newStack.length - 2];
  newStack[newStack.length - 2] = temp;

  return { success: true, result: newStack };
}

export function reciprocal(stack: number[]): OperationResult {
  if (stack.length < 1) {
    return { success: false, error: "Insufficient operands for reciprocal" };
  }

  const a = stack[stack.length - 1];

  if (a === 0) {
    return { success: false, error: "Reciprocal of zero" };
  }

  const newStack = stack.slice(0, -1);
  newStack.push(1 / a);

  return { success: true, result: newStack };
}
