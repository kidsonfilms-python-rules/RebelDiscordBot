const Discord = require('discord.js')

const animals = require('relevant-animals')

const scorerank = require('scorerank')

const url = 'redis://127.0.0.1:6379'
const options = { prefix: 'scores' }

const redis = require("redis");
const redisClient = redis.createClient();

redisClient.on("error", function (error) {
    console.error(error);
});

redisClient.set("key", "value", redis.print);
redisClient.get("key", redis.print);

const score = scorerank(url, options)

//the var client is basically the bot
const client = new Discord.Client()

// tells the bot what to look for to figure out, thats a command is coming
const prefix = '-'

client.once('ready', () => {
    console.log('Im online yay!')
})

client.on('message', async message => {
    //checks if it starts with '!' or the bot sent it. if not then returns the function
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //getting the args from the message
    const args = message.content.slice(message.length).split(/ +/)
    console.log(args)

    //makes the args all lowercase (make it not case sensitive)
    const commandList = args.map(v => v.toLowerCase());
    console.log(commandList)
    const command = commandList[0]

    if (command === prefix + 'help') {
        message.channel.send('Here are all the commands: \n-ping  -- tests if the bot is online \n-animals  -- returns a random cute animal\n-cube-record  -- records a cube time record')
    } else if (command === prefix + 'ping') {
        message.channel.send('pong!')
    } else if (command === prefix + 'animals') {
        animals.dog().then(s => message.channel.send("Here you go :smiley:", { files: [s] }))
    } else if (command === prefix + 'cube-record') {
        var dict = {
            1: "1st",
            2: "2nd",
            3: "3rd",
            4: "4th",
            5: "5th",
            6: "6th",
            7: "7th",
            8: "8th",
            9: "9th",
            10: "10th"
        };
        // message.channel.send('I cant set rubix cube records yet :weary:')
        console.log(command)
        if (commandList[1] === "set") {
            console.log("contains set")
            const sender = message.author.username
            const time = commandList[2]
            console.log(sender)
            score.add(sender, time*-1)
        } else if (commandList[1] === "display") {
            const tops = await score.top([0, 10])
            console.log(tops)
            var rankMessage = ''
            var indexRank = 1
            tops.forEach(rank => {
                rankNum = dict[indexRank]
                time = rank[1].toString().replace('-', '')
                rankMessage += rankNum + ".  " + rank[0] + ' with the time of ' + time + '\n'
                indexRank = indexRank + 1
            })
            console.log(rankMessage)
            message.channel.send(rankMessage)
        }

    }

})


//Lead Dev will give token
client.login('NzM3NDI0Mzk3MDc3NDQ2Njg4.Xx9J_A.db9LPGZR1qxL_6EAEZQRb63DjaQ')