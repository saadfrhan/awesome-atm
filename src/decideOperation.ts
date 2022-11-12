import Operation from './operation';
import { DecideOperationArgs } from './ts/types';

export default function DecideOperation(
  { operation, amount, logs }: DecideOperationArgs
) {
  const operationInstance = new Operation({
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
      return operationInstance.performOperation();
  }
}
