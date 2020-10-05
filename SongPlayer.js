const ytdl = require('ytdl-core');

class SongPlayer {
    constructor() {
    }

    start(hwChan, client) {
        if (!hwChan) return 'Channel Does Not Exist'
        hwChan.join().then(connection => {
            // Yay, it worked!

            connection.play(ytdl('https://www.youtube.com/watch?v=5qap5aO4i9A',)).on('end', () => { return 'ddd' })

            // client.on('voiceStateUpdate', (oldMember, newMember) => {
            //     const newUserChannel = newMember.voice.channelID
            //     const oldUserChannel = oldMember.voice.channelID
              
            //     if(newUserChannel === '712677767333937284') {
            //       if (client.channels.cache.find(channel => channel.name === "homework-stream").members.size == 1) {
            //         connection.play(ytdl('https://www.youtube.com/watch?v=5qap5aO4i9A',)).on('end', () => { return 'ddd' })
            //       }
            //     } else if (oldUserChannel === '712677767333937284' && newUserChannel !== '712677767333937284') {
            //       if (client.channels.cache.find(channel => channel.name === "homework-stream").members.size == 0) {
            //         client.leaveVoiceChannel(client.channels.cache.find(channel => channel.name === "homework-stream").channelID)
            //       }
            //     }
            //   })

        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
            client.channels.cache.find(channel => channel.name === "bots").send('**ERROR**\n' + e)
        });

    }

    leave(client, channelID) {
        client.leaveVoiceChannel(channelID);
    }
}

module.exports = SongPlayer;

//serverQueue.songs.push(serverQueue.songs.shift());