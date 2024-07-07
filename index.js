#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let name;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function start() {
  const title = chalkAnimation.neon("Rock-Paper-Scissor-CLI \n");
  await sleep();
  title.stop();

  console.log(`
    Enter ${chalk.bgRed("R/r for Rock")} | ${chalk.bgRed(
    "P/p for Paper"
  )} | ${chalk.bgRed("S/s for Scissor")}
    The Computer will ${chalk.bgBlue("randomly select any option")}`);
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
    console.log("Computer choose " + compChoice);

    if (check === "R" && compChoice === "R") {
      console.log("Draw");
    }
    if (check === "R" && compChoice === "P") {
      console.log("You lose");
    }
    if (check === "R" && compChoice === "S") {
      console.log("You win");
    }
    if (check === "P" && compChoice === "R") {
      console.log("You win");
    }
    if (check === "P" && compChoice === "P") {
      console.log("Draw");
    }
    if (check === "P" && compChoice === "S") {
      console.log("You lose");
    }
    if (check === "S" && compChoice === "R") {
      console.log("You lose");
    }
    if (check === "S" && compChoice === "P") {
      console.log("You win");
    }
    if (check === "S" && compChoice === "S") {
      console.log("Draw");
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

await start();
await takeAnswer();
