const Discord = require('discord.js');
const client = new Discord.Client();
client.login("NzYzOTI1MzM2OTA3MDU1MTI0.X3-y6Q.XF0r8bb4sWCXvaIJpZngWV_T_FI");

const flagPrefix = 'NTI{';

// When the bot is connected and ready, log to console.
client.on('ready', () => {
   console.log('ready.');
});

client.on("message", (message) => {
    
    isValidFlag=false;

    if (message.content.startsWith(flagPrefix)){

        //message is a flag
        if (message.content==("NTI{flag1}")) {
            message.channel.send("flag1!");
            isValidFlag=true;
        }
        if (message.content==("NTI{flag2}")) {
            message.channel.send("flag2!");
            isValidFlag=true;
        }

        if(!isValidFlag){
            message.channel.send("Invalid flag!");
        }

        message.delete();
    }

});