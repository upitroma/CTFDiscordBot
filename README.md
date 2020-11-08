# CTFDiscordBot
a bot to help manage the ctf

## how to setup
1. install node.js
2. add a file named `secrets.json` to the root
3. add your token and logins to secrets.json like this 
```json
{
    "TOKEN":"your_secret_token_here",
    "LOGINS":[
        {"username":"user1","password":"user1's_password"},
        {"username":"user2","password":"user2's_password"}
    ]
}
```
4. configure flags and responses in `strings.json`
5. run `node index.js`
