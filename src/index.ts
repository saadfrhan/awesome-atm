#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import inquirer, { Answers, QuestionCollection } from 'inquirer';
import DecideOperation from './decideOperation.js';
import { questions } from './questions.js';
import { LogsI } from './ts/types.js';

const sleep = (ms: number = 2000) => new Promise(resolve => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the ATM!');
  await sleep();
  console.log(`
    ${chalk.bgBlueBright('Instructions:')}
    ${chalk.blue('1.')} Enter User ID and PIN Code.
    ${chalk.blue('2.')} Enter initial amount of money.
    ${chalk.blue('3.')} Choose an Operation.
  `);
  rainbowTitle.stop();
  await sleep(1000);
}

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
    return DecideOperation({ operation, amount: Number(amount) });
  }
}

await welcome();
await promptQuestions(questions)
