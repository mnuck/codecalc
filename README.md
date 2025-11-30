# Code Calc

RPN calculator extension for VSCode that works inside code blocks in any file type.

## Features

- RPN (Reverse Polish Notation) calculator in ` ```calc ` code blocks
- Works in any file type (markdown, code files, text files, etc.)
- Real-time arithmetic operations: `+`, `-`, `*`, `/`
- On-Enter operations: `mod`, `swap`, `1/x`, `sqrt`, `sin`, `cos`, `tan`
- Multiple independent calc blocks per file
- Error handling for division by zero, negative square roots, and insufficient operands

## Usage

Create a calc block in any file (`.md`, `.js`, `.txt`, etc.):

```calc
123
456
```

The stack is displayed top-to-bottom, with the last line being the top of the stack.

### Arithmetic Operations (Real-time)

Type an operator on a new line for immediate execution:

```calc
10
5
+
```

Result:
```calc
15
```

### Swap Operation (On Enter)

Type `swap` and press Enter to swap the top two elements:

```calc
10
20
swap
```

Result:
```calc
20
10
```

### Reciprocal (On Enter)

Type `1/x` and press Enter to compute the reciprocal:

```calc
4
1/x
```

Result:
```calc
0.25
```

## Supported Operations

| Operation | Trigger | Behavior | Operands |
|-----------|---------|----------|----------|
| Addition | `+` | Real-time | Binary |
| Subtraction | `-` | Real-time | Binary |
| Multiplication | `*` | Real-time | Binary |
| Division | `/` | Real-time | Binary |
| Modulo | `mod` + Enter | On line completion | Binary |
| Swap | `swap` + Enter | On line completion | Binary |
| Reciprocal | `1/x` + Enter | On line completion | Unary |
| Square Root | `sqrt` + Enter | On line completion | Unary |
| Sine | `sin` + Enter | On line completion | Unary |
| Cosine | `cos` + Enter | On line completion | Unary |
| Tangent | `tan` + Enter | On line completion | Unary |

**Note:** Trigonometric functions expect input in radians.

## Error Handling

- **Insufficient operands**: Operation ignored, stack unchanged, warning displayed
- **Division by zero**: Operation ignored, stack unchanged, warning displayed
- **Modulo by zero**: Operation ignored, stack unchanged, warning displayed
- **Reciprocal of zero**: Operation ignored, stack unchanged, warning displayed
- **Square root of negative**: Operation ignored, stack unchanged, warning displayed
- **Invalid input**: Non-numeric lines ignored

## Installation

### From GitHub Releases (Recommended)

1. Go to [Releases](https://github.com/mnuck/codecalc/releases)
2. Download the latest `.vsix` file
3. Install in VSCode:
   - Open Extensions sidebar (Ctrl+Shift+X)
   - Click "..." menu → "Install from VSIX"
   - Select the downloaded file

**Or via command line:**
```bash
code --install-extension codecalc-0.0.1.vsix
```

### From Source

```bash
git clone https://github.com/mnuck/codecalc.git
cd codecalc
npm install
npm install -g @vscode/vsce
vsce package
code --install-extension codecalc-0.0.1.vsix
```

## Development

### Setup

```bash
npm install
npm run compile
```

### Run Extension

Press F5 in VSCode to open the Extension Development Host.

### Watch Mode

```bash
npm run watch
```

## Technical Details

- Written in TypeScript
- Activates on VSCode startup
- Works in any file type that supports text editing
- Each calc block maintains independent stack state
- Operations are atomic document updates
