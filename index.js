
//spaghetti code belo

const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require('./botconfig.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
var killet;
var defaultEmbed;
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}




client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!\nKilletbot Development HQ :tm:`);
    killet = client.users.cache.find(u => u.id === "501885489683628036");

    
    defaultEmbed = new Discord.MessageEmbed()
    .setColor('#681482')
    .setURL('https://tetr.io/')
    .setTimestamp()
    .setFooter( 'KilletBot™ HQ',  killet.avatarURL());


});

client.on("message", async message => {
  
    //checks for killet and if starts with >, stops code execution if not
    if(message.author.id !== "501885489683628036" && message.author.id !== "263922052468178944") return;
    if (!message.content.startsWith(prefix)) return;

    var cmdmsg = message.content.toLowerCase();
    const args = cmdmsg.split(/ +/); //sets up arguments for dynamic user-input
    cmdmsg = cmdmsg.replace(prefix, '');
    var command = cmdmsg.split(" ");

    console.log("Command entered by: " + message.author + " aka (" + message.author.username  + ") in #" + message.channel.name + " contents: " + cmdmsg);    //logs the command that was ran

    if (!client.commands.has(command[0])) return; //checks if the command is valid, exits if not

    try {

        client.commands.get(command[0]).execute(message, args, defaultEmbed, client);

    } catch (error) {

        console.error(error);

        message.channel.send('There was an error trying to execute that command!');

    }

});

client.login(token);