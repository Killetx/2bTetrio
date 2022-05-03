
const axios = require('axios');
const fs = require('fs');
const https = require('https');









function get_user(user_name, consumer) {
    axios.get('https://ch.tetr.io/api/users/' + user_name)
      .then(response => {
        const user = JSON.parse(response.body);
        consumer(user);
      })
    .catch(error => {
      console.log('Got an error', error);
    })
  }
  
  
  
  //
  const usermanager = require('usermanager');
  usermanager.get_user('killet', function(user) {
     message.channel.send("User ID: " + user.data.user._id);
  });




module.exports = {

    name: 'info',

    

    description: 'N/a',

    execute(message, args) {


        if(message.guild) {

            if(args[1]) {
                

                try {
                    get_user(args[1], );

                }  catch(error) {

                    message.channel.send("There was an error communicating with the Tetrio API! (fix it <@501885489683628036>)");
                    console.error("API Error:\n" + error);
        
                }

            } else {
                message.channel.send('Invalid argument!, Please provide a user!');
            }
        }
    },
};