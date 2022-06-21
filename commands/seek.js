const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "posicao",
    description: "Procure uma posição na música",
    usage: "<time s/m/h>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["posi", "ps", "posicao", "seek"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Não está tocando nada agora...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para usar esse comando!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Você deve estar no mesmo canal de voz que eu para usar esse comando!**");
        if (!player.queue.current.isSeekable) return client.sendTime(message.channel, "❌ | **Não estou conseguindo buscar essa música!**");
        let SeekTo = client.ParseHumanTime(args.join(" "));
        if (!SeekTo) return client.sendTime(message.channel, `**Use - **\`${GuildDB.prefix}posicao <numero s/m/h>\` \n**Exemplo - **\`${GuildDB.prefix}posicao 2m 10s\``);
        player.seek(SeekTo * 1000);
        message.react("✅");
    },

    SlashCommand: {
        options: [
            {
                name: "time",
                description: "Avance qualquer parte de uma música",
                value: "time",
                type: 3,
                required: true,
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
                    let player = await client.Manager.get(interaction.guild_id);
                    
                    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Você deve estar em um canal de voz para usar esse comando.**");
                    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Você deve estar no mesmo canal de voz que eu para usar esse comando!**");

                    if (!player) return client.sendTime(interaction, "❌ | **Não está tocando nada agora...**");
                    if (!player.queue.current.isSeekable) return client.sendTime(interaction, "❌ | **Não estou conseguindo buscar essa música!**");
                    let SeekTo = client.ParseHumanTime(interaction.data.options[0].value);
                    if (!SeekTo) return client.sendTime(interaction, `**Use - **\`${GuildDB.prefix}posicao <number s/m/h>\` \n**Exemplo -** \`${GuildDB.prefix}posicao 2m 10s\``);
                    player.seek(SeekTo * 1000);
                    client.sendTime(interaction, "✅ | **Moveu a música com sucesso para **", `\`${Seekto}\``);
                },
            },
        ],
    },
};

