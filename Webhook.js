'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
var https = require('https');//let hello = require('hellojs/dist/hello.all.js');
var querystring = require('querystring');

const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests

//var cayenneEmail = "REDACTED";
//var cayennePass = "REDACTED";
var apiAuthToken = "";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // An action is a string used to identify what needs to be done in fulfillment
  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters

  // Parameters are any entites that Dialogflow has extracted from the request.
  const parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters

  // Contexts are objects used to track and store conversation state
  const inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts

  const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlkeXBiQG1haWwubWlzc291cmkuZWR1IiwiZmlyc3RfbmFtZSI6Illpemh1byIsImxhc3RfbmFtZSI6IkR1Iiwic2NvcGUiOlsic2VsZiJdLCJ1c2VyX2lkIjoiMTAzMjUzMzMiLCJpYXQiOjE1MjI5MDU4ODUsImV4cCI6MTUyNDIwMTg4NSwiYXVkIjoibXlkZXZpY2VzLmNheWVubmUucHJvZCIsImlzcyI6Im15ZGV2aWNlcy5hc2dhcmQucHJvZCIsImp0aSI6ImM1ZjEwY2Q5LTJmNWUtNDI3Mi1iZThlLWNlNmUwMjJjYTliNCJ9.LjL9U2R-amhDPQwlmrGWhW9yksLyEqmW9ZjRPv2tM8E";
  //+ apiAuthToken;

  // Get the request source (Google Assistant, Slack, API, etc) and initialize DialogflowApp
  const requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
  const app = new DialogflowApp({request: request, response: response});
  //var parsedData;
  
  var options = {
      host: 'platform.mydevices.com',
      path: '/v1.1/things'
  }
  
  var optionsChannel0 = {
    host: 'platform.mydevices.com',
    path: '/v1.1/telemetry/07f46230-3930-11e8-8d26-a9f2d7c18bc5/sensors/9bd8d660-3931-11e8-ab82-a3edb533e078/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };
  //9bd8d660-3931-11e8-ab82-a3edb533e078
  //^^^For channel 0

  var optionsChannel1 = {
    host: 'platform.mydevices.com',
    path: '/v1.1/telemetry/07f46230-3930-11e8-8d26-a9f2d7c18bc5/sensors/b783d090-3931-11e8-ab82-a3edb533e078/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };
  //b783d090-3931-11e8-ab82-a3edb533e078
  //^^^For channel 1

  var optionsChannel2 = {
    host: 'platform.mydevices.com',
    path: '/v1.1/telemetry/07f46230-3930-11e8-8d26-a9f2d7c18bc5/sensors/5bb68870-3931-11e8-ac80-85ded0fe5d33/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };
  //5bb68870-3931-11e8-ac80-85ded0fe5d33
  //^^^For channel 2

  var optionsChannel3 = {
    host: 'platform.mydevices.com',
    path: '/v1.1/telemetry/07f46230-3930-11e8-8d26-a9f2d7c18bc5/sensors/5e007870-3931-11e8-9beb-4d400e603e7e/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };
  //5e007870-3931-11e8-9beb-4d400e603e7e
  //^^^For channel 3

  var optionsChannel4 = {
    host: 'platform.mydevices.com',
    path: '/v1.1/telemetry/07f46230-3930-11e8-8d26-a9f2d7c18bc5/sensors/7ae467d0-3931-11e8-b59c-db84183bf26b/summaries?type=latest',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Version': '1.0'
    }
  };
  //7ae467d0-3931-11e8-b59c-db84183bf26b
  //^^^For channel 4

  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.welcome': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        sendGoogleResponse('Hello, Welcome to our Air Quality Sensor AI helper! How may I help you?'); // Send simple response to user
      } else {
        sendResponse('Hello, Welcome to our Air Quality Sensor AI helper! How may I help you?'); // Send simple response to user
      }
    },
    'input.air': () => { //Under Construction!!!
      //Model for what to change on others, in case you forget
      //Air will probably be a rating that you will want to give to the user
      if (requestSource === googleAssistantRequest) {
        https.get(optionsChannel1, (res) => { //change options to optionsChannelX
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
              if(parsedData.v < 1){ 
                //parsedData.v might need to be thrown into a calculator to tell us if the value is good or bad 
                sendGoogleResponse('Your home has an air quality of...'); 
              } else {
                sendGoogleResponse('Your home has an air quality of...Other');
              }  
          });
        }); //Repeat changes for the else case
      } else {
        https.get(optionsChannel1, (res) => {
            var rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              console.log(rawData);
              rawData = rawData.replace('[','');
              rawData = rawData.replace(']','');
              const parsedData = JSON.parse(rawData);
              console.log(parsedData);
              console.log(parsedData.v);
                if(parsedData.v < 1){
                  sendResponse('Your home has an air quality of...');
                } else {
                  sendResponse('Your home has an air quality of...Other');
                }
            });
          });
      }
    },
    'input.alcohol': () => { //Under Construction!!!
      //Model for what to change on others, in case you forget
      //Air will probably be a rating that you will want to give to the user
      if (requestSource === googleAssistantRequest) {
        https.get(optionsChannel1, (res) => { //change options to optionsChannelX
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
              if(parsedData.v > 1500){ 
                //parsedData.v might need to be thrown into a calculator to tell us if the value is good or bad 
                sendGoogleResponse('You have been drinking, be careful and don\'t drive'); 
              } else {
                sendGoogleResponse('You are sober!');
              }  
          });
        }); //Repeat changes for the else case
      } else {
        https.get(optionsChannel1, (res) => {
            var rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              console.log(rawData);
              rawData = rawData.replace('[','');
              rawData = rawData.replace(']','');
              const parsedData = JSON.parse(rawData);
              console.log(parsedData);
              console.log(parsedData.v);
                if(parsedData.v > 1500){
                  sendResponse('You have been drinking, be careful and don\'t drive');
                } else {
                  sendResponse('You are sober!');
                }
            });
          });
      }
    },
    'input.carbon': () => { //Under Construction!!!
      //Carbon will probably just be a boolean for safe/unsafe
       if (requestSource === googleAssistantRequest) {
        https.get(optionsChannel2, (res) => {
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
            if(parsedData.v > 7500){
              sendGoogleResponse('Your home has a dangerous amount of Carbon Monoxide!'); 
            } else {
              sendGoogleResponse('The level of Carbon Monoxide in your home is safe.');
            }  
          });
        });
      } else {
        https.get(optionsChannel2, (res) => {
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
            if(parsedData.v > 7500){
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
        https.get(optionsChannel1, (res) => {
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
            if(parsedData.v > 1){
              sendGoogleResponse('Your air is a tad dingy. Think about replacing your air filter.'); // Send simple response to user
            }else{
              sendGoogleResponse('Your air filter is fine, no need to replace it yet'); // Send simple response to user
            }  
          });
        });
      } else {
        https.get(optionsChannel1, (res) => {
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
            if(parsedData.v > 1){
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
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
            if(parsedData.v < 750){ // Needs to be changed!!!
              sendGoogleResponse('Your home is smoke free!'); // Send simple response to user
            }else{
              sendGoogleResponse('Your home is currently smoking. You should contact authorities!'); // Send simple response to user
            }
          });
        });
      } else {
        https.get(optionsChannel0, (res) => {
          var rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            console.log(rawData);
            rawData = rawData.replace('[','');
            rawData = rawData.replace(']','');
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log(parsedData.v);
            if(parsedData.v < 750){ // Needs to be changed!!!
              sendResponse('Your home is smoke free!'); // Send simple response to user
            }else{
              sendResponse('Your home is currently smoking. You should contact authorities!'); // Send simple response to user
            }
          });
        });
      }
    },
     'input.temp': () => { //Under Construction!!!
      //Will probably have to derive the temp from the combo sensor
      //Alternative, combine them
      https.get(optionsChannel3, (res) => {
        var rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData);
          rawData = rawData.replace('[','');
          rawData = rawData.replace(']','');
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          console.log(parsedData.v);
          //calculate the temp from the combo sensor reading 
          let temp = parsedData.v;
          if(requestSource === googleAssistantRequest){
            sendGoogleResponse('The current house temperature is: '+temp+' degrees Celcius.'); // Send simple response to user
          }else{
            sendResponse('The current house temperature is: '+temp+' degrees Celcius.');
          }    
        });
      });
    },
    'input.humidity': () => { //Under Construction!!!
      //Will probably have to derive the humidity from the combo sensor
      //Alternative, combine them
      https.get(optionsChannel4, (res) => {
        var rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData);
          rawData = rawData.replace('[','');
          rawData = rawData.replace(']','');
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          console.log(parsedData.v);
          //calculate the humidity from the combo sensor reading
          let humidity = parsedData.v;
          //let humidity = '22%';
          if(requestSource === googleAssistantRequest){
            sendGoogleResponse('The current house humidity is: '+humidity+' percent.'); // Send simple response to user
          }else{
            sendResponse('The current house humidity is: '+humidity+' percent.');
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
