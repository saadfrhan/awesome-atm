export type operation = 'ADD' | 'TRANSFER' | 'EXIT' | 'WITHDRAW' | 'LOGS' | 'BALANCE'

export type LogsI = {
  event: operation;
  amountAfter: number;
  amountAdded?: number;
  amountDeducted?: number;
  date: Date;
  reciever?: string;
}

export type OperationI = {
  event: operation;
  amount: number;
  logs: LogsI[]
}

export type DecideOperationArgs = {
  operation: operation;
  amount: number;
  logs?: LogsI[]
}

export type TransactionI = {
  event: operation,
  amountGiven: number,
  amountAfter: number,
  reciever?: string
}