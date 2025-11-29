export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  SWAP: 'swap',
  RECIPROCAL: '1/x'
} as const;

export const OPERATOR_LIST: string[] = Object.values(OPERATORS);
