const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
if(message.author.id !== message.guild.owner.id) return message.channel.send(`siktir lan sen kullanaman`)
if(!args[0]) return message.channel.send(`Bir kişi etiketlemelisin.`)
let kişi = message.mentions.members.first()
if(!kişi) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
message.guild.roles.cache.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.members.banrol.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.roles.add(i)}
db.delete(`${message.guild.id}.members.banrol.${kişi.id}.roles.${r.id}`)})
  const embed = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`${kişi}, kullanıcısına eski rolleri geri verildi.`)
  message.channel.send(embed)

};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['sagtik-koruma'],
  permLevel: 0 ,
  bakim: 'kapalı'
};

exports.help = {
    name: 'sagtik-koruma'
}; 