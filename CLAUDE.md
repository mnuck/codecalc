# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VSCode extension that provides an RPN (Reverse Polish Notation) calculator inside `\`\`\`calc` code blocks. Works in any file type (markdown, source code, text files, etc.).

## Commands

### Build and Development
```bash
npm install           # Install dependencies
npm run compile       # Compile TypeScript to JavaScript
npm run watch         # Watch mode - recompile on changes
npm run lint          # Run ESLint on source files
```

### Testing in VSCode
Press F5 in VSCode to launch the Extension Development Host with the extension loaded.

### Packaging
```bash
npm install -g @vscode/vsce
vsce package          # Creates .vsix file for distribution
code --install-extension codecalc-0.0.1.vsix
```

## Architecture

### Core Components

**extension.ts** - Entry point
- Activates the extension on VSCode startup
- Minimal orchestration layer that instantiates CalculatorProvider

**calculatorProvider.ts** - Main logic controller
- Tracks calc blocks across all open documents
- Document change detection and block parsing
- Parse caching by document version to optimize performance
- Operation routing: real-time (arithmetic) vs on-Enter (functions)
- Workspace edit orchestration with reentrancy guard (`isProcessingUpdate`)

**stackOperations.ts** - Pure operation functions
- All operations return `OperationResult` with `success`, `result?`, `error?`
- Stack convention: Last element is top of stack
- Operations consume operands and push result atomically
- Validation: insufficient operands, division by zero, negative square roots

**constants.ts** - Operation definitions
- `OPERATORS` object maps operation names to string tokens
- `OPERATOR_LIST` array for efficient lookup during parsing

### Key Design Patterns

**Calc Block State**
```typescript
interface CalcBlock {
  startLine: number;    // First line inside ```calc
  endLine: number;      // Last line before closing ```
  stack: number[];      // Current stack state
}
```

**Operation Execution Flow**
1. Document change event triggers
2. Find calc block containing changed line
3. Parse line to identify operation
4. Check if operation is real-time (triggers immediately) or on-Enter (waits for newline)
5. Execute operation on block's stack
6. Replace block content atomically with WorkspaceEdit
7. Set reentrancy guard during update to prevent infinite loops

**Parse Caching Strategy**
- Keyed by document URI + version number
- Avoids re-parsing unchanged documents
- Cache invalidated on document version change or document close

### Operation Categories

**Real-time operators** (execute on keystroke): `+`, `-`, `*`, `/`
**On-Enter operators** (execute when line completes): `mod`, `swap`, `1/x`, `sqrt`, `sin`, `cos`, `tan`

### Important Constraints

- Each calc block maintains independent stack state
- Multiple calc blocks per document are supported
- Non-numeric lines are silently ignored during stack parsing
- Operator lines are skipped during stack parsing
- Empty stacks render as `# empty` to maintain block structure
- Reentrancy guard prevents cascade updates when extension modifies document
- Trigonometric functions expect radians

### Error Handling Philosophy

Operations never throw exceptions. All errors return `OperationResult` with:
- `success: false`
- `error: string` - user-friendly message displayed via `vscode.window.showWarningMessage`
- Original stack unchanged

This ensures the calculator never crashes and provides clear feedback to users.

## TypeScript Configuration

- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Source maps for debugging
- Output directory: `out/`

## Extension Metadata

- Activation: `onStartupFinished` (works immediately when VSCode opens)
- No contributed commands or configuration settings
- Works passively through document change listeners
