import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = (ms: number = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export async function welcome() {
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