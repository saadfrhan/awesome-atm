type operation = `ADD` | `TRANSFER` | `QUIT` | `WITHDRAW` | `LOGS` | `BALANCE`

export type LogsI = {
  event: operation;
  reciever?: string;
  amountDeducted?: number;
  amountAdd?: number;
  date: Date;
}

export type PerfActionI = {
  operation: string,
  money: number,
  logs?: LogsI[]
}