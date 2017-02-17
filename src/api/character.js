var axios = require('axios');

var Character = function(region) {
  this.bnet = axios.create({
    baseURL: 'https://' + region + '.api.battle.net/wow/character/',
    timeout: 5000,
  })
}

Character.REGIONS = {
  EU: 'eu',
  US: 'us'
}

Character.prototype.getItemLevel = function(realm, name, callback) {
  return this.bnet.get('/' + realm + '/' + name + '?fields=items&locale=' + process.env.API_LOCALE + '&apikey=' + process.env.API_KEY)
    .then((response) => {
      callback({
        itemLevel: response.data.items.averageItemLevel,
        equippedItemLevel: response.data.items.averageItemLevelEquipped
      })
    })
    .catch((error) => {
      callback({
        error: 'Error while requesting the battle net.'
      })
    })
}

module.exports = Character;
