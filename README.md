# Discord Bot for Rebel Retreat

This is a Discord bot for Rebel Retreat. [Join Here](https://discord.gg/xSvGWYA)
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Installation

Download the current snapshot by either running the command

```sh
git clone https://github.com/kidsonfilms-python-rules/RebelDiscordBot.git
```
or download the ZIP version [here](https://github.com/kidsonfilms-python-rules/RebelDiscordBot/archive/master.zip).

After it finished downloading, go into the root folder and run 
```sh
npm i
```

## Usage
To test your local bot, go to [Discord Developer Applications Portal](discord.com/developers/applications) and add a new application and fill it out. Go to Bot and create a bot using `Build-A-Bot`. Then copy (`ctrl + c` or `⌘ + c`) your Discord Bot Token in `Bot`. __KEEP THIS TOKEN SECRET FROM PEOPLE YOU DON'T KNOW.__

Then, go to the [Discord Permissions Calculator](https://discordapi.com/permissions.html) and select all the Permissions you want your bot to get and paste your client ID into the corresponding box. After that, click the link it provides you and select your server and click `Continue > Authorize`.

To enter your Discord Bot Token, you can do one of the following:
### File (Recomended For Local Use)
Create a file called `SECRETS.txt` and then put in the following:
```sh
YOUR_SECRET
```
And replace `YOUR_SECRET` with your Discord Bot Token.

### Enviroment Varible (Recommended For Server Use)
Create and a Enviroment Varible called `SECRET` and place the value being your Discord Bot Token


### Test on local machine
After that, run the following command:
```sh
npm start
```

### Test on Heroku
[Follow These Steps]() to deploy to Heroku
## Support

Please [open an issue](https://github.com/kidsonfilms-python-rules/PMSDiscordBot/issues/new) for support.

## Contributing

Please contribute by contacting our Lead Developer `@kidsonfilms` on Discord, who will give you further instructions.

## License
We are using the [MIT](LICENSE.md) license.