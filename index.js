const Discord = require('discord.js');
const config = require("./token.json");
const strings = require("./strings.json");
const client = new Discord.Client();
client.login(config.TOKEN);


class Hacker{
    constructor(userId){
        this.userId=userId;
        this.score=0;
        this.achievements=[];
    }
}
hackers=[];


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

                //reward hacker
                hackerExists=false
                for(i=0;i<hackers.length;i++){
                    h=hackers[i]
                    if(h.userId==message.author.id){
                        hackerExists=true
                        h.score++;
                        message.channel.send(/*"<#"+message.channel.id+">"+*/"  <@"+message.author.id+"> "+strings.responses[i]+"\n"+"current score: "+h.score);
                    }
                }
                if(!hackerExists){
                    h=new Hacker(message.author.id)
                    h.score=1;
                    hackers.push(h)
                    message.channel.send(/*"<#"+message.channel.id+">"+*/"  <@"+message.author.id+"> "+strings.responses[i]+"\n"+"current score: "+h.score);
                    console.log("new hacker added! username: "+message.author.username)
                }


            }
        }


        if(!isValidFlag){
            message.channel.send("<@"+message.author.id+"> You didn't say the magic word.");
        }

        message.delete();
        return
    }

});