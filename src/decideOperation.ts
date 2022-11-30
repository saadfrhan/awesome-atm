import createOperation from './operation.js';
import { DecideOperationArgs } from './ts/types.js';

export default function DecideOperation(
  { operation, amount, logs }: DecideOperationArgs
) {

  const operationInstance = createOperation({
    event: operation,
    amount,
    logs: logs || []
  });

  switch (operation) {
    case 'LOGS':
      return operationInstance.showLogs();
    case 'BALANCE':
      return operationInstance.showBalance();
    case 'EXIT':
      return;
    default:
      return operationInstance.askQuestion();
  }
}
