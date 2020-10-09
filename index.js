const Discord = require('discord.js');
const config = require("./token.json");
const flags = require("./flags.json");
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
        
        for(i=0;i<flags.flags.length;i++){
            if(message.content==flags.flags[i]){
                isValidFlag=true
                message.channel.send("<#"+message.channel.id+">"+"  <@"+message.author.id+"> "+flags.responses[i]);
            }
        }


        if(!isValidFlag){
            message.channel.send("<@"+message.author.id+"> Invalid flag.");
        }

        message.delete();
        return
    }

});