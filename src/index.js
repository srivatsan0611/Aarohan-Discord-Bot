require('dotenv').config();
//const fetch = require('node-fetch');

const { Client, IntentsBitField, MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`${client.user.tag} is online.`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('Welcome to the Server!')
      .setDescription('We are excited to have you here. Enjoy your stay!')

    interaction.reply({ embeds: [embed] });
  }
  else if (interaction.commandName === 'quote') {
    // Fetch a random quote from Quotable API
    const quoteResponse = await fetch('https://api.quotable.io/random');
    const quoteData = await quoteResponse.json();

    // Create an embed with the quote
    const quoteEmbed = new EmbedBuilder()
      .setTitle('Random Quote')
      .setDescription(`*${quoteData.content}*\n- ${quoteData.author}`)
      .setColor('#00ff00');

    interaction.reply({ embeds: [quoteEmbed] });
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle(`I'm Aarohan!`)
      .setDescription('A bot with a bunch of functionalities! :)')
      .setColor('#FFD700')
      /*.addFields(
        {
          name: 'Field Title 1',
          value: 'Some creative value here!', 
          inline: true,
        },
        {
          name: 'Field Title 2',
          value: 'Another creative value!',
          inline: true,
        }
      ) */
      .setTimestamp()
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('button_primary')
        .setLabel('Click me!')
        .setStyle('PRIMARY')
    );

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('guildMemberAdd', (member) => {
  const welcomeChannel = member.guild.channels.cache.find((channel) => channel.name === 'welcome');

  if (welcomeChannel) {
    const welcomeEmbed = new EmbedBuilder()
      .setTitle(`Welcome to ${member.guild.name}!`)
      .setDescription(`Hey ${member.user.username}, welcome to our server!`)
      .setColor('#3498db');

    welcomeChannel.send({ embeds: [welcomeEmbed] });
  }
});

client.login(process.env.token);
