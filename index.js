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
let Tesseract = require('tesseract.js')

var getMetadata = require('get-metadata')

const fetchRandomImage = require('better-random-puppy');
const fs = require('fs');


//DISCORD SECRET
const SECRET = process.env.SECRET





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

const isInvite = async (guild, code) => {
    return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
            for (const invite of invites) {
                if (code === invite[0]) {
                    resolve(true)
                    return
                }
            }

            resolve(false)
        })
    })
}


// tells the bot what to look for to figure out, thats a command is coming
const prefix = '-'

client.once('ready', () => {
    console.log('Im online yay!')
    client.user.setActivity("-help | rebel bot");
})


client.on('message', async message => {
    if (message.author.bot || message.webhookID) return;
    const args = message.content.slice(message.length).split(/ +/)

    //DAD JOKE DISABLED

    // if (message.content.toLowerCase().includes('i\'m') || message.content.toLowerCase().includes('im')) {
    //     args.forEach((s, index) => {
    //         if ((args[index].toLowerCase() == 'i\'m' || args[index].toLowerCase() == 'im') && (args[index + 1])) {
    //             message.channel.send(`Hi ${args.slice(index + 1).join(' ')}, I'm dad`);
    //         }
    //     })
    // }

    //ANTI ADVERTISEMENT
    if (message.content.toLowerCase().includes('discord.gg/')) {
        const code = message.content.split('discord.gg/')[1]
        console.log('CODE:', code)

        if (message.content.includes('discord.gg/')) {
            const isOurInvite = await isInvite(message.guild, code)
            if (!isOurInvite) {
                if (!message.member.roles.find(r => r.name === "Admin") || !message.member.roles.cache.find(r => r.name === "Mod") || !message.member.roles.cache.find(r => r.name === "Advertiser")) {
                    message.delete()
                    const mutedEmbed = new Discord.MessageEmbed().setColor("#FF0000").setTitle("You Have Been Muted").setDescription("You have been muted for **ADVERTISING WITHOUT PERMISSION.** If you think this is a mistake, contact an @Admin")
                    message.author.send(mutedEmbed)
                    message.channel.send(message.author.toString() + "** has broken Rebel Retreat's Rules by Advertising Without Permission**")
                }
            }
        }
    }


    //BAFFOON
    if (message.content.toLowerCase().includes('baffoon')) {
        message.reply({
            files: [{
                attachment: "./baffoon.png",
                name: message.author.username + 'IsAnIdiot.png'
            }]
        })
    }



    //MODERATION
    var Filter = require('bad-words')
    let rawdata = fs.readFileSync('lang.json');
let filterJson = JSON.parse(rawdata);

    filter = new Filter({ placeHolder: '򯾁' });
    filter.removeWords(...filterJson.removeBlackList);
    filter.addWords(...filterJson.addBlackList)
    msgFilter = new Filter()
    msgFilter.removeWords(...filterJson.removeBlackList);
    msgFilter.addWords(...filterJson.addBlackList)
    if (filter.clean(message.content).includes('򯾁') && !message.member.roles.cache.find(r => r.name === "Admin")) {
        message.delete()
        const mutedEmbed = new Discord.MessageEmbed().setColor("#FF0000").setTitle("You Have Been Muted").setDescription("You have been muted for saying ```" + message.content + "``` If you think this is a mistake, contact an @Admin")
        message.author.send(mutedEmbed)
        message.channel.send(message.author.toString() + "** has broken Rebel Retreat's Rules by Saying Blacklisted Words**")
        message.channel.send(new Discord.MessageEmbed().setColor("#FF0000").setAuthor(message.author.username, message.author.displayAvatarURL()).setDescription(msgFilter.clean(message.content)).setTitle(`Clean Version Of Message By ${message.author.username}`))
    }



    //EASTER EGG
    if (message.content.toString().toLowerCase().includes('suck')) {
        message.reply('no u')
    }



    //HONK FEATURE
    if (message.content.toString().toLowerCase() == 'honk') {
        const honkChannel = client.channels.cache.find(channel => channel.name === "honk")
        var webhooks = message.guild.fetchWebhooks().then(w => {
            // var myWebhooks = webhooks.filter(webhook => webhook.name === 'honkers');
            // if (webhooks.size == 0) {
            //     honkChannel.createWebhook('honkers', {
            //         avatar: 'https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024',
            //     }).then(webhook => {
            //         console.log(`Created webhook ${webhook}`)
            //         var webhooks = message.guild.fetchWebhooks().then(webhooks => {
            //             // var myWebhooks = webhooks.filter(webhook => webhook.owner.id === client.user.id && webhook.name === 'honkers');
            //             new Discord.WebhookClient("753069618062426263", "FvPfNoDFXf036cfnAa37R3OqL-Z1iBsFL7Kr3mmZFQjpYv9lQOGHXv0HWqDX6EeXoDn0").send('honk')
            //         });
            //     }
            //     ).catch(console.error);
            // } else if (myWebhooks.size == 1) {
            var webhooks = message.guild.fetchWebhooks().then(w => {
                // var myWebhooks = webhooks.filter(webhook => webhook.owner.id === client.user.id && webhook.name === 'honkers');
                // myWebhooks.first().send('honk')
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
            });
            // } else if (myWebhooks.size > 1) {
            //     message.channel.send("**There are more than one `honkers` webhooks. Delete the extras.**")
            // }
        });

    }
    if (message.content.toString().toLowerCase() == 'honkblast') {
        const honkChannel = client.channels.cache.find(channel => channel.name === "honk")
        var webhooks = message.guild.fetchWebhooks().then(w => {
            // var myWebhooks = webhooks.filter(webhook => webhook.name === 'honkers');
            // if (webhooks.size == 0) {
            //     honkChannel.createWebhook('honkers', {
            //         avatar: 'https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024',
            //     }).then(webhook => {
            //         console.log(`Created webhook ${webhook}`)
            //         var webhooks = message.guild.fetchWebhooks().then(webhooks => {
            //             // var myWebhooks = webhooks.filter(webhook => webhook.owner.id === client.user.id && webhook.name === 'honkers');
            //             new Discord.WebhookClient("753069618062426263", "FvPfNoDFXf036cfnAa37R3OqL-Z1iBsFL7Kr3mmZFQjpYv9lQOGHXv0HWqDX6EeXoDn0").send('honk')
            //         });
            //     }
            //     ).catch(console.error);
            // } else if (myWebhooks.size == 1) {
            var webhooks = message.guild.fetchWebhooks().then(w => {
                // var myWebhooks = webhooks.filter(webhook => webhook.owner.id === client.user.id && webhook.name === 'honkers');
                // myWebhooks.first().send('honk')

                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })
                new Discord.WebhookClient("755962483050676224", "ScLmExmOHj9vU7RiJJ-m0opB7iZQRkpYayz94Ts4VbC74Sxyn0yfPnBUX8F7kmouaiqk").send('honk', { avatarURL: "https://cdn.discordapp.com/avatars/693035835452424193/6ddbea0f3ac219a633833660f8a3846f.png?size=1024" })

            });
            // } else if (myWebhooks.size > 1) {
            //     message.channel.send("**There are more than one `honkers` webhooks. Delete the extras.**")
            // }
        });

    }

    if (message.channel.name.toString() == "honk") {
        if (message.content.toString().toLowerCase() == 'honk') {
            return true
        } else if (message.content.toString().toLowerCase() == 'honkblast') {
            return true
        } else {
            message.delete()
        }
    }



    //checks if it starts with '!' or the bot sent it. if not then returns the function
    if (!message.content.includes(prefix)) return;

    //getting the args from the message


    //makes the args all lowercase (make it not case sensitive)
    const commandList = args.map(v => v.toLowerCase());
    console.log(commandList)
    const command = commandList[0]

    if (command === prefix + 'help') {
        if (commandList[1] == 'admin') {      //message.sender.roles.find(r => r.name === "Admin") || message.member.roles.find(r => rname === "Mod"
            var adminhelpembed = new Discord.MessageEmbed()
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

            var helpembed = new Discord.MessageEmbed()
                .setColor('#E96A00')
                .setTitle('Commands List')
                .setDescription('**If you want Admin Help, do `-help admin`**')
                .addFields(
                    { name: '‎', value: '‎' },
                    { name: '**-help**', value: 'Shows a list of all the commands.' },
                    { name: '**-animals**', value: 'Gives a random cute animal picture! :smiley:' },
                    { name: '**-meme <optionalSubreddit>**', value: 'Returns a meme from Reddit' },
                    { name: '**-memebomb**', value: 'Returns a 10 memes from Reddit' },
                    { name: '**-openticket**', value: 'Opens a ticket' },
                    { name: '**-closeticket**', value: 'Closes a ticket' },

                )
                .setFooter('rebel bot • Help Menu')
            message.channel.send(helpembed)
        }
        // message.channel.send(helpembed)
        message.delete()

    } else if (command === prefix + 'ping') {
        const m = await message.channel.send("Ping? (wow you see this)");
        m.edit(`Pong! \`${m.createdTimestamp - message.createdTimestamp}ms\``);
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
        let reddit = [
            "meme",
            "animemes",
            "MemesOfAnime",
            "animememes",
            "AnimeFunny",
            "dankmemes",
            "dankmeme",
            "wholesomememes",
            "MemeEconomy",
            "techsupportanimals",
            "meirl",
            "me_irl",
            "2meirl4meirl",
            "AdviceAnimals",
            "ProgrammerHumor"
        ]

        // var subreddit = 'meme';
        // if (commandList[1] === 'undefined') {

        // } else {
        //     subreddit = commandList[1]
        // }

        if (commandList.length == 2) {
            var subreddit = commandList[1]
            message.channel.startTyping();

            fetchRandomImage(subreddit).then(async i => {
                await message.channel.send("Here you go " + message.author.toString() + ", You have requested r/" + subreddit + "\n\n" + i.title, {
                    files: [{
                        attachment: i.url,
                        name: 'meme.png'
                    }]
                }).then(() => message.channel.stopTyping());
            }).catch(err => console.error(err));
        } else {
            var subreddit = reddit[Math.floor(Math.random() * reddit.length)];
            message.channel.startTyping();

            fetchRandomImage(subreddit).then(async i => {
                await message.channel.send("Here you go " + message.author.toString() + " directly from r/" + subreddit + "\n\n**" + i.title + "**", {
                    files: [{
                        attachment: i.url,
                        name: 'meme.png'
                    }]
                }).then(() => message.channel.stopTyping());
            }).catch(err => console.error(err));
        }
        message.delete()
        message.channel.stopTyping()




        //else if (command === prefix + 'meme') {
        //     // https.get("https://meme-api.herokuapp.com/gimme", (s) => {
        //     //     console.log(s)
        //     // })
        //     const request = require('request');

        //     request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
        //         if (err) { return console.log(err); }
        //         textract.fromUrl(body.url, function (error, text) {
        //             console.log(body.url + '   ' + text)
        //         })

        //         if (body.nsfw == true) {
        //             console.log(body.url + "has been sent to " + message.author);
        //             message.channel.send("Here you go " + message.author.toString() + " directly from r/" + body.subreddit.toString() + " (" + body.postLink + ")", { files: [body.url] })
        //         } else {
        //             request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
        //                 if (err) { return console.log(err); }
        //                 if (body.nsfw == false) {
        //                     console.log(body.url + "has been sent to " + message.author);
        //                     message.channel.send("Here you go " + message.author.toString() + " directly from r/" + body.subreddit.toString() + "(" + body.postLink + ")", { files: [body.url] })
        //                 } else {
        //                     request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
        //                         if (err) { return console.log(err); }
        //                         if (body.nsfw == false) {
        //                             console.log(body.url + "has been sent to " + message.author);
        //                             message.channel.send("Here you go " + message.author.toString() + " directly from r/" + body.subreddit.toString() + "(" + body.postLink + ")", { files: [body.url] })
        //                         } else {
        //                             const errorEmbed = new Discord.RichEmbed()
        //                                 .setColor('#FF0000')
        //                                 .setTitle('ERROR 376')
        //                                 .setAuthor('ERROR', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
        //                                 .setDescription('An Error Has Occurred. Please Try Again')
        //                                 .setThumbnail('https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
        //                                 .setTimestamp()
        //                                 .setFooter('Error', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png');

        //                             message.channel.send(errorEmbed);
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     });
        //     message.delete()
    } else if (command === prefix + 'memebomb') {
        let reddit = [
            "meme",
            "animemes",
            "MemesOfAnime",
            "animememes",
            "AnimeFunny",
            "dankmemes",
            "dankmeme",
            "wholesomememes",
            "MemeEconomy",
            "techsupportanimals",
            "meirl",
            "me_irl",
            "2meirl4meirl",
            "AdviceAnimals",
            "ProgrammerHumor"
        ]

        // var subreddit = 'meme';
        // if (commandList[1] === 'undefined') {

        // } else {
        //     subreddit = commandList[1]
        // }
        var meme = () => {
            if (commandList.length == 2) {
                var subreddit = commandList[1]
                message.channel.startTyping();

                fetchRandomImage(subreddit).then(async i => {
                    await message.channel.send("Here you go " + message.author.toString() + ", You have requested r/" + subreddit + "\n\n" + i.title, {
                        files: [{
                            attachment: i.url,
                            name: 'meme.png'
                        }]
                    }).then(() => message.channel.stopTyping());
                }).catch(err => console.error(err));
            } else {
                var subreddit = reddit[Math.floor(Math.random() * reddit.length)];
                message.channel.startTyping();

                fetchRandomImage(subreddit).then(async i => {
                    await message.channel.send("Here you go " + message.author.toString() + " directly from r/" + subreddit + "\n\n" + i.title, {
                        files: [{
                            attachment: i.url,
                            name: 'meme.png'
                        }]
                    }).then(() => message.channel.stopTyping());
                }).catch(err => console.error(err));
            }
        }

        meme()
        meme()
        meme()
        meme()
        meme()
        message.channel.stopTyping()

    } else if (command === prefix + 'openticket') {
        var name = "ticket-" + message.author.username.toString().toLowerCase() + "-" + Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString()

        const role = message.guild.roles.cache.find(role => role.name === name);
        message.member.roles.add(role);
        var ticketChannel = message.guild.channels.create(name, 'text').then((c) => {
            ticketChannel = client.channels.cache.find(channel => channel.name === name)
            // ticketChannel.overwritePermissions(message.guild.roles.cache.find('name', '@everyone'), {
            //     'VIEW_CHANNEL': false
            // })
            // ticketChannel.overwritePermissions(message.guild.cache.roles.find('name', 'Moderator'), {
            //     'VIEW_CHANNEL': true
            // })
            // ticketChannel.overwritePermissions(message.author.id, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false })
            let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
            var modRoleId = message.guild.roles.cache.find(role => role.name === "Moderator");
            ticketChannel.overwritePermissions([
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                },
                {
                    id: everyone.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: modRoleId,
                    allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                },
            ], 'Ticket Permissions');
            var adminRoleId = message.guild.roles.cache.find(role => role.name === "Admin");
            var modRoleId = message.guild.roles.cache.find(role => role.name === "Moderator");
            var vipRoleId = message.guild.roles.cache.find(role => role.name === "VIPs");
            ticketChannel.send(`${adminRoleId} ${modRoleId}, ` + message.author.toString() + " has opened a ticket. " + message.author.toString() + `, If you have opened this ticket to get ${vipRoleId} state your real first name and if you know anyone, please state who you know.`)
            message.reply(`**Ticket Created! Your ticket is <#${ticketChannel.id.toString()}>.` + ' Use `-closeticket` in <#' + ticketChannel.id.toString() + '> to close it!**')
            message.delete()
        })
    } else if (command == prefix + 'closeticket') {
        if (message.channel.name.includes('ticket')) {
            message.channel.setName('closed-ticket-' + message.channel.name)
            message.channel.delete('Closing ticket ' + message.channel.name)
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
                // console.log(commandList[1])
            }
        } else {
            message.reply('Ticket has failed to close. Please make sure you have proper permissions or have no typos. Here is your failed command: ```sh\n' + message.content.toString() + '\n```')
            message.delete()
        }
    } else if (command == prefix + 'devcheck') {

        Tesseract.recognize(
            'https://cdn.discordapp.com/attachments/737406253696811058/752654332272443392/4a6jwypljql51.jpg',
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            message.channel.send(text)
        })
    } else if (command == prefix + 'mute') {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Nope.")
        }

        let member = message.mentions.members.first();
        if (!member) return message.channel.send("That user doesn't exist!");
        if (!member.kickable) return message.channel.send("I can't mute that user :(");

        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "No reason given.";
        }
        let muterole = guild.roles.find(r => r.name == "Muted" || r.name == "muted");

        await member
            .roles.add(muterole)
            .catch(error =>
                message.channel.send(`Unable to mute user because of: ${error}.`)
            )
        message.channel.send(`Successfully muted ${member.user.tag}!`);
        member.send(new DiscordEmbed().setTitle(`You are muted in ${message.guild.name}`).setDescription(`We are sorry to inform you, that **you are muted in ${message.guild.name} untill furter notice.** If you think if was malicious/unfair or a mistake, please contact ` + '`kidsonfilms#4635`, `xapd421#2089`, or `potato master#2162.\n This is the given reason:\n```\n' + reason + '\n```\n'))

    } else if (command == prefix + 'ban') {
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send("nah fam");

        let member = message.mentions.members.first();
        if (!member) return message.channel.send("That user doesn't exist!");
        if (!member.bannable)
            return message.channel.send("I can't ban that user :(");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given.";

        await member
            .ban(reason) //Here we ban the user.
            .catch(error => //We check if there is an error. If there is an error, it will display it in the chat.
                message.channel.send(`Unable to ban user because of: ${error}.`)
            );
        message.channel.send(`Banned ${member.user.tag}!`); //If there is no error, and the user was banned, we let them know they were banned successfuly.
        member.send(new DiscordEmbed().setTitle(`You are banned from ${message.guild.name}`).setDescription(`We are sorry to inform you, that **you are banned from ${message.guild.name} untill furter notice.** If you think if was malicious/unfair or a mistake, please contact ` + '`kidsonfilms#4635`, `xapd421#2089`, or `potato master#2162.\n This is the given reason:\n```\n' + reason + '\n```\n Thank you for being a rebel (as long as it lasted)'))
    } else if (command == prefix + 'request') {
        var request = ''
        commandList.forEach((s) => {
            if (!s == '-request') {
                request += `${s} `
            }
        })
        const requestsChannel = client.channels.cache.find(channel => channel.name === "requests-temp")
        requestsChannel.send(`${message.author.toString()} has just requested` + '\n```\n' + message.content.toLowerCase() + '\n```')
        message.delete()
        message.reply(`Your request has been sent! ${message.author.toString()} requested\n` + '```\n' + message.content.toLowerCase() + '\n```' + `\nReact with :arrow_up: to upvote a request, or with a :arrow_down: to downvote it.`)
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
    m.send("Welcome to the Rebel Retreat new recruit! You are currently a foreigner and must read the rules (in the `#server-rules` channel) for this channel to have access to read and send messages to this server. Go to the `#self-roles` channel to assign yourself roles that suit your tastes. Further roles will be assigned by admins or moderators. Help and support will be given in its respective channel, `#help-and-support`. Have fun!")
})

//MEME SCHEDULE
var scheduledMeme = schedule.scheduleJob('00 19 * * *', function () {
    // https.get("https://meme-api.herokuapp.com/gimme", (s) => {
    //     console.log(s)
    // })  "Here's today's daily meme directly from r/" + body.subreddit.toString() + " (" + body.postLink + ") Enjoy!"
    const memeChannel = client.channels.cache.find(channel => channel.name === "dank-memes")
    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals",
        "ProgrammerHumor"
    ]

    var subreddit = reddit[Math.floor(Math.random() * reddit.length)];
    message.channel.startTyping();

    fetchRandomImage(subreddit).then(async i => {
        await memeChannel.send("Here's today's daily meme directly from r/" + subreddit + " Enjoy!\n\n" + i.title, {
            files: [{
                attachment: i.url,
                name: 'meme.png'
            }]
        }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));
});


//Lead Dev will give token
client.login(SECRET)

//52472962

