const Discord = require('discord.js');

exports.run = async(message, args) => {
 // if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için "MESAJLARI YÖNET" iznine sahip olmalısın!`);
  if (!args[0] || isNaN(args[0])) {
    message.channel.send("Temizlenecek mesaj miktarını belirtmelisin!")
  }
  message.delete();
  let sayı = Number(args[0]);
  let silinen = 0;
  for (var i = 0; i < (Math.floor(sayı /100)); i++) {
   message.channel.bulkDelete(100).then(r => silinen+=r.size);
  };
  
  let sayi = sayı-100;
  if (sayi > 0)  message.channel.bulkDelete(sayı).then(r => silinen+=r.size);
  message.channel.send(` **\`\`${args[0]}\`\` Adet Mesaj Silindi.**`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["temizle", "sil"],
  permLevel: 2
};

exports.help = { 
  name: 'temizle', 
  description: '',
  usage: '',
 
};