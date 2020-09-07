// app = require('app')

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

const Discord = require('discord.js')

const animals = require('relevant-animals')

var schedule = require('node-schedule');

const scorerank = require('scorerank')

var textract = require('textract');

const url = 'redis://127.0.0.1:6379'
const options = { prefix: 'scores' }

let https = require('https')

// const redis = require("redis");
// const redisClient = redis.createClient();

// redisClient.on("error", function (error) {
//     console.error(error);
// });

// redisClient.set("key", "value", redis.print);
// redisClient.get("key", redis.print);

// const score = scorerank(url, options)

//the var client is basically the bot
const client = new Discord.Client()



// tells the bot what to look for to figure out, thats a command is coming
const prefix = '-'

client.once('ready', () => {
    console.log('Im online yay!')
})


client.on('message', async message => {
    //MODERATION
    var Filter = require('bad-words'),
        filter = new Filter({ placeHolder: '򯾁' });

    //EASTER EGG
    if (message.content.toString().toLowerCase().includes('suck')) {
        message.reply('no u')
    }

    // console.log(filter.clean(message.content));
    if (filter.clean(message.content).includes('򯾁')) {
        message.delete()
        const mutedEmbed = new Discord.RichEmbed().setColor("#FF0000").setTitle("You Have Been Muted").setDescription("You have been muted for saying ```" + message.content + "``` If you think this is a mistake, contact an @Admin")
        message.author.send(mutedEmbed)
        message.channel.send(message.author.toString() + "** has broken Rebel Retreat's Rules by Saying Blacklisted Words**")
    }

    //checks if it starts with '!' or the bot sent it. if not then returns the function
    if (!message.content.includes(prefix) || message.author.bot) return;

    //getting the args from the message
    const args = message.content.slice(message.length).split(/ +/)
    console.log(args)

    //makes the args all lowercase (make it not case sensitive)
    const commandList = args.map(v => v.toLowerCase());
    console.log(commandList)
    const command = commandList[0]

    if (command === prefix + 'help') {
        if (commandList[1] == 'admin') {      //message.sender.roles.find(r => r.name === "Admin") || message.member.roles.find(r => rname === "Mod"
            var adminhelpembed = new Discord.RichEmbed()
                .setColor('#E96A00')
                .setTitle('Commands List')
                .addFields(
                    { name: '‎', value: '‎' },
                    { name: '**-ping**', value: 'Gives the ping.' },
                    { name: '**-ticketclose `#channelId`**', value: 'Closes a ticket. Replace `#channelId` with the channel id of your ticket' }

                )
                .setFooter('rebel bot • Admin Help Menu')
            message.channel.send(adminhelpembed)
        } else {

            var helpembed = new Discord.RichEmbed()
                .setColor('#E96A00')
                .setTitle('Commands List')
                .setDescription('**If you want Admin Help, do `-help admin`**')
                .addFields(
                    { name: '‎', value: '‎' },
                    { name: '**-help**', value: 'Shows a list of all the commands.' },
                    { name: '**-animals**', value: 'Gives a random cute animal picture! :smiley:' },
                    { name: '**-meme**', value: 'Returns a meme from Reddit' },
                    { name: '**-openticket**', value: 'Opens a ticket' },
                    { name: '**-closeticket**', value: 'Closes a ticket' },

                )
                .setFooter('rebel bot • Help Menu')
            message.channel.send(helpembed)
        }
        // message.channel.send(helpembed)
        message.delete()

    } else if (command === prefix + 'ping') {
        message.channel.send('pong!')
    } else if (command === prefix + 'animals') {
        var anilist = ["dog", 'cat']
        if (anilist[Math.floor(Math.random() * anilist.length)] == 'dog') {
            animals.dog().then(s => message.channel.send("Here you go :smiley:", { files: [s] }))
        } else if (anilist[Math.floor(Math.random() * anilist.length)] == 'cat') {
            animals.shibe().then(s => message.channel.send("Here you go :smiley:", { files: [s] }))
        }
        animals.shibe().then(s => console.log(s))
        message.delete();
    } else if (command === prefix + 'meme') {
        // https.get("https://meme-api.herokuapp.com/gimme", (s) => {
        //     console.log(s)
        // })
        const request = require('request');

        request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            textract.fromUrl(body.url, function (error, text) {
                console.log(body.url + '   ' + text)
            })

            if (body.nsfw == true) {
                console.log(body.url + "has been sent to " + message.author);
                message.channel.send("Here you go " + message.author.toString() + " directly from r/" + body.subreddit.toString() + " (" + body.postLink + ")", { files: [body.url] })
            } else {
                request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    if (body.nsfw == false) {
                        console.log(body.url + "has been sent to " + message.author);
                        message.channel.send("Here you go " + message.author.toString() + " directly from r/" + body.subreddit.toString() + "(" + body.postLink + ")", { files: [body.url] })
                    } else {
                        request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
                            if (err) { return console.log(err); }
                            if (body.nsfw == false) {
                                console.log(body.url + "has been sent to " + message.author);
                                message.channel.send("Here you go " + message.author.toString() + " directly from r/" + body.subreddit.toString() + "(" + body.postLink + ")", { files: [body.url] })
                            } else {
                                const errorEmbed = new Discord.RichEmbed()
                                    .setColor('#FF0000')
                                    .setTitle('ERROR 376  TEST')
                                    .setAuthor('ERROR', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
                                    .setDescription('An Error Has Occurred. Please Try Agian')
                                    .setThumbnail('https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
                                    .setTimestamp()
                                    .setFooter('Error TEST', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png');

                                message.channel.send(errorEmbed);
                            }
                        });
                    }
                });
            }
        });
        message.delete()
    } else if (command === prefix + 'openticket') {
        var name = "ticket-" + message.author.username.toString().toLowerCase() + "-" + Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString()
        message.guild.roles.create({
            data: {
                name: name,
                color: 'DEFAULT',
            },
            reason: 'Role to open ' + name + " ticket",
        }).then(() => {
            const role = message.guild.roles.cache.find(role => role.name === name);
            message.member.roles.add(role);
            var ticketChannel = message.guild.channels.create(name, 'text', [{
                type: 'role',
                id: message.guild.roles.cache.find(role => role.name === '@everyone').id,
                deny: ['VIEW_CHANNEL']
            }, {
                type: 'role',
                id: role,
                allow: ['SEND_MESSAGES', "READ_MESSAGES"]

            }]
            ).then((c) => {
                var ticketChannel = client.channels.cache.find(channel => channel.name === name)
                var adminRoleId = message.guild.roles.cache.find(role => role.name === "Admin");
                var modRoleId = message.guild.roles.cache.find(role => role.name === "Moderator");
                var vipRoleId = message.guild.roles.cache.find(role => role.name === "VIPs");
                ticketChannel.send(`${adminRoleId} ${modRoleId}, ` + message.author.toString() + " has opened a ticket. " + message.author.toString() + `, If you have opened this ticket to get {vipRoleId} state your real first name and if you know anyone, please state who you know.`)
                message.reply(`**Ticket Created! Your ticket is <#${ticketChannel.id.toString()}>.` + ' Use `-closeticket` in <#' + ticketChannel.id.toString() + '> to close it!**')
                message.delete()
            })
        })
    } else if (command == prefix + 'closeticket') {
        if (message.channel.name.includes('ticket')) {
            message.channel.setName('closed-ticket-' + message.channel.name)
            message.channel.delete('Closing ticket ' + message.channel.name)
            const role = message.guild.roles.cache.find(role => role.name === message.channel.name);
            role.delete()
            console.log('SAME CHANNEL')
        } else if (message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Moderator")) {
            if (commandList.length >= 2) {
                try { var ticketChannel = client.channels.cache.find(channel => channel.id === commandList[1].replace('<', '').replace('>', '').replace('#', '')) } catch (err) {
                    message.channel.send(`**Ticket Has failed to close. ERORR: ${err.toString()}. **`)
                    message.delete()
                }
                // ticketChannel.send('THIS FINALLY WORKS!! :fireworks: :smiley: :fireworks:')
                try { ticketChannel.setName('closed-ticket-' + ticketChannel.name) } catch (err) {
                    message.channel.send(`**Ticket Has failed to close. ERORR: ${err.toString()}. **`)
                    message.delete()
                }
                ticketChannel.delete()
                const role = message.guild.roles.cache.find(role => role.name === ticketChannel.name);
                role.delete()
                // console.log(commandList[1])
            }
        } else {
            message.reply('Ticket has failed to close. Please make sure you have proper permissions or have no typos. Here is your failed command: ```sh\n' + message.content.toString() + '\n```')
            message.delete()
        }
    }







    //else if (command === prefix + 'cube-record') {
    //     var dict = {
    //         1: "1st",
    //         2: "2nd",
    //         3: "3rd",
    //         4: "4th",
    //         5: "5th",
    //         6: "6th",
    //         7: "7th",
    //         8: "8th",
    //         9: "9th",
    //         10: "10th"
    //     };
    //     // message.channel.send('I cant set rubix cube records yet :weary:')
    //     console.log(command)
    //     if (commandList[1] === "set") {
    //         console.log("contains set")
    //         const sender = message.author.username
    //         const time = commandList[2]
    //         console.log(sender)
    //         score.add(sender, time*-1)
    //     } else if (commandList[1] === "display") {
    //         const tops = await score.top([0, 10])
    //         console.log(tops)
    //         var rankMessage = ''
    //         var indexRank = 1
    //         tops.forEach(rank => {
    //             rankNum = dict[indexRank]
    //             time = rank[1].toString().replace('-', '')
    //             rankMessage += rankNum + ".  " + rank[0] + ' with the time of ' + time + '\n'
    //             indexRank = indexRank + 1
    //         })
    //         console.log(rankMessage)
    //         message.channel.send(rankMessage)
    //     }

    //}

})

client.on('guildMemberAdd', m => {
    console.log(m.username + " Just Joined!")
    m.send("Welcome to the Rebel Retreat new recruit! You are currently a foreigner and must read the rules (in the #server-rules channel) for this channel to have access to read and send messages to this server. Go to the #self-roles channel to assign yourself roles that suit your tastes. Further roles will be assigned by admins or moderators. Help and support will be given in its respective channel, #help-and-support. Have fun!")
})

//MEME SCHEDULE
var scheduledMeme = schedule.scheduleJob('00 19 * * *', function () {
    // https.get("https://meme-api.herokuapp.com/gimme", (s) => {
    //     console.log(s)
    // })
    const request = require('request');
    const memeChannel = client.channels.cache.find(channel => channel.name === "dank-memes")

    request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        textract.fromUrl(body.url, function (error, text) {
            console.log(body.url + '   ' + text)
        })

        if (body.nsfw == true) {
            console.log(body.url + " Is today's daily meme");
            memeChannel.send("Here's today's daily meme directly from r/" + body.subreddit.toString() + " (" + body.postLink + ") Enjoy!", { files: [body.url] })
        } else {
            request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                if (body.nsfw == false) {
                    console.log(body.url + " Is today's daily meme");
                    memeChannel.send("Here's today's daily meme directly from r/" + body.subreddit.toString() + " (" + body.postLink + ") Enjoy!", { files: [body.url] })
                } else {
                    request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
                        if (err) { return console.log(err); }
                        if (body.nsfw == false) {
                            console.log(body.url + " Is today's daily meme");
                            memeChannel.send("Here's today's daily meme directly from r/" + body.subreddit.toString() + " (" + body.postLink + ") Enjoy!", { files: [body.url] })
                        } else {
                            const errorEmbed = new Discord.MessageEmbed()
                                .setColor('#FF0000')
                                .setTitle('ERROR 376  TEST')
                                .setAuthor('ERROR', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
                                .setDescription('An Error Has Occurred. Please Try Agian')
                                .setThumbnail('https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
                                .setTimestamp()
                                .setFooter('Error TEST', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png');

                            memeChannel.send(errorEmbed);
                        }
                    });
                }
            });
        }
    });
});


//Lead Dev will give token
client.login('NzM3NDI0Mzk3MDc3NDQ2Njg4.Xx9J_A._FlG0Te9M4jQEoiyUDOI3ms-MPU')

//52472962

