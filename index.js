const Discord = require('discord.js');
const secrets = require("./secrets.json");
const strings = require("./strings.json");
const bot = new Discord.Client();
bot.login(secrets.TOKEN);


class Hacker{
    constructor(userId, username){
        this.userId=userId;
        this.score=0;
        this.achievements=[];
        this.username=username;
        this.login=null;
    }
}
hackers=[];


const flagPrefix = 'NTI{';
//const botChannel=client.channels.cache.get('775031298371878942')
var botChannel
bot.once("ready", async () => {
    // Fetch the channel
    botChannel = await bot.channels.fetch("759916479835275305")
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
                    botChannel.send("  <@"+message.author.id+"> "+strings.responses[i]+"\n+"+strings.pointValues[i]+"\ncurrent score: "+h.score);
                    console.log("new hacker added! username: "+message.author.username)
                }
            }
        }


        if(!isValidFlag){
            wittyResponse=strings.invalidFlagResponses[Math.floor(Math.random() * strings.invalidFlagResponses.length)];
            botChannel.send("<@"+message.author.id+"> "+wittyResponse+".");
        }

        message.delete();
        return
    }

    else if(message.content.includes("!score")){
        printScore()
    }

    else if(false/*message.content.includes("!login")*/){
        sendLogin(message.author)
    }

    else if(message.content.includes("I'm")&& message.author.bot === false){
        dadMsg = message.content.split(`I'm`).pop();
        botChannel.send("<@"+message.author.id+"> Hi"+dadMsg+", I'm dad!");
    }
});
var loginIndex=0
function sendLogin(author){
    hackerExists=false
    h=null;
    for(j=0;j<hackers.length;j++){
        h=hackers[j]
        if(h.userId==author.id){
            hackerExists=true
            break;
        }
    }
    if(!hackerExists){
        h=new Hacker(author.id,author.username)
        hackers.push(h)
    }

    if(!h.login){
        if(loginIndex>=secrets.LOGINS.length-1){
            console.log("I've run out of logins. HALP!")
            h.login=secrets.LOGINS[secrets.LOGINS.length-1];
        }
        else{
            h.login=secrets.LOGINS[loginIndex++]
        }
    
        author.send("username: "+h.login.username+"\npassword: "+h.login.password)
    
        botChannel.send(h.username+" was assigned user: "+h.login.username)
        console.log(h.username+" assigned login: "+h.login.username+" "+h.login.password)
    }
    else{
        botChannel.send("<@"+author.id+"> You've allready been given a login. Check your DMs.")
    }
    
    
}

function printScore(){

    if(!hackers){
        botChannel.send("something horribly wrong has happened. Tell my owner to check their error logs.");
        return;
    }
    if(hackers.length==0){
        botChannel.send("0. The score is 0. Nobody has scored. You all are terrible at this.");
        return;
    }

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