export const questions = [
  {
    type: 'input',
    name: 'id',
    message: 'Enter user id:',
    validate: validateVal(4)
  },
  {
    type: 'input',
    name: 'pin',
    message: 'Enter user PIN Code:',
    validate: validateVal(4)
  },
  {
    type: 'input',
    name: 'money',
    message: 'Enter money you want to have:',
    validate: validateVal(),
    filter: (val: string) => Number(val)
  },
  {
    type: 'list',
    name: 'operation',
    message: 'Choose an operation:',
    choices: [
      "Withdraw Money",
      "Add Money",
      "Transfer Money",
      "Logs",
      "Balance",
      "Exit"
    ],
    filter: (val: string) => val.split(' ')[0].toUpperCase(),
  }
]

function validateVal(len?: number) {
  return (val: string) => {
    const isValid = len ? val.length === len : val !== '';
    return isValid || 'Please enter correctly!';
  }
}