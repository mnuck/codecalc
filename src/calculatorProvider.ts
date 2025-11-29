import * as vscode from 'vscode';
import { add, subtract, multiply, divide, modulo, swap, reciprocal, sqrt, sin, cos, tan, OperationResult } from './stackOperations';
import { OPERATORS, OPERATOR_LIST } from './constants';

interface CalcBlock {
  startLine: number;
  endLine: number;
  stack: number[];
}

export class CalculatorProvider {
  private calcBlocks: Map<string, CalcBlock[]> = new Map();
  private isProcessingUpdate = false;
  private parseCache: Map<string, { version: number; blocks: CalcBlock[] }> = new Map();

  public activate(context: vscode.ExtensionContext): void {
    vscode.workspace.onDidChangeTextDocument(
      (event) => this.onDocumentChange(event),
      null,
      context.subscriptions
    );

    vscode.workspace.onDidCloseTextDocument(
      (document) => this.onDocumentClose(document),
      null,
      context.subscriptions
    );
  }

  private onDocumentClose(document: vscode.TextDocument): void {
    const docKey = document.uri.toString();
    this.calcBlocks.delete(docKey);
    this.parseCache.delete(docKey);
  }

  private onDocumentChange(event: vscode.TextDocumentChangeEvent): void {
    // Ignore changes triggered by our own updates
    if (this.isProcessingUpdate) {
      return;
    }

    const document = event.document;
    const docKey = document.uri.toString();
    const blocks = this.getCachedBlocks(document);
    this.calcBlocks.set(docKey, blocks);

    for (const change of event.contentChanges) {
      const changedLineNumber = document.positionAt(change.rangeOffset).line;
      const activeBlock = this.findBlockContainingLine(blocks, changedLineNumber);

      if (activeBlock) {
        this.processBlock(document, activeBlock, change);
      }
    }
  }

  private getCachedBlocks(document: vscode.TextDocument): CalcBlock[] {
    const docKey = document.uri.toString();
    const cached = this.parseCache.get(docKey);

    // Use cached result if document version hasn't changed
    if (cached && cached.version === document.version) {
      return cached.blocks;
    }

    // Parse and cache
    const blocks = this.findCalcBlocks(document);
    this.parseCache.set(docKey, { version: document.version, blocks });
    return blocks;
  }

  private findCalcBlocks(document: vscode.TextDocument): CalcBlock[] {
    const blocks: CalcBlock[] = [];
    let inBlock = false;
    let startLine = -1;

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i).text.trim();

      if (line === '```calc') {
        if (!inBlock) {
          inBlock = true;
          startLine = i;
        }
      } else if (line === '```' && inBlock) {
        blocks.push({
          startLine: startLine + 1,
          endLine: i - 1,
          stack: this.parseStack(document, startLine + 1, i - 1)
        });
        inBlock = false;
        startLine = -1;
      }
    }

    return blocks;
  }

  private parseStack(document: vscode.TextDocument, startLine: number, endLine: number): number[] {
    const stack: number[] = [];

    for (let i = startLine; i <= endLine && i < document.lineCount; i++) {
      const line = document.lineAt(i).text.trim();

      // Skip operator lines
      if (OPERATOR_LIST.includes(line)) {
        continue;
      }

      const num = parseFloat(line);

      if (!isNaN(num) && line !== '') {
        stack.push(num);
      }
    }

    return stack;
  }

  private findBlockContainingLine(blocks: CalcBlock[], lineNumber: number): CalcBlock | undefined {
    return blocks.find(block => lineNumber >= block.startLine && lineNumber <= block.endLine + 1);
  }

  private processBlock(document: vscode.TextDocument, block: CalcBlock, change: vscode.TextDocumentContentChangeEvent): void {
    const changedLineNumber = document.positionAt(change.rangeOffset).line;
    const isEnterPress = change.text.includes('\n');
    const line = document.lineAt(changedLineNumber).text.trim();

    let operation: ((stack: number[]) => OperationResult) | undefined;
    let isRealTime = false;

    switch (line) {
      case OPERATORS.ADD:
        operation = add;
        isRealTime = true;
        break;
      case OPERATORS.SUBTRACT:
        operation = subtract;
        isRealTime = true;
        break;
      case OPERATORS.MULTIPLY:
        operation = multiply;
        isRealTime = true;
        break;
      case OPERATORS.DIVIDE:
        operation = divide;
        isRealTime = true;
        break;
      case OPERATORS.MODULO:
        operation = modulo;
        isRealTime = false;
        break;
      case OPERATORS.SWAP:
        operation = swap;
        isRealTime = false;
        break;
      case OPERATORS.RECIPROCAL:
        operation = reciprocal;
        isRealTime = false;
        break;
      case OPERATORS.SQRT:
        operation = sqrt;
        isRealTime = false;
        break;
      case OPERATORS.SIN:
        operation = sin;
        isRealTime = false;
        break;
      case OPERATORS.COS:
        operation = cos;
        isRealTime = false;
        break;
      case OPERATORS.TAN:
        operation = tan;
        isRealTime = false;
        break;
    }

    if (operation) {
      if (isRealTime) {
        this.executeOperation(document, block, operation);
      } else {
        if (isEnterPress) {
          this.executeOperation(document, block, operation);
        }
      }
    }
  }

  private executeOperation(
    document: vscode.TextDocument,
    block: CalcBlock,
    operation: (stack: number[]) => OperationResult
  ): void {
    const result = operation(block.stack);

    if (result.success && result.result) {
      this.updateBlock(document, block, result.result);
    } else if (result.error) {
      // Show error message to user
      vscode.window.showWarningMessage(`Calculator: ${result.error}`);
    }
  }

  private async updateBlock(document: vscode.TextDocument, block: CalcBlock, newStack: number[]): Promise<void> {
    const edit = new vscode.WorkspaceEdit();
    const range = new vscode.Range(
      new vscode.Position(block.startLine, 0),
      new vscode.Position(block.endLine + 1, 0)
    );

    // Handle empty stacks with a placeholder comment
    const newContent = newStack.length > 0
      ? newStack.map(n => n.toString()).join('\n') + '\n'
      : '# empty\n';

    edit.replace(document.uri, range, newContent);

    this.isProcessingUpdate = true;
    await vscode.workspace.applyEdit(edit);
    this.isProcessingUpdate = false;
  }
}
