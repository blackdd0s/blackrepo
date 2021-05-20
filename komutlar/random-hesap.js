const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

 if(!message.member.roles.cache.has('RolID') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')

    let hesap = ["hesap:şifre","hesap:şifre","hesap:şifre","hesap:şifre"];
   let sonuç = Math.floor((Math.random() * hesap.length));

    message.channel.send(`İşte Hesabın: ${sonuç}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["hesap"],
    permLevel: 0
   };
   
  exports.help = {
    name: 'random-hesap',
    description: '',
    usage: ''
   }