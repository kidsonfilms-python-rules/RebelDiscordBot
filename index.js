const Discord = require('discord.js')

//the var client is basically the bot
const client = new Discord.Client()

client.once('ready', () => {
    console.log('Im online yay!')
})


//Lead Dev will give token
client.login('TOKEN')