var Discord = require('discord.js');
var logger = require('winston');
var rgbHex = require("rgb-hex");
var request = require('ajax-request');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
    autoReconnect: true
});
bot.on('ready', () =>  {
    bot.user.setStatus("online"); //dnd , online , ldle, invisible
    bot.user.setGame("Hello!"); //sets game
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
});
bot.on("guildMemberAdd", member => {
    var minionNames = ["Kevin", "Dave", "Bob", "Stuart"];
    var brightness = Math.floor(Math.random() * 55) +200;
    member.guild.createRole({
        name: minionNames[Math.floor(Math.random() * minionNames.length)],
        color: rgbHex(brightness, brightness, 0)
    }, "Because I want to?")
        .then(role => member.addRole(role));
});
bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                message.channel.send("`Fuck off m8`");
            break;
            case "cat":
                message.channel.send("`Cats are ugly`");
            break;
            case "deleteroles":
                for (var role of message.guild.roles) {
                    if (role[1].members.keyArray().length == 0) {
                        role[1].delete();
                    }
                }
                message.channel.send("`Succesfully deleted all unused roles!`");
            break;
            case "minion":
                request.download({
                    url: ' https://www.reddit.com/r/wackytictacs/random.json',
                    destPath: function(filename) {
                    return filename;
                    }
                }, function(err, res, body, destpath) { });


            // Just add any case commands if you want to..
         }
     }
});

bot.login(require("./token.json"));
