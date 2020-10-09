const Discord = require('discord.js')
const client = new Discord.Client()
//https://discordapp.com/channels/@me/749077787532591125/763169028801036358
const me = client.guilds.cache.get('@me')
const channel = client.channels.cache.get('749077787532591125')
const msg = channel.messages.fetch({around: "763169028801036358", limit: 1})