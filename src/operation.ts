import chalk from 'chalk';
import inquirer from 'inquirer';
import promptQuestions from './index.js';
import { questions } from './questions.js';
import { LogsI, operation, OperationI } from './ts/types.js';

// ! TODO: Convert following into functional code 

export default class Operation {
  logs: LogsI[] = [];
  amount = 0;
  event: operation;

  constructor({ event, amount, logs }: OperationI) {
    this.logs = logs;
    this.event = event;
    this.amount = amount;
  }

  async performOperation(): Promise<void> {

    const response = await inquirer.prompt([{
      type: 'input',
      name: this.event,
      message: `${this.event === 'TRANSFER' ? 'Whom do you want to transfer to and how' : 'How'} much do you want to ${this.event.toLowerCase()}?`,
      default: this.event === 'TRANSFER' ? 'John 1000' : '1000',
      validate: (val) => {
        if (this.event === 'TRANSFER') {
          return val.split(' ').length > 0 ? true : false
        } else {
          return !(isNaN(val)) || 'Please enter an amount!'
        }
      },
    }]);

    const value = this.event === 'TRANSFER' ?
      Number(response[this.event].split(' ')[1]) :
      Number(response[this.event]);

    if (this.event === 'ADD') {
      this.amount += value;
    } else {
      this.amount -= value;
    }

    const transaction = {
      event: this.event,
      amount: value,
      amountAfter: this.amount,
      date: new Date(),
    }

    if (this.event === 'TRANSFER') {
      let reciever = response[this.event].split(' ')[0]
      this.pustToLogs(transaction, reciever);
    } else this.pustToLogs(transaction);

    console.log(chalk.yellow('Operation done!\n'));

    return this.promptQuestion();
  }

  pustToLogs(transaction: LogsI, reciever?: string) {
    return this.logs.push(
      this.event === 'TRANSFER' ?
        {
          ...transaction,
          reciever
        } :
        transaction);
  }

  promptQuestion() {
    return promptQuestions([questions[3]], this.amount, this.logs);
  }

  showLogs() {
    console.log(`${JSON.stringify(this.logs, null, 2)}\n`);
    return this.promptQuestion();
  }

  showBalance() {
    console.log(`Your balance is: ${this.amount}\n`);
    return this.promptQuestion();
  }
}