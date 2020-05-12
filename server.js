var request = require("request")
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
app.listen(process.env.PORT || 80, function () {
   //  var port = app.address().port;
    console.log("App now running on some port");
  });
  
  app.post("/api/incomingMsg", function(req, res) {
    var newMsg = req.body;
    console.log('request received:', req, newMsg);
    if (newMsg.text.indexOf('Lucas') !== -1 && newMsg.sender_type !== 'bot') {
        console.log('found Lucas');
        var formData = {  "bot_id"  : "b880562f84d27664eac33a6adc",
        "text"    : "Lucas is the Pope \n Wooooooooooooo!"}
        request.post({url:'https://api.groupme.com/v3/bots/post', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
        // now construct an https post and execute it against the groupme api with our bot's token, etc.
    }
    res.status(201).json(newMsg);
});
//     app.get("/api/incomingMsg", function(req, res) {
//         var newMsg = req.body;
//         console.log('get request received:', req, newMsg);
//         // if (newMsg.indexOf('Lucas') !== -1) {
//         //     console.log('found Lucas');
//         //     // now construct an https post and execute it against the groupme api with our bot's token, etc.
//         // }
//         res.status(200).json('hello');
// });  		
// inconspicuous data: 835282 bot 835282
// {
// "attachments": [],
// "avatar_url": null,
// "created_at": 1589316839,
// "group_id": "59549084",
// "id": "158931683925385863",
// "name": "Test",
// "sender_id": "835282",
// "sender_type": "bot",
// "source_guid": "a06480f076c00138fd4a22000a8ccb7b",
// "system": false,
// "text": "Ethan you fool",
// "user_id": "835282"
// }

