import inquirer, { Answers, QuestionCollection } from "inquirer";
import perfAction from "./perfAction";
import { questions } from "./questions";

export default function promptQuestions(questions: QuestionCollection<Answers>) {
  inquirer.prompt(questions).then((vals) => (
    perfAction({ operation: vals.operation, money: vals.money })
  ))
}

promptQuestions(questions);