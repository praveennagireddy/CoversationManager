function processString() {
  var result = 'In preprocess';
  this.preProcessingString = function(inputparams) {
    console.log('In preProcessingString Method  :)');
    return result;
  }
}
module.exports = processString;
