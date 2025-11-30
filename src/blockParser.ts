import * as vscode from 'vscode';
import { OPERATOR_LIST } from './constants';

export interface CalcBlock {
  startLine: number;
  endLine: number;
  stack: number[];
}

export class BlockParser {
  /**
   * Find all calc blocks in a document
   */
  public findCalcBlocks(document: vscode.TextDocument): CalcBlock[] {
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

  /**
   * Parse stack from calc block lines
   * Skips operator lines and non-numeric content
   */
  public parseStack(document: vscode.TextDocument, startLine: number, endLine: number): number[] {
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

  /**
   * Find block containing a specific line number
   */
  public findBlockContainingLine(blocks: CalcBlock[], lineNumber: number): CalcBlock | undefined {
    return blocks.find(block => lineNumber >= block.startLine && lineNumber <= block.endLine + 1);
  }
}
