import inquirer from 'inquirer';
import PromptQuestions from '.';
import { questions } from './questions';
import { LogsI, operation, OperationI } from './ts/types';

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
      message: `How much do you want to ${this.event.toLowerCase()}?`,
      validate: (val) => !(isNaN(val)) || 'Please enter an amount!',
    }]);
    const value = Number(response[this.event]);
    if (this.event === 'ADD') {
      this.amount += value;
    } else {
      this.amount -= value;
    }
    this.logs.push({
      event: this.event,
      amount: value,
      amountAfter: this.amount,
      date: new Date()
    });
    return this.promptQuestion();
  }

  promptQuestion() {
    return new PromptQuestions([questions[3]]).start(this.amount, this.logs);
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