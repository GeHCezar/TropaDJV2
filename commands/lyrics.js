const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
  name: "letras",
  description: "Para obter e pesquisar letras de uma música",
  usage: "[Nome da música]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ly", "le", "letra", "letras", "lyric", "lyrics"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    let SongTitle = args.join(" ");
    let SearchString = args.join(" ");
    if (!args[0] && !player) return client.sendTime(message.channel, "❌ | **Não está tocando nada agora...**");
    if (!args[0]) SongTitle = player.queue.current.title;

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics) return client.sendTime(message.channel, `**Nenhuma letra encontrada para -** \`${SongTitle}\``);
    lyrics = lyrics.split("\n"); //spliting into lines
    let SplitedLyrics = _.chunk(lyrics, 45); //45 lines each page

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Letras para: ${SongTitle}`, client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(ly.join("\n"));

      if (args.join(" ") !== SongTitle) em.setThumbnail(player.queue.current.displayThumbnail());

      return em;
    });

    if (!Pages.length || Pages.length === 1) return message.channel.send(Pages[0]);
    else return client.Pagination(message, Pages);
  },

  SlashCommand: {
    options: [
      {
        name: "música",
        value: "song",
        type: 3,
        description: "Obter a letra de uma música",
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);

      if (!interaction.data.options && !player) return client.sendTime(interaction, "❌ | **Não está tocando nada agora...**");

      SongTitle = interaction.data.options ? interaction.data.options[0].value : player.queue.current.title;
      let lyrics = await lyricsFinder(SongTitle);
      console.log(lyrics.length === 0)
      if (lyrics.length === 0)
        return client.sendTime(interaction, `**Nenhuma letra encontrada para -** \`${SongTitle}\``);
      lyrics = lyrics.split("\n"); //spliting into lines
      let SplitedLyrics = _.chunk(lyrics, 45); //45 lines each page

      let Pages = SplitedLyrics.map((ly) => {
        let em = new MessageEmbed()
          .setAuthor(`Letras para: ${SongTitle}`, client.config.IconURL)
          .setColor("RANDOM")
          .setDescription(ly.join("\n"));

        if (SongTitle !== SongTitle) em.setThumbnail(player.queue.current.displayThumbnail());

        return em;
      });
      if (!Pages.length || Pages.length === 1)
        return interaction.send(Pages[0]);

    },
  }
};
