export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  MODULO: 'mod',
  SWAP: 'swap',
  RECIPROCAL: '1/x',
  SQRT: 'sqrt',
  SIN: 'sin',
  COS: 'cos',
  TAN: 'tan'
} as const;

export const OPERATOR_LIST: string[] = Object.values(OPERATORS);
