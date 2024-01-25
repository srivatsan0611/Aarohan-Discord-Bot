require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('Title for Embed')
      .setDescription('Testing Embed - 1')
      .setColor('Random')
      .addFields(
        {
          name: 'Introduction',
          value: `Hi I'm Aarohan`,
          inline: true,
        },
        {
          name: 'This is an Embedded Message',
          value: '(For Testing)',
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('Embed title')
      .setDescription('This is an embed description')
      .setColor('Random')
      .addFields(
        {
          name: 'Field title',
          value: 'Some random value',
          inline: true,
        },
        {
          name: '2nd Field title',
          value: 'Some random value',
          inline: true,
        }
      );

    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.token);