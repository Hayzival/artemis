module.exports= {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log("Je suis prêt")

    const devGuild = await client.guilds.cache.get('746387119727050783')
    devGuild.commands.set(client.commands.map(cmd => cmd))
  }
}