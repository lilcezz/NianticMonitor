const Discord = require('discord.js');
const config = require('./config.json');
const request = require('request');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Niantic Monitor is Online');
	client.channels.cache.get(config.channel)
    .send('Niantic Monitor is Online')
	return StatusLoop();
	
});

async function StatusLoop(){
	
		request('https://sso.pokemon.com/sso/login', function(err, response, body) {
			console.log(response.statusCode);
			if(response.statusCode != 200)
				{					
					client.channels.cache.get(config.channel).send({embed: {
					color: 15158332,
					title: "LOGIN STATUS (SSO)",
					description: "HTTP Status:\n" + response.statusCode + " Offline",
					
					}
					});
					
				} 
				else {
					client.channels.cache.get(config.channel).send({embed: {
					color: 3066993,
					title: "LOGIN STATUS (SSO)",
					description: "HTTP Status:\n" + response.statusCode + " Online",
					
					}
					});
					
				}                   
			});
	
		request('https://pgorelease.nianticlabs.com/plfe/version', function(err, response, body) {
			console.log(response.statusCode);
			console.log(body.slice(2));
				if(response.statusCode != 200)
				{					
					client.channels.cache.get(config.channel).send({embed: {
					color: 15158332,
					title: "Getting Version Failed",
					description: "HTTP Status:\n" + response.statusCode + " Offline",
					
					}
					});
					
				} 
				else {
					client.channels.cache.get(config.channel).send({embed: {
					color: 3066993,
					title: "Current POGO Version",
					description: "Version: " + body.slice(2) + ".\nHTTP Status:\n" + response.statusCode + " Online",
					
					}
				});
			}
		});
		client.channels.cache.get(config.channel)
		.send('Last Checked:'+ Date() )
	setTimeout(StatusLoop,config.timeout);
	
    return;
}

client.login(config.token);
