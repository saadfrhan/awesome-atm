import inquirer from 'inquirer';
import PromptQuestions from '.';
import { questions } from './questions';
import { LogsI, PerfActionI } from './ts/types';

export default class PerfAction extends PromptQuestions {

  logs: LogsI[] = [];
  amount = 0;
  operation = '';

  constructor({ operation, money, logs }: PerfActionI) {
    super([questions[3]]);
    this.amount += Number(money);
    this.operation = operation;
    this.logs = logs || [];
  }

  promptQuestions() {
    return this.start(this.amount, this.logs);
  }

  addMoney() {
    inquirer.prompt([{
      type: 'input',
      name: 'addAmount',
      message: 'Enter amount you want to deposit:',
      validate: (val) => Boolean(val) || 'Please enter an amount!',
    }]).then(({ addAmount }) => {
      this.amount += Number(addAmount);
      this.logs.push({
        event: 'ADD',
        amountAdd: Number(addAmount),
        date: new Date()
      });
      console.log('Operation Successful! 🥳\n');
      return this.promptQuestions();
    });
  }

  withdrawMoney() {
    inquirer.prompt([{
      type: 'input',
      name: 'drawedAmount',
      message: 'Enter amount you want to withdraw:',
      validate: (val) => Boolean(val) || 'Please enter an amount!',
    }]).then(({ drawedAmount }) => {
      this.amount -= Number(drawedAmount);
      this.logs.push({
        event: 'WITHDRAW',
        amountDeducted: Number(drawedAmount),
        date: new Date()
      });
      console.log('Operation Successful! 🥳\n');
      return this.promptQuestions();
    });
  }

  transferMoney() {
    inquirer.prompt([{
      type: 'input',
      name: 'transfer',
      message: 'Type the name of the reciever then amount',
      default: 'John 500',
      validate: (val) => val.split(' ').length < 3 || 'Please enter correctly!',
    }]).then(({ transfer }) => {
      const amountDeducted = Number(transfer.split(' ')[1]);
      this.amount -= amountDeducted;
      this.logs.push({
        amountDeducted,
        reciever: transfer.split(' ')[0],
        event: 'ADD',
        date: new Date()
      });
      console.log('Operation Successful! 🥳\n');
      return this.promptQuestions();
    });
  }

  showLogs() {
    console.log(`${JSON.stringify(this.logs, null, 2)}\n`);
    return this.promptQuestions();
  }

  showBalance() {
    console.log(`Your balance is: ${this.amount}\n`);
    return this.promptQuestions();
  }

}