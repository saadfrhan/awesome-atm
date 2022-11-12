import inquirer, { Answers, QuestionCollection } from 'inquirer';
import DecideOperation from './decideOperation';
import { questions } from './questions';
import { LogsI } from './ts/types';

export default class PromptQuestions {
  questions: QuestionCollection<Answers>;

  constructor(questions: QuestionCollection<Answers>) {
    this.questions = questions;
  }

  async start(amount?: number, logs?: LogsI[]): Promise<void> {
    if (amount && logs) {
      const { operation } = await inquirer.prompt(this.questions);
      return DecideOperation({ operation, amount, logs });
    } else {
      const { operation, amount } = await inquirer.prompt(this.questions);
      return DecideOperation({ operation, amount: Number(amount) });
    }
  }
}


new PromptQuestions(questions).start();

