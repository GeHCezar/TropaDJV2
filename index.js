const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();

client.on("ready", () => {
    let activities =[
        `ð§ð¥ð¢ð£ð ðð ðð¦ð§ðÌ ð¡ð ð©ð²ð¿ðð®Ìð¼ ð®`,
        `"=ajuda" PARA OBTER AJUDA!`,
        `Quem Me Crio foi GeH#3556 â¤ï¸`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `VEM PRA TROPA!`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `${client.guilds.cache.size} servidores usando o TROPA DJ!`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `"=convite" PARA ME CONVIDAR PRO SEU SERVE`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `ESTOU EM DESENVOLVIMENTO! BUGS PODEM OCORRER!ð`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `FUI FEITO EM 22/01/2021 ð`,
		`FIZ UM ANINHO JÃ!ð`,
        `ME CHAMA PRA OUTROS SERVERS"=convite"!ð`,
		`"=ajuda" PARA OBTER AJUDA!`,
        `ME AJUDE A VIRA BOT VERIFICADO =convite!ð`,
        `"=ajuda" PARA OBTER AJUDA!`,
        `AGORA TENHO SUPORTE A MÃSICAS E PLAYLIST ð¦ð£ð¢ð§ððð¬ð`,
        `"=ajuda" PARA OBTER AJUDA!`,
        `Quem Me Crio foi GeH#3556 â¤ï¸`,
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
