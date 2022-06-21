module.exports = {
  Admins: ["325731365926469632"], //Admins of the bot
  DefaultPrefix: process.env.Prefix || "=", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/3RAR33gzrn", //Support Server Link
  Token: process.env.Token || "", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "799486079211274331", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "_vT5DwP3RUgDUWgdZ0SA4GjgZwSPZiZv", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "GeH THE BEST!", //A Secret like a password
  IconURL:
    "https://i.imgur.com/aWJY2X7.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: process.env.Website || "http://localhost", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink - Already there is a serer to connect :)
  Lavalink: {
    id: "Main",
    host: "localhost",
    port: 2333,
    pass: "discloud",
  },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "7494effb3ce74bee90017a0872f1a071", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "bd2edb752dbe4adb8bcbab1c6694ba9d", //Spotify Client Secret
  },
};
