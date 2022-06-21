const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "parar",
  description: "Parar a música e sai do canal de voz",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["sair", "par", "desliga", "parar", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para tocar algo!**");
    if (!player) return client.sendTime(message.channel,"❌ | **Não está tocando nada agora...**");
    await client.sendTime(message.channel,":radio: | **A música parou e a fila foi limpa.**");
    await message.react("✅");
    player.destroy();
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Você deve estar em um canal de voz para usar esse comando.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **Você deve estar em ${guild.me.voice.channel} para usar este comando.**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Não está tocando nada agora...**"
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":radio: | **O música parou e a fila foi limpa.**"
      );
    },
  },
};
