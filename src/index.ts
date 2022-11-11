import inquirer, { Answers, QuestionCollection } from 'inquirer';
import PerfAction from './perfAction';
import { questions } from './questions';
import { LogsI, PerfActionI } from './ts/types';

export default class PromptQuestions {
  questions: QuestionCollection<Answers>;

  constructor(questions: QuestionCollection<Answers>) {
    this.questions = questions;
  }

  findCasePerformAction(args: PerfActionI) {
    switch (args.operation) {
      case 'ADD':
        return new PerfAction(args).addMoney();
      case 'WITHDRAW':
        return new PerfAction(args).withdrawMoney();
      case 'TRANSFER':
        return new PerfAction(args).transferMoney();
      case 'LOGS':
        return new PerfAction(args).showLogs();
      case 'BALANCE':
        return new PerfAction(args).showBalance();
      case 'EXIT':
        return console.log('Bye Bye! 👋');
      default:
        return console.log('Something went wrong! 😢');
    }
  }

  start(moneyExists?: number, logsExists?: LogsI[]) {
    if (moneyExists && logsExists) {
      inquirer.prompt(this.questions).then(({ operation }) => {
        return this.findCasePerformAction({
          operation,
          money: moneyExists as number,
          logs: logsExists,
        });
      });
    } else {
      inquirer.prompt(this.questions).then(({ operation, money }) => {
        return this.findCasePerformAction({ operation, money });
      });
    }
  }
}

new PromptQuestions(questions).start();
