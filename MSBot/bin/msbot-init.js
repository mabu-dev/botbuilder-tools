"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const BotConfig_1 = require("./BotConfig");
const readline = require("readline-sync");
program
    .name("msbot init")
    .option('-n, --name <botname>', 'name of the bot')
    .option('-d, --description <description>', 'description of the bot')
    .option('-e, --endpoint <endpoint>', 'local endpoint for the bot')
    .option('-q, --quiet', 'do not prompt')
    .action((name, x) => {
    console.log(name);
});
let args = program.parse(process.argv);
if (!args.quiet) {
    while (!args.hasOwnProperty("name") || args.name.length == 0) {
        args.name = readline.question(`What name would you like for your bot? `);
    }
    if (!args.description || args.description.length == 0) {
        args.description = readline.question(`What description would you like for your bot? `);
    }
    while (!args.endpoint || args.endpoint.length == 0) {
        args.endpoint = readline.question(`What localhost endpoint does your bot use for debugging [Example: http://localhost:3978/api/messages]? `, {
            defaultInput: `http://localhost:3978/api/messages`
        });
    }
}
let bot = new BotConfig_1.BotConfig();
bot.name = args.name;
bot.description = args.description;
bot.connectService({
    type: BotConfig_1.ServiceType.Localhost,
    name: args.name,
    endpoint: args.endpoint,
    description: args.description,
    id: args.endpoint,
    appId: '',
    appPassword: ''
});
let filename = bot.name + '.bot';
bot.Save(filename);
console.log(`${filename} created`);
//# sourceMappingURL=msbot-init.js.map