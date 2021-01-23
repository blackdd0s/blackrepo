const Discord = require('discord.js')
const ayar = require('../ayarlar.json')
const db = require('quick.db')
const ms = require('ms')
const moment = require('moment')
const momentt = require("moment-duration-format")
exports.run = async(client, message, args) => {
    
  const permError = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`Bu Komutu Kullanmak İçin <@&${ayar.muteYetkiliRolID}> Yetkisine Sahip Olmalısın!`)
  
  const bisey = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('<a:red:785543516776300544> Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription('Mutelemem İçin Bir Kullanıcı Etiketlemelisin!')
  
  const bisey2 = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('<a:red:785543516776300544> Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription('Etiketlediğiniz Kullanıcı Sizden Üstte veya Aynı Pozisyonda Olduğundan Dolayı Muteleyemiyorum!')

    if (!message.member.roles.cache.has(ayar.muteYetkiliRolID)) return message.channel.send(permError); 

    let member = message.mentions.users.first()
    let py = message.guild.member(member)
    if(!member) return message.channel.send(bisey)
    if(py.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(bisey2)

    let zaman = args[1]
    .replace('sn', 's')
    .replace('dk', 'm')
    .replace('sa', 'h')
    .replace('gün', 'd')

    var vakit = zaman
    .replace('s', 'saniye')
    .replace('m', 'dakika')
    .replace('h', 'saat')
    .replace('d', 'd')

    let sebep = args.slice(2).join(' ')
    if(!sebep) sebep = 'Belirtilmedi'
    //------------------------------//
   db.set(`muteli_${message.guild.id + py.id}`, 'muteli')
   db.set(`süre_${message.mentions.users.first().id + message.guild.id}`, zaman)
   db.add(`mute.${message.author.id}`, 1)
   db.add(`toplam.${message.author.id}`, 1)
   //----------------------------------//
    try {
      py.roles.add(ayar.mutedRolID)
   client.channels.cache.get(ayar.muteLogKanalID).send(
       new Discord.MessageEmbed()
       .setTitle(`${client.user.username} - Mute`)
       .setAuthor(message.author.username, message.author.avatarURL ({dynamic: true}))
       .setDescription(`<@${py.id}>, adlı kullanıcı susturuldu.
       
       - Mute Atan Yetkili: <@${message.author.id}> / **${message.author.id}**
       
       - Mute Atılan Kullanıcı: <@${py.id}> / **${py.id}**
       
       - Mute Sebebi: **${sebep}**
       
       - Mute Süresi: **${zaman}**`)
       .setFooter('© Nobles 2019')
       .setTimestamp()
       );
      
      message.channel.send(
       new Discord.MessageEmbed()
       .setTitle(`${client.user.username} - Mute`)
       .setAuthor(message.author.username, message.author.avatarURL ({dynamic: true}))
       .setDescription(`<@${py.id}>, adlı kullanıcı susturuldu.
       
       - Mute Atan Yetkili: <@${message.author.id}> / **${message.author.id}**
       
       - Mute Atılan Kullanıcı: <@${py.id}> / **${py.id}**
       
       - Mute Sebebi: **${sebep}**
       
       - Mute Süresi: **${zaman}**`)
       .setFooter('© Nobles 2019')
       .setTimestamp()
       );
       
    } catch (e) {
        console.log(e);
    }
       setTimeout(async function() {
        py.roles.remove(ayar.mutedRolID)
          client.channels.cache.get(ayar.muteLogKanalID).send(
              new Discord.MessageEmbed()
              .setTitle(`${client.user.username} - Mute`)
              .setAuthor(message.author.username, message.author.avatarURL ({dynamic: true}))
              .setDescription(`<@${py.id}>, adlı kullanıcı susturulması kaldırıldı.
              
              - Mute Atan Yetkili: <@${message.author.id}> / **${message.author.id}**
              
              - Mute Kalkan Kullanıcı: <@${py.id}> / **${py.id}**
              
              - Mute Sebebi: **${sebep}**
              
              - Mute Süresi: **${zaman}**`)
              .setFooter('© Nobles 2019')
              .setTimestamp())
    }, ms(zaman));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sustur'],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'mute atar',
  usage: 'mute'
};