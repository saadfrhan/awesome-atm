import { validate } from './utils/validator.js';

export const questions = [
  {
    type: 'input',
    name: 'id',
    message: 'Enter user id:',
    validate: (val: string) => validate(val),
    default: '1234'
  },
  {
    type: 'input',
    name: 'pin',
    message: 'Enter user PIN Code:',
    validate: (val: string) => validate(val),
    default: '1234'
  },
  {
    type: 'input',
    name: 'amount',
    message: 'Enter money you want to have:',
    validate: (val: string) => validate(val),
    filter: (val: string) => Number(val),
    default: '1000'
  },
  {
    type: 'list',
    name: 'operation',
    message: 'Choose an operation:',
    choices: [
      'Withdraw Money',
      'Add Money',
      'Transfer Money',
      'Logs',
      'Balance',
      'Exit'
    ],
    filter: (val: string) => val.split(' ')[0].toUpperCase(),
  }
];

