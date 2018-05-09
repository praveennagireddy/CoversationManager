function botAuthentication() {
  //authentication process here
  this.authentication = function(inputparams, callback) {
    console.log('In authentication process :)');
    var result = true;
    callback(result);
  }
}
module.exports = botAuthentication;
