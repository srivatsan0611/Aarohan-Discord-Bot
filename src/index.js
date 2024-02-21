require('dotenv').config();
const Discord = require('discord.js');
const { PermissionsBitField } = require('discord.js');
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

    const quoteResponse = await fetch('https://api.quotable.io/random'); //Fetching -> (node-fetch)
    const quoteData = await quoteResponse.json();

    const quoteEmbed = new EmbedBuilder()
      .setTitle('Random Quote')
      .setDescription(`*${quoteData.content}*\n- ${quoteData.author}`)
      .setColor('#00ff00');

    interaction.reply({ embeds: [quoteEmbed] });
  }
  else if (interaction.commandName === 'serverinfo') {
    const server = interaction.guild;
  
    const embed = new EmbedBuilder()
      .setTitle(`Server Information - ${server.name}`)
      .setThumbnail(server.iconURL())
      .addFields(
        { name: 'Member Count', value: server.memberCount.toString() },
        { name: 'Owner', value: `<@${server.ownerId}>` },
        //{ name: 'Region', value: server.region },
        //{ name: 'Verification Level', value: server.verificationLevel.toString() },
        { name: 'Role Count', value: server.roles.cache.size.toString() },
        { name: 'Created At', value: server.createdAt.toLocaleString() },
      );
  
    interaction.reply({ embeds: [embed] });
  }
  else if (interaction.commandName === 'kick') {
    // Check if the user has the KICK_MEMBERS permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: false });
    }

    const member = interaction.options.getMember('member');
    if (!member) return interaction.reply({ content: 'Please specify a valid member to kick.', ephemeral: true });
  
    try {
        
        if (!member.kickable) {
            return interaction.reply({ content: 'I am unable to kick the member. Please check my permissions.', ephemeral: true });
        }
        await member.kick();
        interaction.reply({ content: `${member.user.tag} has been kicked from the server.`});
    } catch (error) {
        console.error(error);
        interaction.reply({ content: 'An error occurred while trying to kick the member.' });
    }
}  
  

  else if (interaction.commandName === 'roll') {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    const rollEmbed = new EmbedBuilder()
        .setTitle('Dice Roll')
        .setDescription(`You rolled a ${randomNumber}! 🎲`)
        .setColor('#FFA500');

    interaction.reply({ embeds: [rollEmbed] });
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
