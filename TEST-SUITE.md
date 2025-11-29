# Test Suite for RPN Calculator Extension

## Setup
1. Press F5 to launch Extension Development Host
2. Create new file `test-suite.md` in the Extension Development Host window
3. Work through each test case below

---

## Test 1: Basic Arithmetic - Addition
**Status:** [ ]

```calc
10
20
```

**Action:** Type `+` on line 3
**Expected:** Block updates immediately to show `30`
**Actual:**

---

## Test 2: Basic Arithmetic - Subtraction
**Status:** [ ]

```calc
100
25
```

**Action:** Type `-` on line 3
**Expected:** Block updates immediately to show `75`
**Actual:**

---

## Test 3: Basic Arithmetic - Multiplication
**Status:** [ ]

```calc
6
7
```

**Action:** Type `*` on line 3
**Expected:** Block updates immediately to show `42`
**Actual:**

---

## Test 4: Basic Arithmetic - Division
**Status:** [ ]

```calc
100
4
```

**Action:** Type `/` on line 3
**Expected:** Block updates immediately to show `25`
**Actual:**

---

## Test 5: Swap Operation (On Enter)
**Status:** [ ]

```calc
10
20
```

**Action:** Type `swap` then press Enter
**Expected:** Block updates to:
```calc
20
10
```
**Actual:**

---

## Test 6: Reciprocal Operation (On Enter)
**Status:** [ ]

```calc
4
```

**Action:** Type `1/x` then press Enter
**Expected:** Block updates to show `0.25`
**Actual:**

---

## Test 7: Error Handling - Division by Zero
**Status:** [ ]

```calc
10
0
```

**Action:** Type `/` on line 3
**Expected:**
- Warning message: "Calculator: Division by zero"
- Stack remains unchanged (still shows `10` and `0`)

**Actual:**

---

## Test 8: Error Handling - Insufficient Operands (Binary Op)
**Status:** [ ]

```calc
5
```

**Action:** Type `+` on line 2
**Expected:**
- Warning message: "Calculator: Insufficient operands for addition"
- Stack remains unchanged (still shows `5`)

**Actual:**

---

## Test 9: Error Handling - Insufficient Operands (Swap)
**Status:** [ ]

```calc
5
```

**Action:** Type `swap` then press Enter
**Expected:**
- Warning message: "Calculator: Insufficient operands for swap"
- Stack remains unchanged (still shows `5`)

**Actual:**

---

## Test 10: Error Handling - Reciprocal of Zero
**Status:** [ ]

```calc
0
```

**Action:** Type `1/x` then press Enter
**Expected:**
- Warning message: "Calculator: Reciprocal of zero"
- Stack remains unchanged (still shows `0`)

**Actual:**

---

## Test 11: Empty Stack Handling
**Status:** [ ]

```calc
5
5
```

**Action:** Type `-` on line 3
**Expected:** Block updates to show:
```calc
# empty
```
**Actual:**

---

## Test 12: Multiple Independent Blocks
**Status:** [ ]

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

**Action:**
1. Add `+` to first block (result: 30)
2. Add `*` to second block (result: 20000)

**Expected:**
- First block shows `30`
- Second block shows `20000`
- Operations don't affect each other

**Actual:**

---

## Test 13: Chain Operations
**Status:** [ ]

```calc
10
5
3
```

**Action:**
1. Type `+` (should give stack: 10, 8)
2. Type `*` (should give stack: 80)

**Expected:** Final result `80`
**Actual:**

---

## Test 14: Real-time vs On-Enter Distinction
**Status:** [ ]

Part A - Real-time:
```calc
7
3
```

**Action:** Type `+` (DON'T press Enter yet)
**Expected:** Updates immediately to `10` before Enter is pressed
**Actual:**

Part B - On-Enter:
```calc
7
3
```

**Action:** Type `swap` (DON'T press Enter yet)
**Expected:** Nothing happens while typing
**Action:** Now press Enter
**Expected:** Updates to show `3` then `7`
**Actual:**

---

## Test 15: Decimal Numbers
**Status:** [ ]

```calc
3.14
2
```

**Action:** Type `*` on line 3
**Expected:** Block updates to show `6.28`
**Actual:**

---

## Test 16: Negative Numbers
**Status:** [ ]

```calc
5
10
```

**Action:** Type `-` on line 3
**Expected:** Block updates to show `-5`
**Actual:**

---

## Test 17: Large Numbers
**Status:** [ ]

```calc
999999
999999
```

**Action:** Type `*` on line 3
**Expected:** Block updates to show result (999998000001)
**Actual:**

---

## Test 18: Very Small Reciprocal
**Status:** [ ]

```calc
1000
```

**Action:** Type `1/x` then press Enter
**Expected:** Block updates to show `0.001`
**Actual:**

---

## Test 19: No Infinite Loops (Self-triggered Changes)
**Status:** [ ]

```calc
5
5
```

**Action:** Type `+`
**Expected:**
- Updates once to `10`
- Does NOT keep updating or cause infinite loop
- Operation executes exactly once

**Actual:**

---

## Test 20: Non-Markdown Files Ignored
**Status:** [ ]

**Setup:** Create `test.txt` (plain text file)
**Action:** Add calc block and try operations
**Expected:** Extension does nothing (only works in .md files)
**Actual:**

---

## Test 21: Memory Cleanup Test
**Status:** [ ]

**Setup:**
1. Open test1.md with calc blocks
2. Open test2.md with calc blocks
3. Use both files
4. Close test1.md

**Expected:**
- test1.md data cleaned up from memory
- test2.md continues working normally
- No memory leaks

**Verification:** Check Debug Console for any errors when closing documents
**Actual:**

---

## Test 22: Performance - Large Document
**Status:** [ ]

**Setup:** Create document with 10 calc blocks and lots of other content
**Action:** Edit one calc block
**Expected:**
- Response is fast (uses cached parsing)
- No noticeable lag
- Only affected block updates

**Actual:**

---

## Test 23: Operator Not Parsed as Number
**Status:** [ ]

```calc
80
1/x
```

**Action:** Press Enter after typing `1/x`
**Expected:**
- Block updates to `0.0125` (1/80)
- NOT `1` (which would happen if "1/x" was parsed as the number 1)

**Actual:**

---

## Test 24: Whitespace Handling
**Status:** [ ]

```calc
  10
  20
```

**Action:** Type `  +  ` (with spaces) on line 3
**Expected:** Block updates to show `30` (whitespace trimmed)
**Actual:**

---

## Test 25: Mixed Valid and Invalid Lines
**Status:** [ ]

```calc
10
some text
20
```

**Action:** Type `+` on line 4
**Expected:**
- Ignores "some text" line
- Adds 10 + 20 = 30
- Block shows just `30`

**Actual:**

---

## Summary
Total Tests: 25
Passed: __
Failed: __
Skipped: __

## Issues Found
[Document any bugs or unexpected behavior here]
