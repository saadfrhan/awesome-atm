import chalk from 'chalk';
import inquirer from 'inquirer';
import promptQuestions from './index.js';
import { questions } from './questions.js';
import { LogsI, OperationI, TransactionI } from './ts/types.js';

export default function createOperation(args: OperationI) {

  let logs = args.logs;
  let amount = args.amount;
  let event = args.event;

  const askQuestion = async () => {

    const messageStart = event === 'TRANSFER' ? 'Whom do you want to transfer to and how' : 'How';

    const response = await inquirer.prompt([{
      type: 'input',
      name: event,
      message: `${messageStart} much do you want to ${event.toLowerCase()}?`,
      default: event === 'TRANSFER' ? 'John 1000' : '1000',
      validate: (val: string) => {
        if (event === 'TRANSFER') {
          return val.split(' ').length > 1 || 'Please enter in correct format';
        } else {
          return !(isNaN(Number(val))) || 'Please enter an amount!'
        }
      },
    }]);

    mutateState(response);

  }

  const mutateState = (response: {
    [key: string]: string;
  }) => {
    if (event === 'TRANSFER') {
      return transferTransaction(response[event])
    }

    const value = Number(response[event]);
    if (event === 'ADD') {
      amount += value;
    } else {
      amount -= value;
    }

    pustToLogs(createTransaction({ event, amount: value, amountAfter: amount }));

    console.log(chalk.yellow('Operation done!\n'));

    return promptQuestion();
  }

  const createTransaction = ({
    event,
    amount,
    amountAfter,
    reciever
  }: TransactionI) => {
    const transaction = {
      event,
      [event === 'ADD' ? "amountAdded" : "amountDeducted"]: amount,
      amountAfter,
      date: new Date(),
    }
    return {
      ...transaction,
      ...(event === 'TRANSFER' && { reciever })
    };
  }

  const transferTransaction = async (transfer: string) => {
    const value = Number(transfer.split(' ')[1]);
    const reciever = transfer.split(' ')[0];
    amount -= value;
    pustToLogs(createTransaction({
      event,
      amount: value,
      amountAfter: amount,
      reciever
    }));
    console.log(chalk.yellow('Operation done!\n'));
    return promptQuestion();
  }

  const pustToLogs = (transaction: LogsI, reciever?: string) => {
    return logs.push(
      event === 'TRANSFER' ?
        {
          ...transaction,
          reciever
        } :
        transaction);
  }

  const promptQuestion = () => {
    return promptQuestions([questions[3]], amount, logs);
  }

  const showLogs = () => {
    console.log(`${JSON.stringify(logs, null, 2)}\n`);
    return promptQuestion();
  }

  const showBalance = () => {
    console.log(`Your balance is: ${amount}\n`);
    return promptQuestion();
  }

  return {
    askQuestion,
    pustToLogs,
    promptQuestion,
    showLogs,
    showBalance
  }

}