const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();

client.on("ready", () => {
    let activities =[
        `𝗧𝗥𝗢𝗣𝗔 𝗗𝗝 𝗘𝗦𝗧𝗔́ 𝗡𝗔 𝗩𝗲𝗿𝘀𝗮̃𝗼 𝟮`,
        `"=ajuda" PARA OBTER AJUDA!`,
        `Quem Me Crio foi GeH#3556 ❤️`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `VEM PRA TROPA!`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `${client.guilds.cache.size} servidores usando o TROPA DJ!`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `"=convite" PARA ME CONVIDAR PRO SEU SERVE`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `ESTOU EM DESENVOLVIMENTO! BUGS PODEM OCORRER!😕`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `FUI FEITO EM 22/01/2021 🎂`,
		`FIZ UM ANINHO JÁ!😁`,
        `ME CHAMA PRA OUTROS SERVERS"=convite"!😁`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `ME AJUDE A VIRA BOT VERIFICADO =convite!😁`,
        `"=ajuda" PARA OBTER AJUDA!`,
        `AGORA TENHO SUPORTE A MÚSICAS E PLAYLIST 𝗦𝗣𝗢𝗧𝗜𝗙𝗬😁`,
        `"=ajuda" PARA OBTER AJUDA!`,
        `Quem Me Crio foi GeH#3556 ❤️`,
        `"=ajuda" PARA OBTER AJUDA!`
    ]
    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %
    activities.length]}`,{
        type: "LISTENING"
    }), 5000),
    console.log("Estou Online!")
});

client.build();

module.exports = client;
