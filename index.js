const Discord = require('discord.js');
const config = require("./token.json");
const strings = require("./strings.json");
const client = new Discord.Client();
client.login(config.TOKEN);

const flagPrefix = 'NTI{';

client.on('ready', () => {
   console.log('ready.');
});

client.on("message", (message) => {
    
    isValidFlag=false;

    if (message.content.startsWith(flagPrefix)){
        //message is a flag

        for(i=0;i<strings.flags.length;i++){
            if(message.content==strings.flags[i]){
                isValidFlag=true
                message.channel.send("<#"+message.channel.id+">"+"  <@"+message.author.id+"> "+strings.responses[i]);
            }
        }


        if(!isValidFlag){
            message.channel.send("<@"+message.author.id+"> Invalid flag.");
        }

        message.delete();
        return
    }

});