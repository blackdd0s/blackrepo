const Discord = require('discord.js');
const database = require('quick.db');
const ms = require('ms');
const moment = require('moment');
const ayarlar = require("../ayarlar.json");
moment.locale('tr');

exports.run = async (client, message, args) => {

if(!args[0]) return message.channel.send('Bir kullanıcıyı etiketlemelisin.');
if(!message.mentions.members.first()) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');

let argument_one = ['saniye', 'dakika', 'saat', 'gün'];
if(!args[1]) return message.channel.send(`Bir süre belirtmelisin.\nÖrnek: !mute ${message.mentions.members.first()} 5 gün reklam`);
if(!args[2]) return message.channel.send(`Geçerli bir zaman belirtmelisin.\n${argument_one.map(a => `**${a}**`).join('/')}`)
if(!argument_one.includes(args[2])) return message.channel.send(`Geçerli bir zaman belirtmelisin.\n${argument_one.map(a => `**${a}**`).join('/')}`)

let reason = 'Bir sebep girilmemiş.';
if(args[3]) reason = args.slice(3).join(' ');
let end = Date.now()+ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day'));

database.set(member.user.id, { 
end: end,
start: Date.now(),
moderatorUsername: message.author.username,
moderatorID: message.author.id,
moderatorAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
reason: reason
});

let logChannelID = ayarlar.muteLogKanalID;
let logChannel = await message.guild.channels.cache.get(logChannelID);


member.roles.add(ayarlar.mutedRolID);
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle('Birisi susturuldu!')
.setColor('RED')
.setDescription(`**• Moderatör**: ${message.author}
**• Susturulan**: <@!${member.user.id}>
**• Sebep**: ${reason}
**• Bitiş zamanı:**: ${moment(end+ms('3h')).format('DD.MM.YYYY - HH:mm:ss')}`);
message.channel.send(`Başarılı, ***${member.user.tag}*** susturuldu.`);
logChannel.send(embed);
setTimeout(() => {
return member.roles.remove(ayarlar.mutedRolID).then(() => database.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: ${message.author}
**• Susturulan**: <@!${member.user.id}>
**• Sebep**: ${reason}`)));
}, ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day')));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'mute'
};