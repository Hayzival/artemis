const dayjs = require('dayjs')
const { MessageEmbed, Formatters } = require('discord.js')

module.exports= {
  name: 'guildMemberAdd',
  once: false,
  async execute(client, member) {
    const creationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)
    const relativeCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime)

    const joinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)
    const relativeJoinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime)

    const embed= new MessageEmbed()
      .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL:member.user.displayAvatarURL() })
      .setColor('GREEN')
      .setDescription(`± Nom d'utilisateur: ${member}
      ± Crée le: ${creationTimestamp} (${relativeCreationTimestamp})
      ± Rejoint le: ${joinTimestamp} (${relativeJoinTimestamp})
      `)
      .setTimestamp()
      .setFooter({ text: "L'utilisateur a rejoint !"})
    const LogChannel = client.channels.cache.get('746754148715987014')
    LogChannel.send({ embeds: [embed]})
  }
}