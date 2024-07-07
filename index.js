#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let name;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function title() {
  const title = "Rock-Paper-Scissor-CLI \n";
  figlet(title, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
  await sleep(1000);
}

async function start() {
  console.log(`
    Enter ${chalk.red("R/r for Rock")} | ${chalk.blue(
    "P/p for Paper"
  )} | ${chalk.green("S/s for Scissor")}`);
  await sleep(1000);
  console.log(
    `The Computer will ${chalk.yellow("randomly select any option")}`
  );
}

async function handleAnswer(choice) {
  const spinner = createSpinner("Rock Paper Scissor Shoot...").start();
  let check = choice.toUpperCase();
  await sleep(500);
  spinner.stop();
  if (check !== "R" && check !== "S" && check !== "P") {
    console.log("Not a valid input ");
  } else {
    let random = Math.floor(Math.random() * 3 + 1);
    let compChoice;
    let fullChoice;
    if (random === 1) {
      compChoice = "R";
      fullChoice = "Rock";
    }
    if (random === 2) {
      compChoice = "P";
      fullChoice = "Paper";
    }
    if (random === 3) {
      compChoice = "S";
      fullChoice = "Scissor";
    }
    console.log("Computer choose " + chalk.cyanBright(fullChoice));

    if (check === "R" && compChoice === "R") {
      console.log(chalk.blue("Draw"));
    }
    if (check === "R" && compChoice === "P") {
      console.log(chalk.red("You Lose"));
    }
    if (check === "R" && compChoice === "S") {
      console.log(chalk.green("You Win"));
    }
    if (check === "P" && compChoice === "R") {
      console.log(chalk.green("You Win"));
    }
    if (check === "P" && compChoice === "P") {
      console.log(chalk.blue("Draw"));
    }
    if (check === "P" && compChoice === "S") {
      console.log(chalk.red("You Lose"));
    }
    if (check === "S" && compChoice === "R") {
      console.log(chalk.red("You Lose"));
    }
    if (check === "S" && compChoice === "P") {
      console.log(chalk.green("You Win"));
    }
    if (check === "S" && compChoice === "S") {
      console.log(chalk.blue("Draw"));
    }
  }
}

async function takeAnswer() {
  const answer = await inquirer.prompt({
    name: "pick",
    type: "input",
    message: "Select Choice (R/P/S)",
    default() {
      return "F";
    },
  });
  return handleAnswer(answer.pick);
}

async function repeat() {
  for (let i = 1; i === 1; ) {
    await start();
    await takeAnswer();
    const cont = await inquirer.prompt({
      name: "pick",
      type: "input",
      message: "Play Again? (Y/N)",
      default() {
        return "N";
      },
    });
    if (cont.pick !== "Y" && cont.pick !== "y") {
      i = 0;
    } else {
      console.log(
        gradient(
          "cyan",
          "red",
          "green"
        )("-------------------------------------------------------")
      );
    }
  }
}
await title();
await repeat();
