var CharacterApi = require('./api/character');

var alexa = require("alexa-app");
var app = new alexa.app("wow-queries");

app.launch(function(request, response) {
  console.log('launch');
  response.say("Debuginformation, LaunchRequest entgegen genommen.");
});

app.sessionEnded(function(request, response) {
  console.log('shutdown');
  // cleanup the user's server-side session
  logout(request.userId);
  // no response required
});

app.intent("GetItemLevel", {
    "slots": {
      "Character": "LIST_OF_CHARS",
      "Realm": "LIST_OF_REALMS"
    },
    "utterances": [
      "wie ist das item level von {-|Character}",
      "wie ist das item level von {-|Character} auf {-|Realm}",
      "wie ist mein item level",
    ]
  },
  function(request, response) {
    console.log('item level intent');
    var character = request.slot("Character") || 'shards';
    var realm = request.slot("Realm") || 'alexstrasza';

    var api = new CharacterApi(CharacterApi.REGIONS.EU);
    return api.getItemLevel(realm, character, function (char) {
      if (char.error)
      {
        response.fail('Ich habe ein problem das battle net zu kontaktieren.');
        return;
      }

      response.say('Das item level von ' + character + ' auf ' + realm + ' ist ' + char.itemLevel +
        ' in den Taschen, und ' + char.equippedItemLevel + ' angelegt.');
    });
  }
);

module.exports = app;
