# bot-boris-discord
Bot for tracking stats of League of Legends.

## Technologies used
- Discord.js
- Riot API
- NodeJS

## How to install
Download the zip or clone the repository and then in the root source of the project execute the command ``npm install``

Add a .env file at the root of the folder with the needed credentials for making the apis and discord bot auth work. Ask for the administrator of the project for this credentials or set up your own credentials.

## Project structure
The project has:
- index.js which contains the logic to initialize the bot and the ability to listen and respond to events.
- commands folder which contains the files for handling each command logic.
- services folder which contains the logic for fetching the data for multiple apis.

## Useful resources for development
If you want to try to improve this project we can recommend you to read discord.js docs. You only need knowledge of Javascript to work on the project.
- https://discordjs.guide/#before-you-begin
