const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const data = require("quick.db");
const token = process.env.token;
const database = require('quick.db');
const ms = require('ms');
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

client.on('ready', () => {
client.guilds.cache.forEach(guild => {
guild.members.cache.forEach(async member => {
const fetch = await database.fetch(member.user.id);
if(!fetch) return;
if((Date.now() <= fetch.end) || fetch) {
let kalan = fetch.end - Date.now();
let logChannelID = ayarlar.muteLogKanalID;
let logChannel = await guild.channels.cache.get(logChannelID);
setTimeout(() => {
const embed = new Discord.MessageEmbed()
.setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL);
return member.roles.remove(ayarlar.mutedRolID).then(() => database.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: <@!${fetch.moderatorID}>
**• Susturulan**: <@!${member.user.id}>
**• Sebep**: ${fetch.reason}`)));
}, kalan);
};
});
});
});

client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === ayarlar.mutedRolİsim);
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add(ayarlar.mutedRolID)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.roles.remove(ayarlar.mutedRolID);
  }, ms(süre));
}
})

client.on('message', async message => {
if(message.channel.type === 'dm') return;
if(await data.fetch(`afk.${message.author.id}.${message.guild.id}`) == undefined) return;
const ms = require('ms')

if(message.content.length > 2) {
const sebepp = await data.fetch(`sebep.${message.author.id}.${message.guild.id}`)
const sp = await data.fetch(`giriş.${message.author.id}.${message.guild.id}`)
const asd = await data.fetch(`display.${message.author.id}.${message.guild.id}`)

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let atılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``


message.guild.members.cache.get(message.author.id).setNickname(asd)
message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}, hoşgeldin!`).setColor('GREEN').setDescription(`Afk modundan başarıyla çıkış yaptın.`)
.addField('Giriş sebebin:', sebepp) 
.addField('AFK olma zamanın:', sp)
.addField('Çıkış zamanın:', atılma))
data.delete(`afk.${message.author.id}.${message.guild.id}`)
data.delete(`sebep.${message.author.id}.${message.guild.id}`)
data.delete(`giriş.${message.author.id}.${message.guild.id}`)
data.delete(`display.${message.author.id}.${message.guild.id}`)
}

})

client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.find(r => r.name === ayarlar.jailedRolİsim);
let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali") {
member.roles.add(ayarlar.jailedRolID)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan açıldı.`)
    member.roles.remove(ayarlar.jailedRolID);
  }, ms(sürejail));
}
})

client.on('messageDelete', message => {
  const anan = require("quick.db")
  anan.set(`snipe.mesaj.${message.guild.id}`, message.content)
  anan.set(`snipe.id.${message.guild.id}`, message.author.id)

})

///////////////////// TAG ROL /////////////////////////////////

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = ayarlar.tag
  const sunucu = ayarlar.sunucuID
  const kanal = ayarlar.tagRolLogID
  const rol = ayarlar.tagRolID

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

///////////////////// TAG ROL ////////////////////////////////



////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);

client.on('guildBanAdd', async (guild, user) => {
const data = require('quick.db')

const da = await data.fetch(`sağ.tık.members.ban.${guild.id}`)
if(!da) return;
const kanal_id = await data.fetch(`sağ.tık.members.ban.kanal.${guild.id}`)
let kanal = client.channels.cache.get(kanal_id)

let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
if(logs.entries.first().executor.bot) return;
let kişi = guild.members.cache.get(logs.entries.first().executor.id)
kişi.roles.cache.forEach(r => {
db.set(`${guild.id}.members.banrol.${kişi.id}.roles.${r.id}`, r.id)
kişi.roles.remove(r.id)})
guild.unmembers.ban(user)

const emb = new Discord.MessageEmbed()
.setAuthor(kişi.user.username, kişi.user.avatarURL())
.setFooter(`${client.user.username}`)
.setTimestamp()

kanal.send(emb.setDescription(`${kişi.user.tag} isimli kişi ${user} isimli kişiyi yasaklamaya çalıştı, attı ama ben yetkilerini aldım ve kişinin yasağını kaldırdım..`))
guild.owner.send(emb.setDescription(`${kişi.user.tag} isimli kişi ${user} isimli kişiyi yasaklamaya çalıştı, attı ama ben yetkilerini aldım ve kişinin yasağını kaldırdım..`))
console.log('sagtik koruma')
})

client.on("ready", () => {
  client.channels.cache.get("853375867178844180").join();
})

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`Ψ`)
});

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'Ψ'
  const sunucu = '846511990745726986'
  const log = '853375969440170044'
  const rol = '853375654924910614'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

client.on("message", async message => {
  const Salvo = message.content.toLocaleLowerCase();

  if (
    Salvo === "selam" ||
    Salvo === "sa" ||
    Salvo === "selamün aleyküm" ||
    Salvo === "selamun aleyküm" ||
    Salvo === "slm" ||
    Salvo === "sea"
  ) {
    let e = await db.fetch(`sa-as_${message.guild.id}`);
    if (e === "acik") {
      const salvo5 = new Discord.RichEmbed()
     .setDescription(`Aleyküm Selam, Hoş Geldin Dostum`)
     .setColor("RANDOM")
      
    return message.channel.send(salvo5)
    }
  }
});

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("LEXBER Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("LEXBER Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `LEXBER | Reklam-Engel Sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("LEXBER Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `LEXBER Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("LEXBER Reklam Kick Sistemi")
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const salvo = new Discord.MessageEmbed()

            .setDescription("Bu Sunucuda Küfür Edemezsin.")
            .setColor("BLACK");

          return msg.reply(salvo);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const salvo = new Discord.MessageEmbed()

            .setDescription("Bu Sunucuda Küfür Edemezsin.")
            .setColor("BLACK");

          return msg.reply(salvo);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var salvo2 = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(salvo2);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});
