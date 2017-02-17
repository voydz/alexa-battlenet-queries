var fs = require('fs')

var Docgen = function(alexaApp, config) {
  this.alexaApp = alexaApp
  this.config = config || {
    'schema_path': 'speechAssets/intentSchema.json',
    'utterances_path': 'speechAssets/SampleUtterances.txt'
  }
};

Docgen.prototype.generate = function() {
  this.saveSchema()
  this.saveUtterances()
}

Docgen.prototype.saveSchema = function() {
  var schema = this.alexaApp.schema()
  this.writeFile(this.config.schema_path, schema)
}

Docgen.prototype.saveUtterances = function() {
  var utterances = this.alexaApp.utterances()
  this.writeFile(this.config.utterances_path, utterances)
}

Docgen.prototype.writeFile = function(file, contents) {
  fs.writeFile(file, contents, (err) => {
    if (err) throw err;
    console.log('Wrote '+ contents.length +' bytes to \'' + file + '\' sucessfully.');
  })
}

module.exports = Docgen;
