type operation = 'ADD' | 'TRANSFER' | 'QUIT' | 'WITHDRAW' | 'LOGS' | 'BALANCE'

export interface LogsI {
  event: operation;
  reciever?: string;
  amountDeducted?: number;
  amountAdd?: number;
  date: Date;
};

export interface StartingArgsI {
  operation: operation;
  money: number;
  logs?: LogsI[];
}