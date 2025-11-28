# Code Calc

RPN calculator extension for VSCode that works inside code blocks.

## Features

- RPN (Reverse Polish Notation) calculator in markdown code blocks
- Real-time arithmetic operations: `+`, `-`, `*`, `/`
- On-Enter operations: `swap`, `1/x`
- Multiple independent calc blocks per file
- Error handling for division by zero and insufficient operands

## Usage

Create a calc block in any markdown file:

\`\`\`calc
123
456
\`\`\`

The stack is displayed top-to-bottom, with the last line being the top of the stack.

### Arithmetic Operations (Real-time)

Type an operator on a new line for immediate execution:

\`\`\`calc
10
5
+
\`\`\`

Result:
\`\`\`calc
15
\`\`\`

### Swap Operation (On Enter)

Type `swap` and press Enter to swap the top two elements:

\`\`\`calc
10
20
swap
\`\`\`

Result:
\`\`\`calc
20
10
\`\`\`

### Reciprocal (On Enter)

Type `1/x` and press Enter to compute the reciprocal:

\`\`\`calc
4
1/x
\`\`\`

Result:
\`\`\`calc
0.25
\`\`\`

## Supported Operations

| Operation | Trigger | Behavior |
|-----------|---------|----------|
| Addition | `+` | Real-time |
| Subtraction | `-` | Real-time |
| Multiplication | `*` | Real-time |
| Division | `/` | Real-time |
| Swap | `swap` + Enter | On line completion |
| Reciprocal | `1/x` + Enter | On line completion |

## Error Handling

- **Insufficient operands**: Operation ignored, stack unchanged
- **Division by zero**: Operation ignored, stack unchanged
- **Reciprocal of zero**: Operation ignored, stack unchanged
- **Invalid input**: Non-numeric lines ignored

## Development

### Setup

\`\`\`bash
npm install
npm run compile
\`\`\`

### Run Extension

Press F5 in VSCode to open the Extension Development Host.

### Watch Mode

\`\`\`bash
npm run watch
\`\`\`

## Technical Details

- Written in TypeScript
- Activates on markdown files
- Each calc block maintains independent stack state
- Operations are atomic document updates
