# Test New Operators

## Modulo (On Enter)
```calc
17
5
```
Type `mod` then Enter - Expected: 2

## Square Root (On Enter)
```calc
16
```
Type `sqrt` then Enter - Expected: 4

## Sine (On Enter)
```calc
0
```
Type `sin` then Enter - Expected: 0

## Cosine (On Enter)
```calc
0
```
Type `cos` then Enter - Expected: 1

## Tangent (On Enter)
```calc
0
```
Type `tan` then Enter - Expected: 0

## Pi Example (Trig)
```calc
3.14159265359
```
Type `sin` then Enter - Expected: ~0 (very close to 0)

## Negative Square Root Error
```calc
-4
```
Type `sqrt` then Enter - Expected: Warning "Square root of negative number"

## Modulo by Zero Error
```calc
10
0
```
Type `mod` then Enter - Expected: Warning "Modulo by zero"
