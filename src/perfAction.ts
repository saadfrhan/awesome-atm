import inquirer from "inquirer"
import PromptQuestions from ".";
import { questions } from "./questions";
import { LogsI } from "./ts/interfaces";

export default class PerfAction {

  public logs: LogsI[] = []
  public amount: number = 0;
  public operation: string = '';

  constructor({ operation, money, logs }: { operation: string, money: number, logs?: LogsI[] }) {
    this.amount += Number(money);
    this.operation = operation;
    this.logs = logs || [];
  }

  addMoney() {
    inquirer.prompt([{
      type: 'input',
      name: 'addAmount',
      message: 'Enter amount you want to deposit:',
      validate: (val) => Boolean(val) || 'Please enter an amount!',
    }]).then(({ addAmount }) => {
      console.log(this.amount);
      console.log(addAmount);
      this.amount += Number(addAmount)
      this.logs.push({
        event: 'ADD',
        amountAdd: Number(addAmount),
        date: new Date()
      });
      console.log('Operation Successful! 🥳\n')
      return new PromptQuestions([questions[3]]).start(this.amount, this.logs);
    });
  }

  withdrawMoney() {
    inquirer.prompt([{
      type: 'input',
      name: 'drawedAmount',
      message: 'Enter amount you want to withdraw:',
      validate: (val) => Boolean(val) || 'Please enter an amount!',
    }]).then(({ drawedAmount }) => {
      this.amount -= Number(drawedAmount)
      this.logs.push({
        event: 'WITHDRAW',
        amountDeducted: Number(drawedAmount),
        date: new Date()
      })
      console.log('Operation Successful! 🥳\n')
      return new PromptQuestions([questions[3]]).start(this.amount, this.logs);
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
      const reciever = transfer.split(' ')[0];
      this.amount -= amountDeducted;
      const trans: LogsI = {
        amountDeducted,
        reciever,
        event: 'ADD',
        date: new Date()
      }
      this.logs.push(trans);
      console.log('Operation Successful! 🥳\n')
      return new PromptQuestions([questions[3]]).start(this.amount, this.logs);
    });
  }

  showLogs() {
    console.log(`${this.logs}\n`);
    return new PromptQuestions([questions[3]]).start(this.amount, this.logs);
  }

  showBalance() {
    console.log(`Your balance is: ${this.amount}\n`);
    return new PromptQuestions([questions[3]]).start(this.amount, this.logs);
  }

}