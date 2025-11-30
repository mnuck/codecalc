import { add, subtract, multiply, divide, modulo, swap, reciprocal, sqrt, sin, cos, tan, OperationResult } from './stackOperations';
import { OPERATORS } from './constants';

export interface RegisteredOperation {
  token: string;
  execute: (stack: number[]) => OperationResult;
  isRealTime: boolean;
}

/**
 * Registry for calculator operations
 * Eliminates switch statement by mapping tokens to operation functions
 */
export class OperationRegistry {
  private operations: Map<string, RegisteredOperation> = new Map();

  constructor() {
    this.registerDefaultOperations();
  }

  /**
   * Register a new operation
   */
  public register(token: string, execute: (stack: number[]) => OperationResult, isRealTime: boolean): void {
    this.operations.set(token, { token, execute, isRealTime });
  }

  /**
   * Find operation by token
   */
  public findOperation(token: string): RegisteredOperation | undefined {
    return this.operations.get(token);
  }

  /**
   * Execute an operation on a stack
   */
  public executeOperation(operation: RegisteredOperation, stack: number[]): OperationResult {
    return operation.execute(stack);
  }

  /**
   * Register all default operations
   */
  private registerDefaultOperations(): void {
    // Real-time arithmetic operators
    this.register(OPERATORS.ADD, add, true);
    this.register(OPERATORS.SUBTRACT, subtract, true);
    this.register(OPERATORS.MULTIPLY, multiply, true);
    this.register(OPERATORS.DIVIDE, divide, true);

    // On-Enter operators
    this.register(OPERATORS.MODULO, modulo, false);
    this.register(OPERATORS.SWAP, swap, false);
    this.register(OPERATORS.RECIPROCAL, reciprocal, false);
    this.register(OPERATORS.SQRT, sqrt, false);
    this.register(OPERATORS.SIN, sin, false);
    this.register(OPERATORS.COS, cos, false);
    this.register(OPERATORS.TAN, tan, false);
  }
}
