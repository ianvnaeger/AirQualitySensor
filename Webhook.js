'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
var https = require('https');//let hello = require('hellojs/dist/hello.all.js');
var querystring = require('querystring');

const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests

var cayenneEmail = "ydypb@mail.missouri.edu";
var cayennePass = "Capstone08";
var apiAuthToken = "";

//https://platform.mydevices.com/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/28f57f70-1ceb-11e8-a21e-7395420787ce/summaries?type=latest
//28f57f70-1ceb-11e8-a21e-7395420787ce
//^^^For channel 0

//https://platform.mydevices.com/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/dcb3b190-2159-11e8-aeac-8375e928efd4/summaries?type=latest
//dcb3b190-2159-11e8-aeac-8375e928efd4
//^^^For channel 1

//https://platform.mydevices.com/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/dd7ec9c0-2159-11e8-ac80-85ded0fe5d33/summaries?type=latest
//dd7ec9c0-2159-11e8-ac80-85ded0fe5d33
//^^^For channel 2

//https://platform.mydevices.com/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/df3d69b0-2159-11e8-b6d4-35a0ad51f849/summaries?type=latest
//df3d69b0-2159-11e8-b6d4-35a0ad51f849
//^^^For channel 3

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
 
  /*
  apiAuthToken = function cayenneAuth () {
    //Get the Auth Token
    return new Promise((resolve, reject) => {
    
    var authRequest = querystring.stringify({
        "grant_type":"password",
        "email": cayenneEmail,
        "password": cayennePass
      });

      // An object of options to indicate where to post to
      var post_options = {
        host: 'auth.mydevices.com',
        path: '/oauth/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer JWT_TOKEN',
            'X-API-Version': '1.0'
        }
      };

      https.request(post_options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; }); 
        res.write(authRequest);
        res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            apiAuthToken = parsedData.access_token;
            resolve(apiAuthToken);
        });
        res.on('error', (err) => reject(err));
      });
    });
  }
 
  function cayenneGetData () {

    return new Promise((resove,reject) =>{
      
      let URLConstructor = DATA_URL + deviceID + DATA_HELPER1 + sensorID + DATA_HELPER2 + DATA_SUMMARYTYPE;
    DATA_HEADER_VALUE = "Bearer " + apiAuthToken;

    })
    //GET all the active things on database

    //append all of the url stuff with the device and sensor IDs
    
    //parse this data and give it to the logic below to figure out what Google should say
  }
*/

  // An action is a string used to identify what needs to be done in fulfillment
  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters

  // Parameters are any entites that Dialogflow has extracted from the request.
  const parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters

  // Contexts are objects used to track and store conversation state
  const inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts

  const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlkeXBiQG1haWwubWlzc291cmkuZWR1IiwiZmlyc3RfbmFtZSI6Illpemh1byIsImxhc3RfbmFtZSI6IkR1Iiwic2NvcGUiOlsic2VsZiJdLCJ1c2VyX2lkIjoiMTAzMjUzMzMiLCJpYXQiOjE1MjE0Njc2NDMsImV4cCI6MTUyMjc2MzY0MywiYXVkIjoibXlkZXZpY2VzLmNheWVubmUucHJvZCIsImlzcyI6Im15ZGV2aWNlcy5hc2dhcmQucHJvZCIsImp0aSI6IjRiZTBmYTQwLTRlODctNDBkMC1iMTMyLWM3NGU2YThjM2Q5MyJ9.whrmpl6-39qBWgRkKi8x9H0tTx5nb4buMG7aWlVQBts";
  //+ apiAuthToken;

  // Get the request source (Google Assistant, Slack, API, etc) and initialize DialogflowApp
  const requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
  const app = new DialogflowApp({request: request, response: response});
  //var parsedData;
  
  var options = {
      host: 'https://platform.mydevices.com',
      path: '/v1.1/things'
  }
  
  var optionsChannel0 = {
    host: 'platform.mydevices.com',
    path: '/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/28f57f70-1ceb-11e8-a21e-7395420787ce/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };

  var optionsChannel1 = {
    host: 'https://platform.mydevices.com',
    path: '/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/dcb3b190-2159-11e8-aeac-8375e928efd4/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };

  var optionsChannel2 = {
    host: 'https://platform.mydevices.com',
    path: '/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/dd7ec9c0-2159-11e8-ac80-85ded0fe5d33/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };

  var optionsChannel3 = {
    host: 'https://platform.mydevices.com',
    path: '/v1.1/telemetry/b4563110-1cc6-11e8-9beb-4d400e603e7e/sensors/df3d69b0-2159-11e8-b6d4-35a0ad51f849/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };

  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.welcome': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        sendGoogleResponse('Hello, Welcome to our Air Quality Sensor helper!'); // Send simple response to user
      } else {
        sendResponse('Hello, Welcome to our Air Quality Sensor helper!'); // Send simple response to user
      }
    },
    'input.air': () => { //Under Construction!!!
      //Model for what to change on others, in case you forget
      //Air will probably be a rating that you will want to give to the user
      if (requestSource === googleAssistantRequest) {
        https.get(options, (res) => { //change options to optionsChannelX
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
              console.log(rawData);
              const parsedData = JSON.parse(rawData);
              console.log(parsedData);
              if(parsedData.fire === 1){ //Change parsedData.fire to parsedData.v or something calculated from that value
                sendGoogleResponse('Your home has an air quality of...'); 
              } else {
                sendGoogleResponse('Your home has an air quality of...Other');
              }  
          });
        }); //Repeat changes for the else case
      } else {
        https.get(options, (res) => {
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                console.log(rawData);
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                if(parsedData.fire === 1){
                  sendResponse('Your home has an air quality of...');
                } else {
                  sendResponse('Your home has an air quality of...Other');
                }
            });
          });
      }
    },
    'input.carbon': () => { //Under Construction!!!
      //Carbon will probably just be a boolean for safe/unsafe
       if (requestSource === googleAssistantRequest) {
        https.get(options, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            if(parsedData.v === 1){
              sendGoogleResponse('Your home has a dangerous amount of Carbon Monoxide!'); 
            } else {
              sendGoogleResponse('The level of Carbon Monoxide in your home is safe.');
            }  
          });
        });
      } else {
        https.get(options, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            if(parsedData.v === 1){
              sendResponse('Your home has a dangerous amount of Carbon Monoxide!'); 
            } else {
              sendResponse('The level of Carbon Monoxide in your home is safe.');
            }
          });
        });
      }
    },
    'input.filter': () => { //Under Construction!!!
      //Filter will be a boolean to tell you if you should replace or not
      if (requestSource === googleAssistantRequest) {
        https.get(options, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            if(parsedData.lockStatus === 1){
              sendGoogleResponse('Your air is a tad dingy. Think about replacing your air filter.'); // Send simple response to user
            }else{
              sendGoogleResponse('Your air filter is fine, no need to replace it yet'); // Send simple response to user
            }  
          });
        });
      } else {
        https.get(options, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            if(parsedData.lockStatus === 1){
              sendResponse('Your air is a tad dingy. Think about replacing your air filter.'); // Send simple response to user
            }else{
              sendResponse('Your air filter is fine, no need to replace it yet'); // Send simple response to user
            }
          });
        });
      }
    },
    'input.smoke': () => { //Ready!
      if (requestSource === googleAssistantRequest) {
        https.get(optionsChannel0, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            if(parsedData.v === 1){ // Needs to be changed!!!
              sendGoogleResponse('Your home is totally smoke free!'); // Send simple response to user
            }else{
              sendGoogleResponse('Your home is currently smoking. You should contact authorities!'); // Send simple response to user
            }
          });
        });
      } else {
        https.get(optionsChannel0, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            if(parsedData.v === 1){ // Needs to be changed!!!
              sendResponse('Your home is definitely smoke free!'); // Send simple response to user
            }else{
              sendResponse('Your home is currently smoking. You should contact authorities!'); // Send simple response to user
            }
          });
        });
      }
    },
     'input.general': () => { //Under Construction!!!
      //This will probably have to go...
      if (requestSource === googleAssistantRequest) {
        https.get(options, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            let answer = '';
            if(parsedData.fire === 1){
                answer = answer+'The house is on fire!';
            }
            if(parsedData.water === 1){
                answer = answer+'The house is flooded!';
            }
            if(parsedData.earth === 1){
                answer = answer+'There is an earthquake happening!';
            }
            if(parsedData.light === 1){
                answer = answer+'The lights are still on.';
            }
            if(parsedData.lockStatus === 1){
                answer = answer+'The doors are unlocked.';
            }
            if(parsedData.intruder === 1){
                answer = answer+'There is someone in the house.';
            }
            if(parsedData.fire === 0 && parsedData.water === 0 && parsedData.earth === 0 && parsedData.light === 0 && parsedData.lockStatus === 0 && parsedData.intruder === 0){
                answer = 'The house is safe, locked, and the lights are off.';
            }
            sendGoogleResponse('The temperature in the house is: '+parsedData.temp+' and the humidity is '+parsedData.humidity+' '+answer+''); // Send simple response to user
          });
        });
      } else {
        https.get(options, (res) => {
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            let answer = '';
            if(parsedData.fire === 1){
                answer = answer+'The house is on fire!';
            }
            if(parsedData.water === 1){
                answer = answer+'The house is flooded!';
            }
            if(parsedData.earth === 1){
                answer = answer+'There is an earthquake happening!';
            }
            if(parsedData.light === 1){
                answer = answer+'The lights are still on.';
            }
            if(parsedData.lockStatus === 1){
                answer = answer+'The doors are unlocked.';
            }
            if(parsedData.intruder === 1){
                answer = answer+'There is someone in the house.';
            }
            if(parsedData.fire === 0 && parsedData.water === 0 && parsedData.earth === 0 && parsedData.light === 0 && parsedData.lockStatus === 0 && parsedData.intruder === 0){
                answer = 'The house is safe, locked, and the lights are off.';
            }
            sendGoogleResponse('The temperature in the house is '+parsedData.temp+' and the humidity is '+parsedData.humidity+'. '+answer+''); // Send simple response to user
          });
        });
      }
    },
     'input.temp': () => { //Under Construction!!!
      //Will probably have to derive the temp from the combo sensor
      //Alternative, combine them
      https.get(options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData);
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          if(requestSource === googleAssistantRequest){
            sendGoogleResponse('The current house temperature is: '+parsedData.temp+'.'); // Send simple response to user
          }else{
            sendResponse('The current house temperature is: '+parsedData.temp+'.');
          }    
        });
      });
    },
    'input.humidity': () => { //Under Construction!!!
      //Will probably have to derive the humidity from the combo sensor
      //Alternative, combine them
      https.get(options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData);
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          if(requestSource === googleAssistantRequest){
            sendGoogleResponse('The current house humidity is: '+parsedData.humidity+'.'); // Send simple response to user
          }else{
            sendResponse('The current house humidity is: '+parsedData.humidity+'.');
          }    
        });
      });
    },
    // The default fallback intent has been matched, try to recover (https://dialogflow.com/docs/intents#fallback_intents)
    'input.unknown': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        sendGoogleResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
      } else {
        sendResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
      }
    },
    // Default handler for unknown or undefined actions
    'default': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        let responseToUser = {
          //googleRichResponse: googleRichResponse, // Optional, uncomment to enable
          //googleOutputContexts: ['weather', 2, { ['city']: 'rome' }], // Optional, uncomment to enable
          speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor! You should not hear this...', // spoken response
          displayText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! You should not see this... :/' // displayed response
        };
        sendGoogleResponse(responseToUser);
      } else {
        let responseToUser = {
          //richResponses: richResponses, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
          speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!You should not hear this...', // spoken response
          displayText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! You should not see this... :/' // displayed response
        };
        sendResponse(responseToUser);
      }
    }
  };

  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }

  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();

  // Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user
  function sendGoogleResponse (responseToUser) {
    if (typeof responseToUser === 'string') {
      app.ask(responseToUser); // Google Assistant response
    } else {
      // If speech or displayText is defined use it to respond
      let googleResponse = app.buildRichResponse().addSimpleResponse({
        speech: responseToUser.speech || responseToUser.displayText,
        displayText: responseToUser.displayText || responseToUser.speech
      });

      // Optional: Overwrite previous response with rich response
      if (responseToUser.googleRichResponse) {
        googleResponse = responseToUser.googleRichResponse;
      }

      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      if (responseToUser.googleOutputContexts) {
        app.setContext(...responseToUser.googleOutputContexts);
      }

      app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
    }
  }

  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};

      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;

      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.richResponses;

      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;

      response.json(responseJson); // Send response to Dialogflow
    }
  }
});
