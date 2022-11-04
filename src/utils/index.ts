import inquirer from "inquirer";
import { InquirerPromptFuncI } from "../ts/interfaces";

export function validateVal(len?: number) {
  return (val: string) => {
    const isValid = len ? val.length === len : val !== '';
    return isValid || 'Please enter correctly!';
  }
}

export function promptInquirer({ message, validateMessage, action, defaultVal, validateFunc, name }: InquirerPromptFuncI) {
  inquirer.prompt([{
    type: 'input',
    name,
    message,
    default: defaultVal,
    validate: validateFunc || validateMessage,
  }]).then(action);
}
