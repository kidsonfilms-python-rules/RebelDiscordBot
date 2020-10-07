//Github API v3
//DiscordBot>curl -u "kidsonfilms-python-rules" https://api.github.com/repos/kidsonfilms-python-rules/RebelDiscordBot/contents/redis-6.0.6/deps  
var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var sect = url.searchParams.get("section");

if (!sect) {
    var mdSection = document.getElementById('md')
    mdSection.src = `./docsMd/index.md`

    var li = document.getElementById('index')
    li.className += "active"
} else {
    var mdSection = document.getElementById('md')
    mdSection.src = `./docsMd/${sect}.md`
    var li = document.getElementById(sect)
    li.className += "active"
}



