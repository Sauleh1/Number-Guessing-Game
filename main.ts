#!/usr/bin/env node

import inquirer from "inquirer";
import randomInteger from "random-int";
import showBanner from "node-banner";
import gradient from "gradient-string";
import chalk from "chalk";

let min = 1;
let max = 10;
let CompChoice = randomInteger(min, max);

(async () => {
    await showBanner("Number Guessing Game!", "Guess the numbers!", "red", "blue");
})();

async function Game() {
    while (true) {
            let ask = await inquirer.prompt([
                {
                    name: "YourChoice",
                    type: "number",
                    message: gradient.pastel(`Guess a number from ${min} to ${max}`),
                    validate: (input: number) => {
                        if (isNaN(input)) {
                            return "Enter a number only, please."
                        }
                        return true
                    }
                }
            ])
            let { YourChoice } = ask;

            if (YourChoice) {
                if (YourChoice === CompChoice) {
                    console.log(chalk.cyanBright(`You guessed the Number!`));
                    let ask = await inquirer.prompt([
                        {
                            name: "Again",
                            type: "list",
                            choices: [`Yes`,`No`],
                            message: "Play again?"
                        }
                    ])
                    let { Again } = ask;

                    if (Again == "Yes") {
                        CompChoice = randomInteger(1, 10);
                    } else {
                        console.log(gradient.retro(`Thanks for playing!`));
                        process.exit();
                    }
                }
                else if (YourChoice > CompChoice) {
                    console.log(chalk.cyanBright(`OOPS! Try a lower number!`));
                }
                else if (YourChoice < CompChoice) {
                    console.log(chalk.cyanBright(`OOPS! Try a higher number!`));
                }
            }
    }
}

setTimeout(() => {
    Game();
}, 100);
