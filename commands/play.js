const { Util, MessageEmbed } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: "tocar",
    description: "Toque suas músicas favoritas",
    usage: "[nome ou link]",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["tocar", "t", "play", "pl"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para tocar algo!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");
        let SearchString = args.join(" ");
        if (!SearchString) return client.sendTime(message.channel, `**Use - **\`${GuildDB.prefix}ajuda [Para Saber os Comandos]\``);
        let CheckNode = client.Manager.nodes.get(client.config.Lavalink.id);
        let Searching = await message.channel.send(":mag_right: Procurando...");
        if (!CheckNode || !CheckNode.connected) {
       return client.sendTime(message.channel,"❌ | **Lavalink não conectado**");
        }
        const player = client.Manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: false,
        });

        let SongAddedEmbed = new MessageEmbed().setColor("RANDOM");

        if (!player) return client.sendTime(message.channel, "❌ | **Não está tocando nada agora...**");

        if (player.state != "CONNECTED") await player.connect();

        try {
            if (SearchString.match(client.Lavasfy.spotifyPattern)) {
                await client.Lavasfy.requestToken();
                let node = client.Lavasfy.nodes.get(client.config.Lavalink.id);
                let Searched = await node.load(SearchString);

                if (Searched.loadType === "PLAYLIST_LOADED") {
                    let songs = [];
                    for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i], message.author));
                    player.queue.add(songs);
                    if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) player.play();
                    SongAddedEmbed.setAuthor(`Foi adicionado à fila uma Playlist`, message.author.displayAvatarURL());
                    SongAddedEmbed.addField("Lista", `\`${Searched.tracks.length}\` de músicas`, false);
                    //SongAddedEmbed.addField("Duração da lista de reprodução", `\`${prettyMilliseconds(Searched.tracks, { colonNotation: true })}\``, false)
                    Searching.edit(SongAddedEmbed);
                } else if (Searched.loadType.startsWith("TRACK")) {
                    player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                    SongAddedEmbed.setAuthor(`Adicionado à fila`, client.config.IconURL);
                    SongAddedEmbed.setDescription(`[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`);
                    SongAddedEmbed.addField("Autor", Searched.tracks[0].info.author, true);
                    //SongAddedEmbed.addField("Duration", `\`${prettyMilliseconds(Searched.tracks[0].length, { colonNotation: true })}\``, true);
                    if (player.queue.totalSize > 1) SongAddedEmbed.addField("Posição na fila", `${player.queue.size - 0}`, true);
                    Searching.edit(SongAddedEmbed);
                } else {
                    return client.sendTime(message.channel, "**Nenhuma resultado encontrado para - **" + SearchString);
                }
            } else {
                let Searched = await player.search(SearchString, message.author);
                if (!player) return client.sendTime(message.channel, "❌ | **Não está tocando nada agora...**");

                if (Searched.loadType === "NO_MATCHES") return client.sendTime(message.channel, "**Nenhuma resultado encontrado para - **" + SearchString);
                else if (Searched.loadType == "PLAYLIST_LOADED") {
                    player.queue.add(Searched.tracks);
                    if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) player.play();
                    SongAddedEmbed.setAuthor(`Adicionada à Playlist à fila`, client.config.IconURL);
                    SongAddedEmbed.setThumbnail(Searched.tracks[0].displayThumbnail());
                    SongAddedEmbed.setDescription(`[${Searched.playlist.name}](${SearchString})`);
                    SongAddedEmbed.addField("Fila", `\`${Searched.tracks.length}\` música`, false);
                    SongAddedEmbed.addField("Duração da lista de reprodução", `\`${prettyMilliseconds(Searched.playlist.duration, { colonNotation: true })}\``, false);
                    Searching.edit(SongAddedEmbed);
                } else {
                    player.queue.add(Searched.tracks[0]);
                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                    SongAddedEmbed.setAuthor(`Adicionado à fila`, client.config.IconURL);

                    SongAddedEmbed.setThumbnail(Searched.tracks[0].displayThumbnail());
                    SongAddedEmbed.setDescription(`[${Searched.tracks[0].title}](${Searched.tracks[0].uri})`);
                    SongAddedEmbed.addField("Autor", Searched.tracks[0].author, true);
                    SongAddedEmbed.addField("Duração", `\`${prettyMilliseconds(Searched.tracks[0].duration, { colonNotation: true })}\``, true);
                    if (player.queue.totalSize > 1) SongAddedEmbed.addField("Posição na fila", `${player.queue.size - 0}`, true);
                    Searching.edit(SongAddedEmbed);
                }
            }
        } catch (e) {
            console.log(e);
            return client.sendTime(message.channel, "**Nenhuma resultado encontrado para - **" + SearchString);
        }
    },

    SlashCommand: {
        options: [
            {
                name: "query",
                value: "consulta",
                type: 3,
                required: true,
                description: "Tocar música no canal de voz",
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
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Você deve estar em um canal de voz para usar esse comando.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Você deve estar no mesmo canal de voz que eu para usar esse comando!**");
            let CheckNode = client.Manager.nodes.get(client.config.Lavalink.id);
            if (!CheckNode || !CheckNode.connected) {
              return client.sendTime(interaction,"❌ | **Lavalink não conectado**");
            }
    
            let player = client.Manager.create({
                guild: interaction.guild_id,
                voiceChannel: voiceChannel.id,
                textChannel: interaction.channel_id,
                selfDeafen: false,
            });
            if (player.state != "CONNECTED") await player.connect();
            let search = interaction.data.options[0].value;
            let res;

            if (search.match(client.Lavasfy.spotifyPattern)) {
                await client.Lavasfy.requestToken();
                let node = client.Lavasfy.nodes.get(client.config.Lavalink.id);
                let Searched = await node.load(search);

                switch (Searched.loadType) {
                    case "LOAD_FAILED":
                        if (!player.queue.current) player.destroy();
                        return client.sendError(interaction, `❌ | **Ocorreu um erro ao pesquisar**`);

                    case "NO_MATCHES":
                        if (!player.queue.current) player.destroy();
                        return client.sendTime(interaction, "❌ | **Nenhum resultado foi encontrado.**");
                    case "TRACK_LOADED":
                        player.queue.add(TrackUtils.build(Searched.tracks[0], member.user));
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        let SongAddedEmbed = new MessageEmbed();
                            SongAddedEmbed.setAuthor(`Adicionado à fila`, client.config.IconURL);
                            SongAddedEmbed.setColor("RANDOM");
                            SongAddedEmbed.setDescription(`[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`);
                            SongAddedEmbed.addField("Autor", Searched.tracks[0].info.author, true);
                            if (player.queue.totalSize > 1) SongAddedEmbed.addField("Posição na fila", `${player.queue.size - 0}`, true);
                            return interaction.send(SongAddedEmbed);

                    case "SEARCH_RESULT":
                        player.queue.add(TrackUtils.build(Searched.tracks[0], member.user));
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        let SongAdded = new MessageEmbed();
                            SongAdded.setAuthor(`Adicionado à fila`, client.config.IconURL);
                            SongAdded.setColor("RANDOM");
                            SongAdded.setDescription(`[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`);
                            SongAdded.addField("Autor", Searched.tracks[0].info.author, true);
                            if (player.queue.totalSize > 1) SongAdded.addField("Posição na fila", `${player.queue.size - 0}`, true);
                            return interaction.send(SongAdded);


                    case "PLAYLIST_LOADED":
                        let songs = [];
                        for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i], member.user));
                        player.queue.add(songs);
                        if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) player.play();
                        let Playlist = new MessageEmbed();
                        Playlist.setAuthor(`Adicionada à Playlist à fila`, client.config.IconURL);
                        Playlist.setDescription(`[${Searched.playlistInfo.name}](${interaction.data.options[0].value})`);
                        Playlist.addField("Fila", `\`${Searched.tracks.length}\` músicas`, false);
                        return interaction.send(Playlist);
                }
            } else {
                try {
                    res = await player.search(search, member.user);
                    if (res.loadType === "LOAD_FAILED") {
                        if (!player.queue.current) player.destroy();
                        return client.sendError(interaction, `:x: | **Ocorreu um erro ao pesquisar**`);
                    }
                } catch (err) {
                    return client.sendError(interaction, `Ocorreu um erro ao pesquisar: ${err.message}`);
                }
                switch (res.loadType) {
                    case "NO_MATCHES":
                        if (!player.queue.current) player.destroy();
                        return client.sendTime(interaction, "❌ | **Nenhum resultado foi encontrado.**");
                    case "TRACK_LOADED":
                        player.queue.add(res.tracks[0]);
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        let SongAddedEmbed = new MessageEmbed();
                            SongAddedEmbed.setAuthor(`Adicionado à fila`, client.config.IconURL);
                            SongAddedEmbed.setThumbnail(res.tracks[0].displayThumbnail());
                            SongAddedEmbed.setColor("RANDOM");
                            SongAddedEmbed.setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri})`);
                            SongAddedEmbed.addField("Autor", res.tracks[0].author, true);
                            SongAddedEmbed.addField("Duração", `\`${prettyMilliseconds(res.tracks[0].duration, { colonNotation: true })}\``, true);
                            if (player.queue.totalSize > 1) SongAddedEmbed.addField("Posição na fila", `${player.queue.size - 0}`, true);
                            return interaction.send(SongAddedEmbed);
                            
                    case "PLAYLIST_LOADED":
                        player.queue.add(res.tracks);
                        await player.play();
                        let SongAdded = new MessageEmbed();
                        SongAdded.setAuthor(`Adicionada à Playlist à fila`, client.config.IconURL);
                        SongAdded.setThumbnail(res.tracks[0].displayThumbnail());
                        SongAdded.setDescription(`[${res.playlist.name}](${interaction.data.options[0].value})`);
                        SongAdded.addField("Fila", `\`${res.tracks.length}\` songs`, false);
                        SongAdded.addField("Duração da lista de reprodução", `\`${prettyMilliseconds(res.playlist.duration, { colonNotation: true })}\``, false);
                        return interaction.send(SongAdded);
                    case "SEARCH_RESULT":
                        const track = res.tracks[0];
                        player.queue.add(track);
                    

                        if (!player.playing && !player.paused && !player.queue.length) {
                            let SongAddedEmbed = new MessageEmbed();
                            SongAddedEmbed.setAuthor(`Adicionado à fila`, client.config.IconURL);
                            SongAddedEmbed.setThumbnail(track.displayThumbnail());
                            SongAddedEmbed.setColor("RANDOM");
                            SongAddedEmbed.setDescription(`[${track.title}](${track.uri})`);
                            SongAddedEmbed.addField("Autor", track.author, true);
                            SongAddedEmbed.addField("Duração", `\`${prettyMilliseconds(track.duration, { colonNotation: true })}\``, true);
                            if (player.queue.totalSize > 1) SongAddedEmbed.addField("Posição na fila", `${player.queue.size - 0}`, true);
                            player.play();
                            return interaction.send(SongAddedEmbed);
                            
                        } else {
                            let SongAddedEmbed = new MessageEmbed();
                            SongAddedEmbed.setAuthor(`Adicionado à fila`, client.config.IconURL);
                            SongAddedEmbed.setThumbnail(track.displayThumbnail());
                            SongAddedEmbed.setColor("RANDOM");
                            SongAddedEmbed.setDescription(`[${track.title}](${track.uri})`);
                            SongAddedEmbed.addField("Autor", track.author, true);
                            SongAddedEmbed.addField("Duração", `\`${prettyMilliseconds(track.duration, { colonNotation: true })}\``, true);
                            if (player.queue.totalSize > 1) SongAddedEmbed.addField("Posição na fila", `${player.queue.size - 0}`, true);
                            interaction.send(SongAddedEmbed);
                        }
                }
            }
        },
    },
};
