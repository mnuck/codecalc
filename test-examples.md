# Calculator Test Cases

## Test 1: Basic Addition (Real-time)

```calc
123
456
```

**Action:** Type `+` on line 3
**Expected:** Block updates immediately to show `579`

## Test 2: Subtraction (Real-time)

```calc
100
25
```

**Action:** Type `-` on line 3
**Expected:** Block updates immediately to show `75`

## Test 3: Multiplication (Real-time)

```calc
12
5
```

**Action:** Type `*` on line 3
**Expected:** Block updates immediately to show `60`

## Test 4: Division (Real-time)

```calc
100
4
```

**Action:** Type `/` on line 3
**Expected:** Block updates immediately to show `25`

## Test 5: Swap (On Enter)

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

## Test 6: Reciprocal (On Enter)

```calc
4
```

**Action:** Type `1/x` then press Enter
**Expected:** Block updates to show `0.25`

## Test 7: Division by Zero Error

```calc
10
0
```

**Action:** Type `/` on line 3
**Expected:** Nothing happens (stack unchanged)

## Test 8: Insufficient Operands

```calc
5
```

**Action:** Type `+` on line 2
**Expected:** Nothing happens (need 2 operands)

## Test 9: Multiple Blocks (Independent Stacks)

```calc
10
20
```

```calc
100
200
```

**Action:** Add `+` to first block, then `*` to second block
**Expected:** First block shows `30`, second block shows `20000`

## Test 10: Chain Operations

```calc
10
5
3
```

**Action:** Type `+` (result: 10, 8), then type `*` (result: 80)
