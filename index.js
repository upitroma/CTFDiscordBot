const Discord = require('discord.js');
const config = require("./token.json");
const strings = require("./strings.json");
const bot = new Discord.Client();
bot.login(config.TOKEN);


class Hacker{
    constructor(userId, username){
        this.userId=userId;
        this.score=0;
        this.achievements=[];
        this.username=username;
    }
}
hackers=[];


const flagPrefix = 'NTI{';
//const botChannel=client.channels.cache.get('775031298371878942')
var botChannel
bot.once("ready", async () => {
    // Fetch the channel
    botChannel = await bot.channels.fetch("775031298371878942")
    // Note that it's possible the channel couldn't be found
    if (!botChannel) {
      return console.log("could not find channel")
    }
  
    botChannel.send("Hello world!")
  })

bot.on("message", (message) => {
    
    isValidFlag=false;

    if (message.content.startsWith(flagPrefix)){
        //message is a flag

        for(i=0;i<strings.flags.length;i++){
            if(message.content==strings.flags[i]){
                isValidFlag=true

                //flag is valid
                hackerExists=false
                for(j=0;j<hackers.length;j++){
                    h=hackers[j]
                    if(h.userId==message.author.id){
                        hackerExists=true

                        allreadyGotFlag=false

                        for(a=0;a<h.achievements.length;a++){
                            if(h.achievements[a]==strings.achievements[i]){
                                allreadyGotFlag=true;
                            }
                        }

                        if(allreadyGotFlag){
                            botChannel.send(/*"<#"+message.channel.id+">"+*/"  <@"+message.author.id+"> You already submitted that flag. No points for you.");
                        }
                        else{
                            h.score+=strings.pointValues[i];
                            h.achievements.push(strings.achievements[i]);
                            botChannel.send(/*"<#"+message.channel.id+">"+*/"  <@"+message.author.id+"> "+strings.responses[i]+"\n+"+strings.pointValues[i]+"\ncurrent score: "+h.score);
                        }

                        
                    }
                }
                if(!hackerExists){
                    h=new Hacker(message.author.id, message.author.username)
                    hackers.push(h)

                    h.score+=strings.pointValues[i];
                    h.achievements.push(strings.achievements[i]);
                    botChannel.send(/*"<#"+message.channel.id+">"+*/"  <@"+message.author.id+"> "+strings.responses[i]+"\n+"+strings.pointValues[i]+"\ncurrent score: "+h.score);
                    console.log("new hacker added! username: "+message.author.username)
                }
            }
        }


        if(!isValidFlag){
            botChannel.send("<@"+message.author.id+"> You didn't say the magic word.");
        }

        message.delete();
        return
    }

    else if(message.content=="!score"){
        printScore()
    }

    else if(message.content.includes("I'm")&& message.author.bot === false){
        dadMsg = message.content.split(`I'm`).pop();
        botChannel.send("<@"+message.author.id+"> Hi"+dadMsg+", I'm dad!");
    }
});


function printScore(){

    hackers.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();


    scoreboard="";

    for(i=0;i<hackers.length;i++){
        scoreboard+=hackers[i].username+" Score: "+hackers[i].score+"\n";//+"\nAchievements:\n";
        for(j=0;j<hackers[i].achievements.length;j++){
            scoreboard+="\t"+hackers[i].achievements[j]+"\n";
        }
    }
    botChannel.send(scoreboard);
}