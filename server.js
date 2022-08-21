const fetch = require('node-fetch');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.listen(process.env.PORT || 80, function () {
  //  var port = app.address().port;
  console.log("App now running on some port");
});
var success = true;
app.post("/api/incomingMsg", function (req, response) {
  var newMsg = req.body;
  console.log('request received:', req, newMsg);
  if (newMsg.group_id == "59549084") {
    if (newMsg.text.indexOf('Lucas') !== -1 && newMsg.sender_type !== 'bot') {
      console.log('found Lucas');
      var formData = {
        "bot_id": "b880562f84d27664eac33a6adc",
        "text": "Lucas is the Pope \n Wooooooooooooo!"
      };
      fetch('https://api.groupme.com/v3/bots/post', { method: 'POST', body: JSON.stringify(formData) })
      .then(res => {
        response.status(200).send("Successfully did something: " + JSON.stringify(res, null,2));
        console.log('Upload successful!  Server responded with:', JSON.stringify(res, null,2));
      });
      // now construct an https post and execute it against the groupme api with our bot's token, etc.
    }
  }
  if (newMsg.group_id == "56143399") {
    if (newMsg.text.toLowerCase().indexOf('flotsam') !== -1 && newMsg.sender_type !== "bot" && !success) {
      var formData = {
        "bot_id": "eb79a1ada561478cdfcda0335d",
        "text": "The winner is: " + newMsg.name + "!" + '\nAnd the word was "",  which means: floating wreckage of a ship or its cargo'
      };
      success = true;
      fetch('https://api.groupme.com/v3/bots/post', { method: 'POST', body: JSON.stringify(formData) })
      .then(res => {
        response.status(200).send("Successfully did something: " + JSON.stringify(res, null,2));
        console.log('Upload successful!  Server responded with:', JSON.stringify(res, null,2));
      });
    }
  }
  if (newMsg.group_id == "56143399" || newMsg.group_id == "85492636") {
    if (newMsg.text.toLowerCase().indexOf('cat') !== -1 && newMsg.sender_type !== "bot") {
      fetch('https://catfact.ninja/fact')
      .then(res => res.json()).then(body => {
        console.log('inside callback for cat');
        console.log(body);
        var formData = {
          "bot_id": "eb79a1ada561478cdfcda0335d",
          "text": body.fact
        };
        fetch('https://api.groupme.com/v3/bots/post', { method: 'POST', body: JSON.stringify(formData) })
        .then(res => {
          response.status(200).send("Successfully did something: " + JSON.stringify(res, null,2));
          console.log('Upload successful!  Server responded with:', JSON.stringify(res, null,2));
        });
      });
    }
  }
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

