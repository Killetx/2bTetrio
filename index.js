
//spaghetti code belo

const fs = require('fs');
const { prefix, token } = require('./botconfig.json');
const Discord = require("discord.js");
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nKilletbot Development HQ :tm:`);
});

client.on("message", async message => {

    //checks for killet and if starts with >, stops code execution if not.
    if(!message.author.id == "501885489683628036") return;
    if (!message.content.startsWith(prefix)) return;

    var cmdmsg = message.content;

    //logs the command that was ran
    console.log("Command entered by: " + message.author + " aka (" + message.author.username  + ") in #" + message.channel.name + " contents: " + message.content);

    const args = message.content.split(/ +/);

    console.log("args" + args);

    cmdmsg = cmdmsg.replace(prefix, '');
    var command = cmdmsg.split(" ");

    console.log("command" + command);


    //IF THE COMMAND THAT A USER SENDS DOES NOT EXIST YET THEN IT WILL END THE CODE EARLY
    if (!client.commands.has(command[0])) return;

    try {
        client.commands.get(command[0]).execute(message, args);
        console.log("thru2");
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error trying to execute that command!');
    }

    
});



client.login(token);