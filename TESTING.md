# Testing the Extension

## Step 1: Launch Extension Development Host

In VSCode, open the codecalc folder and press **F5**. This:
- Compiles the TypeScript
- Opens a new VSCode window with the extension loaded
- Shows "[Extension Development Host]" in the title bar

## Step 2: Create Test File

In the Extension Development Host window:
1. Create new file (Ctrl+N)
2. Save as `test.md` (must be markdown for extension to activate)
3. Type a calc block:

```
```calc
10
20
```
```

## Step 3: Test Real-time Operations

**Add a third line** inside the calc block and type `+`

Expected behavior:
- As soon as you type the `+` character, the block content changes
- The two numbers disappear
- Replaced with `30`

If nothing happens:
- Check the Debug Console in the main VSCode window for errors
- Verify file is saved as `.md`
- Check that calc block has proper backticks

## Step 4: Test On-Enter Operations

Create a new calc block:

```
```calc
5
10
```
```

**Add a third line**, type `swap`, then **press Enter**

Expected behavior:
- Nothing happens while typing "swap"
- When you press Enter, block updates to show `10` then `5`

## Step 5: Test Error Handling

Create calc block with division by zero:

```
```calc
10
0
/
```
```

Expected behavior:
- Block stays unchanged (doesn't crash, doesn't modify stack)

## Debugging

### View Console Output

In the main VSCode window (not Extension Development Host):
- View → Output → Select "Extension Host" from dropdown
- Shows any errors or crashes

### Reload Extension

After changing code:
1. In Extension Development Host window: Ctrl+R to reload
2. Or close and press F5 again in main window

### Set Breakpoints

In `src/calculatorProvider.ts`:
- Click left of line numbers to set breakpoints
- Extension will pause when that line executes
- View variables and step through code

## Watch Mode for Development

Run in terminal:
```bash
npm run watch
```

Now TypeScript recompiles automatically when you save files. Still need to reload Extension Development Host (Ctrl+R) to see changes.

## Common Issues

**Extension doesn't activate:**
- File must be `.md` extension
- Check package.json has `"activationEvents": ["onLanguage:markdown"]`

**Operations don't trigger:**
- Real-time ops (+, -, *, /) trigger on keystroke
- On-Enter ops (swap, 1/x) trigger when you press Enter
- Must be inside calc block boundaries

**Calc block not recognized:**
- Opening line must be exactly ` ```calc ` (three backticks + calc)
- Closing line must be exactly ` ``` ` (three backticks)
- Content goes between these markers

**Changes not appearing:**
- Reload Extension Development Host with Ctrl+R
- Check Debug Console for errors
- Verify compilation succeeded (no TypeScript errors)
