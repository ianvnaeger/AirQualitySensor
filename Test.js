var https = require('https');//let hello = require('hellojs/dist/hello.all.js');
var querystring = require('querystring');

const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests

var cayenneEmail = "ydypb@mail.missouri.edu";
var cayennePass = "Capstone08";
var apiAuthURL = "https://auth.mydevices.com/oauth/token";
var apiAuthHeaders = {
  "content-type" : "application/json"
};
var apiAuthData = {

};
var apiAuthToken = "";

var DATA_URL = "https://platform.mydevices.com/v1.1/telemetry/";
var DATA_HELPER1 = "/sensors/";
var DATA_HELPER2 = "/summaries?type=";
var DATA_SUMMARYTYPE = "latest";
var DATA_HEADER = "Authorization";
var DATA_HEADER_VALUE = "Bearer ";
var deviceID = "";
var sensorID = "";


exports.cayenneAuth = https.onRequest((request,response) => {
  //Get the Auth Token
  authRequest.requestHeaders = apiAuthHeaders;
  authRequest.url = apiAuthURL;
  
  authRequest = querystring.stringify({
    "grant_type":"password",
    "email": cayenneEmail,
    "password": cayennePass
  });

// An object of options to indicate where to post to
var post_options = {
    host: 'https://auth.mydevices.com',
    path: '/oauth/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer JWT_TOKEN',
        'X-API-Version': '1.0'
    }
};
/*
// Set up the request
var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});

// post the data
post_req.write(post_data);
post_req.end();
*/
  https.request(post_options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; }); 
    res.write(authRequest);
    res.on('end', () => {
        console.log(rawData);
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        apiAuthToken = parsedData.access_token;
    });
  });
});

exports.cayenneGetData = functions.https.onRequest((request,response) => {
  //GET all the active things on database

  //append all of the url stuff with the device and sensor IDs
  let URLConstructor = DATA_URL + deviceID + DATA_HELPER1 + sensorID + DATA_HELPER2 + DATA_SUMMARYTYPE;
  DATA_HEADER_VALUE = "Bearer " + apiAuthToken;
  //parse this data and give it to the logic below to figure out what Google should say
}); 
