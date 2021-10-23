const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!message.member.roles.cache.has('853375582007459860')) return message.channel.send('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin : `✧ |  Monster Of Lexber`')
   let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send('Bir kişi etiketlemelisin')
   }
   let vip = message.guild.roles.cache.find(r => r.id === '901353882679124001')//Viprolİd Koy

   if(!vip) {
       return message.channel.send('Vip rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et!')
   }

   let vipal = message.guild.member(member)


   vipal.roles.add(vip)
   let embed = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setTitle('Vip Üye Verildi')
   .addField('Vip Üye Yapılan Kullanıcı',member)
   .addField('Komutu Kullanan Yetkili', message.author)
    .setImage('GİF/RESİM LİNK')   
 client.channels.cache.get('901427358790197258').send(embed)///LOG KANAL İD YAZMALISIN
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['vipver','vip-ver'],
    permLevel: 4
};

exports.help = {
    name: 'vip-ver',
    description: 'vip-ver',
    usage: 'vip-ver'
}; //Plasmic Code・xKqntyZ_