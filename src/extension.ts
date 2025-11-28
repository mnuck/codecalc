import * as vscode from 'vscode';
import { CalculatorProvider } from './calculatorProvider';

export function activate(context: vscode.ExtensionContext): void {
  const calculator = new CalculatorProvider();
  calculator.activate(context);
}

export function deactivate(): void {}
