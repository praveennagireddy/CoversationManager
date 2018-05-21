function processString() {
  var result = 'In preprocess';
  this.preProcessingString = function(inputparams) {
    console.log('In preProcessingString Method  :)'+JSON.stringify(inputparams.message)+'\n');
    return result;
  }
}
module.exports = processString;
