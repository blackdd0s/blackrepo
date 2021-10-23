const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\

if(!["853375628388728892"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.react("901426909806723072")

//-------------------------------------------------------------------------------\



  let reyn31 = "Ses Kanallarında  Olmayan Yetkililer:\n";
  message.guild.roles.cache.get("901353882679124007").members.map(r => {
    reyn31 += !r.voice.channel ? "  <@" + r.user.id + ">" : "";
  });

  const reyn31embed = 

    ("" + reyn31 + "")
  message.channel.send(reyn31embed).then(s => s.s);
};
module.exports.conf = {
  aliases: ["y-ses","yses"]
};

module.exports.help = {
  name: "yses"
};