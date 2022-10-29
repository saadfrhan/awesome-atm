type operation = 'ADD' | 'TRANSFER' | 'QUIT' | 'WITHDRAW' | 'LOGS' | 'BALANCE'

export default interface AnswersI {
  id: string;
  pin: string;
  operation: operation
}

export interface InquirerPromptFuncI {
  name: string
  validateMessage: string
  action: (anss: { [key: string]: string }) => void
  message: string,
  defaultVal?: string,
  validateFunc: (val: string) => boolean
}

export interface LogsI {
  event: operation;
  reciever?: string;
  amountDeducted?: number;
  amountAdd?: number;
  date: Date;
};