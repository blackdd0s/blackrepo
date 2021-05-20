const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  
 if(!message.member.roles.cache.has('844671875253796933')) return message.channel.send('**Bu komutu kullanabilmek için <@&844671875253796933d> yetkisine sahip olmalısın.**')

  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let yineyangınlaryineben = "✧"
  if (!member) return message.channel.send("Bir Kullanıcı Etiketlermisin ?");
  if (!isim) return message.channel.send("Bir İsim Girmelisin !");
  if(!yaş) return message.channel.send("Bir Yaş Girmelisin !")
  message.react("TEPKİ ID GİR")
  

  member.setNickname(`${yineyangınlaryineben} ${isim} • ${yaş}`);
  
    
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim"],
  permLevel: 0
}
exports.help = {
  name: 'nick',
}