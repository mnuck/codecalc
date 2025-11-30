import * as vscode from 'vscode';
import { OperationResult } from './stackOperations';
import { BlockParser, CalcBlock } from './blockParser';
import { DocumentStateManager } from './documentStateManager';
import { OperationRegistry } from './operationRegistry';

/**
 * Orchestrates calculator functionality by coordinating specialized components
 * Each component handles a single responsibility:
 * - BlockParser: Finds and parses calc blocks
 * - DocumentStateManager: Manages document state and caching
 * - OperationRegistry: Routes operations without switch statements
 */
export class CalculatorProvider {
  private isProcessingUpdate = false;
  private parser: BlockParser;
  private stateManager: DocumentStateManager;
  private operations: OperationRegistry;

  constructor() {
    this.parser = new BlockParser();
    this.stateManager = new DocumentStateManager(this.parser);
    this.operations = new OperationRegistry();
  }

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
    this.stateManager.invalidateDocument(document);
  }

  private onDocumentChange(event: vscode.TextDocumentChangeEvent): void {
    // Ignore changes triggered by our own updates
    if (this.isProcessingUpdate) {
      return;
    }

    const document = event.document;
    const blocks = this.stateManager.getBlocks(document);

    for (const change of event.contentChanges) {
      const changedLineNumber = document.positionAt(change.rangeOffset).line;
      const activeBlock = this.parser.findBlockContainingLine(blocks, changedLineNumber);

      if (activeBlock) {
        this.processBlock(document, activeBlock, change);
      }
    }
  }

  private processBlock(document: vscode.TextDocument, block: CalcBlock, change: vscode.TextDocumentContentChangeEvent): void {
    const changedLineNumber = document.positionAt(change.rangeOffset).line;
    const isEnterPress = change.text.includes('\n');
    const line = document.lineAt(changedLineNumber).text.trim();

    const operation = this.operations.findOperation(line);

    if (operation) {
      // Real-time operations execute immediately, on-Enter operations wait for newline
      if (operation.isRealTime || isEnterPress) {
        this.executeOperation(document, block, operation);
      }
    }
  }

  private executeOperation(
    document: vscode.TextDocument,
    block: CalcBlock,
    operation: { execute: (stack: number[]) => OperationResult }
  ): void {
    const result = operation.execute(block.stack);

    if (result.success && result.result) {
      this.updateBlock(document, block, result.result);
    } else if (result.error) {
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
