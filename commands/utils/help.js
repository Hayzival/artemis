const { MessageEmbed } = require('discord.js')
const { readdirSync, cpSync } = require('fs')
const commandFolder = readdirSync('./commands')
const prefix = '!'

const contextDescription = {
  userinfo: 'Renvoie des informations sur l\'utilisateur'
}

module.exports = {
  name: 'help',
  category: 'utils',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'help <command>',
  examples: ['help', 'help ping', 'help emit'],
  description: 'Renvoie une liste de commande filtrée par catégorie',
  async run(client, message, args) {
    if (!args.length) {
      const noArgsEmbed = new MessageEmbed()
        .setColor('WHITE')
        .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)
      for (const category of commandFolder) {
        noArgsEmbed.addField(
          `• ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
          `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
        )
      }

      return message.channel.send({ embeds: [noArgsEmbed]})
    }

    const cmd = client.commands.get(args[0])
    if (!cmd) return message.reply("Cette commande n'existe pas")

    return message.channel.send(`
\`\`\`makefile
[Help: Command -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Admin only /!\\' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissions: ${cmd.permissions.join(', ')}

---

${prefix} = prefix à utiliser sur le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
\`\`\``)


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
          `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
        )
      }

      return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true})
    }

    const cmd = client.commands.get(cmdName)
    if (!cmd) return interaction.reply({ content:"Cette commande n'existe pas", ephemeral: true})

    return interaction.reply({content:`
\`\`\`makefile
[Help: Command -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Admin only /!\\' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissions: ${cmd.permissions.join(', ')}

---

${prefix} = prefix à utiliser sur le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
\`\`\``, ephemeral: true})


  }
}