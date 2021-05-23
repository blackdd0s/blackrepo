// Beyefendi TV ve Beyefendi Kod Paylaşıma Aittir!

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        await message.channel.send(new Discord.MessageEmbed()
                                  .setTitle("Komutlarım")
                                  .setDescription(`**__Komutlar:__** \n${client.commands.map(props => `\`${props.help.name}\``).join(" | ")}`)
                                  .setColor("RANDOM")
                                  .setFooter(`Botumun Komutları `));
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
  permLevel: 0
};

module.exports.help = {
  name: 'komutlar'
};

// Beyefendi TV ve Beyefendi Kod Paylaşıma Aittir!