function botrouter() {
  console.log('In botrouter function');
  this.sendFinalJSONToBotRouter = function(inputparams, callback) {
    app.post('/sendparamstolex', function(req, res) {
      //  call to send final json to lex
      
      }
    }
  }
  module.export = botrouter;
