const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ajuda",
  description: "Informações sobre o bot",
  usage: "[comando]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["comando", "comandos", "cmd", "ajuda", "help"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `Comandos do ${client.user.username} | Suporte a 𝗦𝗽𝗼𝘁𝗶𝗳𝘆|𝗬𝗼𝘂𝘁𝘂𝗯𝗲|𝗦𝗼𝘂𝗻𝗱𝗰𝗹𝗼𝘂𝗱          ✔️Description in English: https://bit.ly/tropadjenglish`,
              client.config.IconURL
            )
            .setColor("RANDOM")
            .setFooter(
              `Para obter informações de cada tipo de comando ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }ajuda [Comando] | ᴄᴀsᴏ ᴀᴄʜᴇ ᴜᴍ ʙᴜɢ ғᴀᴠᴏʀ ɪɴғᴏʀᴍᴀ ᴘᴀʀᴀ: GeH#3556 ou mande em: https://discord.gg/3RAR33gzrn`
            ).setDescription(`${Commands.join("\n")}
  
  Versão do TROPA DJ: V${require("../package.json").version} | **ʙʏ: ɢᴇʜ**`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | Não foi possivel encontrar esse comando.`);

      let embed = new MessageEmbed()
        .setAuthor(`Comando: ${cmd.name}`, client.config.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "command",
        description: "Obtenha informações sobre um comando específico",
        value: "command",
        type: 3,
        required: false
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
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `Comandos do ${client.user.username} | Suporte a 𝗦𝗽𝗼𝘁𝗶𝗳𝘆|𝗬𝗼𝘂𝘁𝘂𝗯𝗲|𝗦𝗼𝘂𝗻𝗱𝗰𝗹𝗼𝘂𝗱          ✔️Description in English: https://bit.ly/tropadjenglish`,
              client.config.IconURL
            )
            .setColor("RANDOM")
            .setFooter(
              `Para obter informações de cada tipo de comando ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }ajuda [Comando] | ᴄᴀsᴏ ᴀᴄʜᴇ ᴜᴍ ʙᴜɢ ғᴀᴠᴏʀ ɪɴғᴏʀᴍᴀ ᴘᴀʀᴀ: GeH#3556 ou mande em: https://discord.gg/3RAR33gzrn`
            ).setDescription(`${Commands.join("\n")}
  
            Versão do TROPA DJ: V${require("../package.json").version} | **ʙʏ: ɢᴇʜ**`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | Incapaz de encontrar esse comando.`);
  
        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmd.name}`, client.config.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Aliases", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};
