const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "convite",
  description: "Para me convidar para o seu servidor",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["conv", "convidar", "co", "convite", "invite"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let embed = new MessageEmbed()
      .setAuthor(
        "Convidar " + client.user.tag + " para o seu servidor!",
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .setDescription(
        `Você pode me convidar acessando o site: http://tropadj.mywebcommunity.org/ ou clicando [aqui](https://discord.com/oauth2/authorize?client_id=${
          client.config.ClientID
        }&permissions=${
          client.config.Permissions
        }&scope=bot%20${client.config.Scopes.join("%20")}&redirect_url=${
          client.config.Website
        }${client.config.CallbackURL}&response_type=code)`
      );
    message.channel.send(embed);
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
    let embed = new MessageEmbed()
      .setAuthor(
        "Convidar " + client.user.tag + " para o seu servidor!",
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .setDescription(
        `Você pode me convidar acessando o site: http://tropadj.mywebcommunity.org/ ou clicando [aqui](https://discord.com/oauth2/authorize?client_id=${
          client.config.ClientID
        }&permissions=${
          client.config.Permissions
        }&scope=bot%20${client.config.Scopes.join("%20")}&redirect_url=${
          client.config.Website
        }${client.config.CallbackURL}&response_type=code)`
      );
    interaction.send(embed);
  },
  },
};
