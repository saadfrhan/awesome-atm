export type operation = 'ADD' | 'TRANSFER' | 'EXIT' | 'WITHDRAW' | 'LOGS' | 'BALANCE'

export type LogsI = {
  event: operation;
  amount: number;
  amountAfter: number;
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