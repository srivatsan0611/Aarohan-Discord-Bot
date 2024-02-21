require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'quote',
    description: 'Random Quote'
  },
  {
    name: 'serverinfo',
    description: 'Get information about the server',
  },
  {
    name: 'kick',
    description: 'Kick a member from the server',
    options: [
      {
        name: 'member',
        description: 'The member to kick',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  {
    name: 'roll',
    description: 'Roll a dice for whatever reason'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();