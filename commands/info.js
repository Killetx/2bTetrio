
const axios = require('axios');
const fs = require('fs');
const https = require('https');











async function get_user(user_name) {//
  axios.get('https://ch.tetr.io/api/users/' + user_name)//
    .then(response => {//
      var userIDFinal = "fuck thsi shit";//
      //const awaitUserID = async() => {//
        userIDFinal = response.data.data.user._id + ""; //
        setTimeout(() => { console.log("end"); }, 5000);
        console.log(userIDFinal);//returns the propper thing, but returns it too late, printing after "user result"
        return userIDFinal; //this statement works but it runs too soon and sends "undefined" (i think it runs fine)
      
     // }//
     // awaitUserID();//
    })//
  .catch(error => {//
    console.log('Got an error', error);//
  })//
}//
  
  
  //
  // const usermanager = require('usermanager');
  // usermanager.get_user('killet', function(user) {
  //    message.channel.send("User ID: " + user.data.user._id);
  // });




module.exports = {

    name: 'info',

    

    description: 'N/a',

    execute(message, args) {


        if(message.guild || message.author.id == "501885489683628036") {

            if(args[1]) {
                

                try {
                  console.log('thru3');//
                  //     const awaitUserIDfunk = async() => {//
                  var userid = get_user(args[1]);
                    
                  console.log("user result:\n" + userid); //somehow prints before the function is entirely ran, and prints after "userid"
                  //     }//
                  //     awaitUserIDfunk();//
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