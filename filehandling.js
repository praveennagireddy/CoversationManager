function sendRequestObjectToFileHandling(input) {
  console.log('Log in filehandling file');
  try {
    // decode base64 blob/input value
    var decodeblob = new Buffer(input, 'base64')
    var finalstring = b.toString();
    // we need to do some processing to this blb file


  } catch (e) {
    console.log('Exception in filehandling :) ' + e);
  }
}
