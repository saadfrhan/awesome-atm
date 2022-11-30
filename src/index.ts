#!/usr/bin/env node

import inquirer, { Answers, QuestionCollection } from 'inquirer';
import DecideOperation from './decideOperation.js';
import { questions } from './questions.js';
import { LogsI } from './ts/types.js';
import { welcome } from './utils/welcome.js';

export default async function promptQuestions(
  questions: QuestionCollection<Answers>,
  amount?: number,
  logs?: LogsI[]
): Promise<void> {
  if (amount && logs) {
    const { operation } = await inquirer.prompt(questions);
    return DecideOperation({ operation, amount, logs });
  } else {
    const { operation, amount } = await inquirer.prompt(questions);
    return DecideOperation({ operation, amount });
  }
}

await welcome();
await promptQuestions(questions)
