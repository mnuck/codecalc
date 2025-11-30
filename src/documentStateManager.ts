import * as vscode from 'vscode';
import { CalcBlock, BlockParser } from './blockParser';

interface CachedBlocks {
  version: number;
  blocks: CalcBlock[];
}

/**
 * Manages document state and caching for calc blocks
 */
export class DocumentStateManager {
  private calcBlocks: Map<string, CalcBlock[]> = new Map();
  private parseCache: Map<string, CachedBlocks> = new Map();

  constructor(private parser: BlockParser) {}

  /**
   * Get blocks for a document, using cache when possible
   */
  public getBlocks(document: vscode.TextDocument): CalcBlock[] {
    const docKey = document.uri.toString();
    const cached = this.parseCache.get(docKey);

    // Use cached result if document version hasn't changed
    if (cached && cached.version === document.version) {
      return cached.blocks;
    }

    // Parse and cache
    const blocks = this.parser.findCalcBlocks(document);
    this.parseCache.set(docKey, { version: document.version, blocks });
    this.calcBlocks.set(docKey, blocks);

    return blocks;
  }

  /**
   * Update cached blocks for a document
   */
  public updateBlocks(document: vscode.TextDocument, blocks: CalcBlock[]): void {
    const docKey = document.uri.toString();
    this.calcBlocks.set(docKey, blocks);
  }

  /**
   * Invalidate all caches for a document
   */
  public invalidateDocument(document: vscode.TextDocument): void {
    const docKey = document.uri.toString();
    this.calcBlocks.delete(docKey);
    this.parseCache.delete(docKey);
  }

  /**
   * Find block containing a specific line in a document
   */
  public findBlockContainingLine(document: vscode.TextDocument, lineNumber: number): CalcBlock | undefined {
    const blocks = this.getBlocks(document);
    return this.parser.findBlockContainingLine(blocks, lineNumber);
  }
}
