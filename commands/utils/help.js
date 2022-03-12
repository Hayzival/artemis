const { MessageEmbed } = require('discord.js')
const { readdirSync, cpSync } = require('fs')
const commandFolder = readdirSync('./commands')
const prefix = '!'

module.exports = {
  name: 'help',
  category: 'utils',
  permissions: ['ADMINISTRATOR'],
  description: 'Commande help',
  async run(client, message, args) {
    if (!args.length) {
      const noArgsEmbed = new MessageEmbed()
        .setColor('WHITE')
        .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)
      for (const category of commandFolder) {
        noArgsEmbed.addField(
          `• ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
          `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(',')}\``
        )
      }

      return message.channel.send({ embeds: [noArgsEmbed]})
    }

    const cmd = client.commands.get(args[0])
    if (!cmd) return message.reply("Cette commande n'existe pas")

    const argsEmbed = new MessageEmbed()
      .setColor('WHITE')
      .setTitle(`\`${cmd.name}\``)
      .setDescription(cmd.description)
      .setFooter({ text: `Permission(s) requise(s): ${cmd.permissions.join(', ')}`})

    return message.channel.send({ embeds: [argsEmbed]})
  },
  options: [
    {
      name: 'command',
      description: 'Taper le nom de votre commande',
      type: 'STRING',
      required: false,
    }
  ],
  runInteraction(client, interaction) {
    const cmdName = interaction.options.getString('command')

    if (!cmdName) {
      const noArgsEmbed = new MessageEmbed()
        .setColor('WHITE')
        .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)
      
      for (const category of commandFolder) {
        noArgsEmbed.addField(
          `• ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
          `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(',')}\``
        )
      }

      return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true})
    }

    const cmd = client.commands.get(cmdName)
    if (!cmd) return interaction.reply({ content:"Cette commande n'existe pas", ephemeral: true})

    const argsEmbed = new MessageEmbed()
      .setColor('WHITE')
      .setTitle(`\`${cmd.name}\``)
      .setDescription(cmd.description)
      .setFooter({ text: `Permission(s) requise(s): ${cmd.permissions.join(', ')}`})

    return interaction.reply({ embeds: [argsEmbed], ephemeral: true})
  }
}