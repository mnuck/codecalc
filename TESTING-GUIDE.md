# Testing Guide

## Quick Start

1. **Launch Extension Development Host**
   - Press F5 in VSCode
   - Opens new window with extension loaded

2. **Create Test File**
   - In Extension Development Host: Create any file (e.g., `test.md`, `test.js`, `test.txt`)
   - Works in any file type

3. **Run Tests**
   - Copy test cases from sections below
   - Check each operation works as expected
   - Mark [ ] as [x] when passing

4. **Reload After Code Changes**
   - Press Ctrl+R in Extension Development Host
   - Or close and press F5 again in main window

---

## Basic Arithmetic Tests (Real-time)

### Addition
```calc
10
20
```
Type `+` → Expected: `30` immediately

---

### Subtraction
```calc
100
25
```
Type `-` → Expected: `75` immediately

---

### Multiplication
```calc
6
7
```
Type `*` → Expected: `42` immediately

---

### Division
```calc
100
4
```
Type `/` → Expected: `25` immediately

---

## On-Enter Operations Tests

### Modulo
```calc
17
5
```
Type `mod` then Enter → Expected: `2`

---

### Swap
```calc
10
20
```
Type `swap` then Enter → Expected: `20` then `10`

---

### Reciprocal
```calc
4
```
Type `1/x` then Enter → Expected: `0.25`

---

### Square Root
```calc
16
```
Type `sqrt` then Enter → Expected: `4`

---

### Sine (radians)
```calc
0
```
Type `sin` then Enter → Expected: `0`

---

### Cosine (radians)
```calc
0
```
Type `cos` then Enter → Expected: `1`

---

### Tangent (radians)
```calc
0
```
Type `tan` then Enter → Expected: `0`

---

## Error Handling Tests

### Division by Zero
```calc
10
0
```
Type `/` → Expected: Warning "Division by zero", stack unchanged

---

### Modulo by Zero
```calc
10
0
```
Type `mod` then Enter → Expected: Warning "Modulo by zero", stack unchanged

---

### Reciprocal of Zero
```calc
0
```
Type `1/x` then Enter → Expected: Warning "Reciprocal of zero", stack unchanged

---

### Negative Square Root
```calc
-4
```
Type `sqrt` then Enter → Expected: Warning "Square root of negative number", stack unchanged

---

### Insufficient Operands (Binary)
```calc
5
```
Type `+` → Expected: Warning "Insufficient operands for addition", stack unchanged

---

### Insufficient Operands (Unary)
```calc

```
(Empty block)
Type `sqrt` then Enter → Expected: Warning "Insufficient operands for sqrt"

---

## Edge Cases Tests

### Empty Stack Result
```calc
5
5
```
Type `-` → Expected: `# empty`

---

### Multiple Independent Blocks
Block 1:
```calc
10
20
```

Block 2:
```calc
100
200
```

Add `+` to first block → Expected: `30`
Add `*` to second block → Expected: `20000`
(Operations don't affect each other)

---

### Chained Operations
```calc
10
5
3
```
Type `+` → Should show `10` and `8`
Type `*` → Should show `80`

---

### Decimal Numbers
```calc
3.14
2
```
Type `*` → Expected: `6.28`

---

### Negative Numbers
```calc
5
10
```
Type `-` → Expected: `-5`

---

### Large Numbers
```calc
999999
999999
```
Type `*` → Expected: `999998000001`

---

### Very Small Reciprocal
```calc
1000
```
Type `1/x` then Enter → Expected: `0.001`

---

### Whitespace Handling
```calc
  10
  20
```
Type `  +  ` (with spaces) → Expected: `30` (whitespace trimmed)

---

### Mixed Valid/Invalid Lines
```calc
10
some text
20
```
Type `+` → Expected: `30` (ignores "some text" line)

---

## Real-time vs On-Enter Behavior

### Real-time Test
```calc
7
3
```
Type `+` (DON'T press Enter) → Should update to `10` immediately BEFORE Enter

---

### On-Enter Test
```calc
7
3
```
Type `swap` (DON'T press Enter) → Nothing should happen
Press Enter → Should update to `3` then `7`

---

## Advanced Tests

### Pi with Trig
```calc
3.14159265359
```
Type `sin` then Enter → Expected: ~0 (very close to 0, within floating point precision)

---

### Works in Any File Type
Create `test.js` (JavaScript file):
```js
// Calculator test
// ```calc
// 10
// 20
// ```
```
Add `+` inside calc block → Expected: Updates to `30` (works in any file)

---

### No Infinite Loops
```calc
5
5
```
Type `+` → Expected: Updates once to `10`, does NOT keep updating or loop

---

### Memory Cleanup
1. Open test1.md with calc blocks
2. Open test2.md with calc blocks
3. Use both files
4. Close test1.md
Expected: test2.md continues working, no errors in Debug Console

---

### Performance - Large Document
Create document with 10 calc blocks and lots of content
Edit one calc block
Expected: Fast response, no lag, only affected block updates

---

## Operator Parsing Test

### Operator Not Parsed as Number
```calc
80
1/x
```
Press Enter → Expected: `0.0125` (1/80), NOT `1`
Verifies "1/x" isn't parsed as the number 1

---

## Debugging

**View Console:**
- Main VSCode window → View → Output → "Extension Host"
- Shows errors and crashes

**Set Breakpoints:**
- Click left of line numbers in source files
- Extension pauses when line executes

**Common Issues:**
- Extension doesn't activate → Wait a moment after VSCode starts, or reload window
- Operations don't trigger → Check you're inside calc block (between \`\`\`calc and \`\`\`)
- Changes not appearing → Press Ctrl+R to reload extension

---

## Test Summary

Track your progress:

**Basic Arithmetic (4 tests):** [ ]
**On-Enter Operations (7 tests):** [ ]
**Error Handling (6 tests):** [ ]
**Edge Cases (9 tests):** [ ]
**Advanced (5 tests):** [ ]

**Total: 31 Tests**
