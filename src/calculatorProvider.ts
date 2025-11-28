import * as vscode from 'vscode';
import { add, subtract, multiply, divide, swap, reciprocal, OperationResult } from './stackOperations';

interface CalcBlock {
  startLine: number;
  endLine: number;
  stack: number[];
}

export class CalculatorProvider {
  private calcBlocks: Map<string, CalcBlock[]> = new Map();

  public activate(context: vscode.ExtensionContext): void {
    vscode.workspace.onDidChangeTextDocument(
      (event) => this.onDocumentChange(event),
      null,
      context.subscriptions
    );
  }

  private onDocumentChange(event: vscode.TextDocumentChangeEvent): void {
    const document = event.document;
    const docKey = document.uri.toString();

    for (const change of event.contentChanges) {
      const blocks = this.findCalcBlocks(document);
      this.calcBlocks.set(docKey, blocks);

      const changedLineNumber = document.positionAt(change.rangeOffset).line;
      const activeBlock = this.findBlockContainingLine(blocks, changedLineNumber);

      if (activeBlock) {
        this.processBlock(document, activeBlock, change);
      }
    }
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
    const operators = ['+', '-', '*', '/', 'swap', '1/x'];

    for (let i = startLine; i <= endLine && i < document.lineCount; i++) {
      const line = document.lineAt(i).text.trim();

      // Skip operator lines
      if (operators.includes(line)) {
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
      case '+':
        operation = add;
        isRealTime = true;
        break;
      case '-':
        operation = subtract;
        isRealTime = true;
        break;
      case '*':
        operation = multiply;
        isRealTime = true;
        break;
      case '/':
        operation = divide;
        isRealTime = true;
        break;
      case 'swap':
        operation = swap;
        isRealTime = false;
        break;
      case '1/x':
        operation = reciprocal;
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
    }
  }

  private updateBlock(document: vscode.TextDocument, block: CalcBlock, newStack: number[]): void {
    const edit = new vscode.WorkspaceEdit();
    const range = new vscode.Range(
      new vscode.Position(block.startLine, 0),
      new vscode.Position(block.endLine + 1, 0)
    );

    const newContent = newStack.map(n => n.toString()).join('\n') + '\n';
    edit.replace(document.uri, range, newContent);

    vscode.workspace.applyEdit(edit);
  }
}
