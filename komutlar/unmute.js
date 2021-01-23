const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ayar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
  const permError = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`Bu Komutu Kullanmak İçin <@&${ayar.muteYetkiliRolID}> Yetkisine Sahip Olmalısın!`)
  
  const bisey = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription('Mutesini Açmam İçin Bir Kullanıcı Etiketlemelisin!')
  
 if (!message.member.roles.cache.has(ayar.muteYetkiliRolID)) return message.channel.send(permError); 

  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(bisey)

        let mutezaman = args[0]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");
  
  db.delete(`muteli_${message.guild.id + kişi.id}`, 'muteli')
db.delete(`süre_${message.mentions.users.first().id + message.guild.id}`, mutezaman)
      
            kişi.roles.remove(ayar.mutedRolID);

            const nobles = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
  .setTimestamp()
  .setDescription(`<@${kişi.id}>, adlı kullanıcının susturulması sona erdi. 
- Yetkili: <@${message.author.id}> / **${message.author.id}**
- Mutesi Kalkan: <@${kişi.id}> / **${kişi.id}**
- Kanal: **${message.channel.name}**`)
client.channels.cache.get(ayar.muteLogKanalID).send(nobles)
  
  const noples = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
  .setTimestamp()
  .setDescription(`<@${kişi.id}>, adlı kullanıcının susturulması sona erdi. 
- Yetkili: <@${message.author.id}> / **${message.author.id}**
- Mutesi Kalkan: <@${kişi.id}> / **${kişi.id}**
- Kanal: **${message.channel.name}**`)
message.channel.send(noples)
  

}
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 0,
}

exports.help = {
  name: "unmute"
};