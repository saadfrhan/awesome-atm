import inquirer, { Answers, QuestionCollection } from "inquirer";
import PerfAction from "./perfAction";
import { questions } from "./questions";
import { LogsI, StartingArgsI } from "./ts/interfaces";

// ! TODO - Sort this type error!
export default class PromptQuestions {
  questions: QuestionCollection<Answers>;

  constructor(questions: QuestionCollection<Answers>) {
    this.questions = questions;
  }

  start(moneyExists?: number, logsExists?: LogsI[]) {
    if (!moneyExists && !logsExists) {
      inquirer.prompt(this.questions).then(({ operation, money }) => {
        return this.findCaseAndPerform(operation, { operation, money } as StartingArgsI);
      });
    } else {
      inquirer.prompt(this.questions).then(({ operation }) => {
        const args: StartingArgsI = {
          operation,
          money: moneyExists,
          logs: logsExists
        };
        return this.findCaseAndPerform(operation, args);
      });
    }
  }

  findCaseAndPerform(operation: string, args: StartingArgsI) {
    const perfAction = new PerfAction(args);
    switch (operation) {
      case "ADD":
        return perfAction.addMoney();
      case "WITHDRAW":
        return perfAction.withdrawMoney();
      case "TRANSFER":
        return perfAction.transferMoney();
      case "LOGS":
        return perfAction.showLogs();
      case "BALANCE":
        return perfAction.showBalance();
      case "EXIT":
        return console.log("Bye Bye! 👋");
      default:
        return console.log("Something went wrong! 😢");
    }
  }


}

new PromptQuestions(questions).start();