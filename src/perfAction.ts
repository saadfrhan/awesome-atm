import inquirer from "inquirer"
import promptQuestions from ".";
import { questions } from "./questions";
import { InquirerPromptFuncI, LogsI } from "./ts/interfaces";

let amount = 0;
let logs: LogsI[] = []

export default function perfAction({ operation, money }: { operation: string, money: number }) {
  amount = money
  switch (operation) {
    case 'ADD':
      promptInquirer({
        name: "addAmount",
        validateMessage: "Please enter an amount!",
        action({ addAmount }) {
          amount += Number(addAmount)
          logs.push({
            event: 'ADD',
            amountAdd: Number(addAmount),
            date: new Date()
          });
          console.log('Operation Successful! 🥳\n')
          return promptQuestions([questions[3]]);
        },
        message: 'Enter amount you want to deposit:',
        validateFunc: (val) => Boolean(val)
      });
      break;

    case 'TRANSFER':
      promptInquirer({
        name: "transfer",
        validateMessage: "Please enter correctly!",
        action({ transfer }) {
          const amountDeducted = Number(transfer.split(' ')[1]);
          const reciever = transfer.split(' ')[0];
          const trans: LogsI = {
            amountDeducted,
            reciever,
            event: 'ADD',
            date: new Date()
          }
          amount -= amountDeducted;
          logs.push(trans);
          console.log('Operation Successful! 🥳\n')
          return promptQuestions([questions[3]]);

        },
        message: 'Type the name of the reciever then amount',
        defaultVal: 'John 500',
        validateFunc: (val) => val.split(' ').length < 3
      });
      break;

    case 'WITHDRAW':
      promptInquirer({
        name: "drawedAmount",
        validateMessage: "Please enter an amount!",
        action({ drawedAmount }) {
          amount -= Number(drawedAmount)
          logs.push({
            event: 'WITHDRAW',
            amountDeducted: Number(drawedAmount),
            date: new Date()
          })
          console.log('Operation Successful! 🥳\n')
          return promptQuestions([questions[3]]);

        },
        message: 'Enter amount you want to withdraw:',
        validateFunc: (val) => Boolean(val),
      });
      break;

    case 'LOGS':
      console.log('Your logs! 🥳\n')
      console.log(`${JSON.stringify(logs, null, 2)}\n`);
      return promptQuestions([questions[3]])

    case 'BALANCE':
      console.log(`Your Balance: ${amount}\n`);
      return promptQuestions([questions[3]])

    default:
      return;
  }
}

function promptInquirer({ message, validateMessage, action, defaultVal, validateFunc, name }: InquirerPromptFuncI) {
  inquirer.prompt([{
    type: 'input',
    name,
    message,
    default: defaultVal,
    validate: validateFunc || validateMessage,
  }]).then(action);
}
