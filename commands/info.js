
const axios = require('axios');


function getAvatarURL(type, id, response) {
  var revision;
  switch (type) {
    case 'avatar': revision = response.data.data.user.avatar_revision + "";    
    case 'banner': revision = response.data.data.user.banner_revision + "";
  }
  if(!response.data.data.user.avatar_revision) return "https://branding.osk.sh/tetrio-anim.gif"; 
  return "https://tetr.io/user-content/" + type + "s/" + id + ".jpg?rv={" + revision + "}";
}

module.exports = {

  name: 'info',
  description: 'N/a',

  execute(message, args, embed, client) {
    if(message.guild || message.author.id == "501885489683628036") {
 
      if(args[1]) { 
        axios.get('https://ch.tetr.io/api/users/' + args[1])
 
        .then(response => {
          
          //declaring all things to be used fom the API call
          //----------------------------------------------------
          var userid = response.data.data.user._id;
          var username = response.data.data.user.username;
          var userType = response.data.data.user.role;
          var gamesPlayed = response.data.data.user.gamesplayed;
          var gamesWon = response.data.data.user.gameswon;
          var gamesLost;
          var WLRatio;
          //----------------------------------------------------

          var rank = response.data.data.user.league.percentile_rank;
          rank = rank.replace('+', 'p');
          rank = rank.replace('-', 'm');
          console.log(rank);
          var fuckArc = rank;

          var rankEmoji = client.emojis.cache.find(emoji => emoji.name == rank + "_");
          var rankString = rankEmoji.toString();
          console.log(rankEmoji);
          var WLPR = []; //WinLossPlayedRatio (win/loss is value 0, the other two are 1, and 2 respectively) | Declaring them as hidden initially, changes later:
          WLPR[0] = '`hidden`';
          WLPR[1] = '`hidden`';
          WLPR[2] = '`hidden`';

          if(gamesWon != -1) {
            WLPR[0] = gamesWon + ' / `hidden`'
            if(gamesPlayed == -1) return;
            gamesLost = gamesPlayed - gamesWon;
            WLPR[0] = gamesWon + ' / ' + gamesLost;
            WLPR[1] = gamesPlayed;

            WLRatio = gamesWon / gamesPlayed + '';
      
            if(!WLRatio[3]) WLRatio[3] = 0;       //checks if WLRATIO has a 2nd digit, and adds a 0 if not. Example: .4 instead of 40
            WLPR[2] = WLRatio[2] + WLRatio[3] + "%";
            if(WLRatio[2] == 0) WLPR[2] = WLRatio[3] + "%"; //removes the first 0 if present
          }

          
          //Code to see if the country is hidden, can't "tolowercase" null, so it'll catch the error and set it to hidden, kinda stupid but it works.
          var country;
          try{
            country = response.data.data.user.country.toLowerCase();
          } catch (err) {
            country = 'hidden'
          }
          

          //Possible Hidden Values: Country, GamesPlayed, GamesWon, GameTime
          



          //calls avatarURL
          var avatarURL = getAvatarURL("avatar", userid, response);
          //checks if the user has a bio, returns "" if not.
          var userBio = "";
          if(response.data.data.user.bio) var userBio = response.data.data.user.bio;
          
          var finalEmbed = embed
          .spliceFields(0, 25)
          .setDescription(userBio)
          .setColor('#d726ff')
          .setTitle(username + " :flag_" + country + ": " + rankString)
          .setURL("https://ch.tetr.io/u/" + username)
          .setThumbnail(avatarURL)

          //you could center this with a case: (gamesPlayed.length) which is autistic but possible
          .addField("Games Won/Lost⠀⠀⠀", WLPR[0], true)
          .addField("Games Played⠀⠀⠀", WLPR[1], true)
          .addField("W/L Ratio", WLPR[2], true)
          .addField("new", "line (2)", false)
          .addField("line", "3", true)

          .setAuthor(message.author.username, message.author.avatarURL());
          
          
          

          if(country == "xm") var finalEmbed = finalEmbed.setTitle(username + " :new_moon: " + rankString);          //special line of code for user "osk" b/c the devs wanted to be special :/
          
          //after immense amounts of testing and working, this line of code worked for everyone except arcinferno, so i reworked it in a really dumb way, then it pings arc and says fuck you.
          if(country == 'hidden') {
            var finalEmbed = finalEmbed.setTitle(username + " " + "<:" + fuckArc + "_:"+ rankEmoji.id +">"); //sees if the country is hidden, displayes it propperly
            message.channel.send("fuck you, <@247171493555994625>")
          }
          
          
          message.channel.send(finalEmbed);

        })
 
        .catch(error => {
 
          console.log(message.channel.author + " tried a command with an invalid user!\nerr:\n" + error);
 
          message.channel.send("Invalid User! (or API is having issues)"); 
 
        }) 
 
      } else {
 
        message.channel.send('Invalid argument!, Please provide a user!');
 
      }
    }
  },
};