const ytdl = require('ytdl-core');

class SongPlayer {
    constructor() {
    }

    start(hwChan) {
        if (!hwChan) return 'Channel Does Not Exist'
        hwChan.join().then(connection => {
            // Yay, it worked!

            connection.play(ytdl('https://www.youtube.com/watch?v=5qap5aO4i9A',)).on('end', () => { return 'ddd' })

        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        });

    }
}

module.exports = SongPlayer;

//serverQueue.songs.push(serverQueue.songs.shift());