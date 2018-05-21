var AWS = require('aws-sdk');
var inputparamsObject = {
   "messageVersion":"1.0",
   "invocationSource":"FulfillmentCodeHook",
   "userId":"0056F000005grDEQAY",
   "sessionAttributes":{
      "isFulfilled":"Fulfilled",
      "chatDescription":"Me:I want to know the activities of gluformin g\nMe:What is  of Gluformin G1 Forte\nMe:Dosage\nMe:Indication\nMe:Contra indication\nMe:Activity of gluformin g\nMe:What is  of Gluformin G1\nMe:What is  of Gluformin G1\nMe:What is  of Gluformin G1 Forte\nMe:I want to know the activity of neomercazole\nMe:April input of gluformin g\nMe:What is  of Gluformin G1\nMe:What is  of Gluformin G1 Forte\n",
      "currentBrand":"Gluformin G1",
      "employeeId":"0056F000005grDEQAY",
      "latestUserQuery":"Me:What is  of Gluformin G1\n",
      "empno":"730040",
      "someKey":"STRING_VALUE",
      "contextObject":{
         "contextVariable":[
            {
               "intentname":"brands",
               "slots":[
                  {
                     "slotname":"brandsinfo",
                     "value":null,
                     "time":1526709344006
                  },
                  {
                     "slotname":"brandspecification",
                     "value":null,
                     "time":1526709344007
                  },
                  {
                     "slotname":"brandspecificationTwo",
                     "value":null,
                     "time":1526709344007
                  },
                  {
                     "slotname":"brand",
                     "value":"gluformin g1 forte",
                     "time":1526709344007
                  },
                  {
                     "slotname":"brandspecificationThree",
                     "value":null,
                     "time":1526709344007
                  }
               ]
            }
         ]
      }
   },
   "requestAttributes":null,
   "bot":{
      "name":"Maya",
      "alias":"Maya_case",
      "version":"74"
   },
   "outputDialogMode":"Text",
   "currentIntent":{
      "name":"brands",
      "slots":{
         "brandsinfo":null,
         "brandspecification":null,
         "brandspecificationTwo":null,
         "brand":"gluformin g1 forte",
         "brandspecificationThree":null
      },
      "slotDetails":{
         "brandsinfo":{
            "resolutions":[

            ],
            "originalValue":null
         },
         "brandspecification":{
            "resolutions":[

            ],
            "originalValue":null
         },
         "brandspecificationTwo":{
            "resolutions":[

            ],
            "originalValue":null
         },
         "brand":{
            "resolutions":[
               {
                  "value":"Gluformin G1 Forte"
               }
            ],
            "originalValue":"gluformin g1 forte"
         },
         "brandspecificationThree":{
            "resolutions":[

            ],
            "originalValue":null
         }
      },
      "confirmationStatus":"None"
   },
   "inputTranscript":"what is  of gluformin g1 forte"
}


var contextObject = {};

function botrouter() {
    console.log('In botrouter function');

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:e73cb695-9300-46b3-96d1-f33ba6422509'
    });
    var lexruntime = new AWS.LexRuntime();
    this.sendFinalJSONToBotRouter = function(inputparams, callback) {
        console.log('In botRouter ::)' + JSON.stringify(inputparams) + '\n');
        var params = {
            botAlias: inputparams.botAlias,
            botName: inputparams.botName,
            inputText: inputparams.message.toLowerCase(),
            userId: inputparams.userId,
            sessionAttributes: inputparams.sessionAttributes
        };

        var resp = lexruntime.postText(params, function(err, data) {
            if (err) {
                console.log('Error in Lex :' + err);
                callback(err);
            } else {
                console.log('Response from lex ' + JSON.stringify(data));
                sendLamdaJSONToContextHandling(inputparamsObject);
                sendSlotsToNormalization(inputparamsObject.currentIntent.slots,function(callback1){

                });
                callback(data.message);
            }
        });
        //callback(result);
    }
}

//context handling process method
function sendLamdaJSONToContextHandling(inputparams) {
    console.log('In ContextHandling method inputparams are :' + JSON.stringify(inputparams));

    var intentName = inputparams.currentIntent.name;
    var slots = inputparams.currentIntent.slots;

    var slotnames  = [];
    var slotvalues  = [];
    var contextObjectstatus = isEmpty(contextObject);
    slotnames = Object.keys(slots);
    slotvalues =  Object.keys(slots).map((k) => slots[k])
    console.log('slotnames ' + slotnames + '\n' + 'slotvalues are :)' + slotvalues);

    var boolenValue = isEmpty(slots);
    console.log('boolenavalue is:)' + boolenValue);
    if (boolenValue == true) {
        // do Something
    } else {
        console.log('IN ELSE @@@');
        var slotsValueLength = Object.keys(slots).length;
        if (slotsValueLength > 0 && contextObjectstatus == true) {
            console.log('slotvalues length is :)' + slotsValueLength);
            //updateing slot values object
            updateSlotValuesInToContextObject(slots, slotnames, slotvalues, contextObject, intentName);
            console.log('Values of slotValue Object is :)' + JSON.stringify(contextObject));
        }
        // var sessionAttributesConetxtObject =  inputparamsObject.sessionAttributes.contextObject;
        // var boolenavalue  = isEmpty(sessionAttributesConetxtObject);
        // if(boolenValue == true){
        //   //do nothing
        // }else{
        //   checkSlotValuesAndUpdating(sessionAttributesConetxtObject,slotnames,slotvalues,intentName);
        // }
    }
}

// updating slot values
function updateSlotValuesInToContextObject(slots, namesarray, valuesarray, defaultSlotValueObject, intentName) {
  console.log('slots:)'+JSON.stringify(slots)+'\n'+'names rarray is:)'+namesarray+'\n'+'valuesarray is :)'+valuesarray+'context object is:'+JSON.stringify(defaultSlotValueObject));

    var isempty = isEmpty(slots);
    var slotslength = Object.keys(slots).length;
    var contextVariable = [];
    var intentObj = {};
    intentObj.intentname = intentName;
    intentObj.slots = [];

    for(var i = 0 ; i <=namesarray.length-1 ; i++ ){
      var slotObj = {};
      slotObj.slotname = namesarray[i];
      slotObj.value = valuesarray[i];
      slotObj.time = Date.now() ;
      intentObj.slots.push(slotObj);
    }
    contextObject.contextVariable = contextVariable
    contextVariable.push(intentObj);
    inputparamsObject.sessionAttributes.contextObject = contextObject;
    console.log('final lex Object is :)'+JSON.stringify(inputparamsObject));
        console.log('final Object is :)'+JSON.stringify(contextObject));
}



function checkSlotValuesAndUpdating(sessionObject,names,values,intentname){
  console.log('sessionObject is :)'+JSON.stringify(sessionObject));
  var sessionarray = [];
  var slotvalues  = [];
  var intentObj = {};
  intentObj.intentname = intentname;
  sessionarray = sessionObject.contextVariable;
  slotvalues = sessionObject.contextVariable[0].slots;
  console.log('slot values are :)'+slotvalues);
  console.log('length of sessionarray is :)'+sessionarray.length);
  for(var i=0;i<=sessionarray.length-1;i++){
    if(sessionarray[i].intentname == intentname){
      for(var j=0;j<slotvalues.length -1;j++){
        if(slotvalues[j].slotname == names[j]){
          // do nothing
        }else{
          var slotObj = {};
          slotObj.slotname = names[j];
          slotObj.value = values[j];
          slotObj.time = Date.now() ;
          slotvalues.push(slotObj);
        }

        sessionarray.push(intentObj);
        sessionObject.sessionarray =sessionarray;
        }
      }else{
        var slotObj = {};
        slotObj.slotname = names[i];
        slotObj.value = values[i];
        slotObj.time = Date.now() ;
        slotvalues.push(slotObj);

      }
    sessionarray.push(intentObj);
    sessionObject.sessionarray =sessionarray;
    }

    console.log('@@@@@@@@@@@@@@@@@@@@'+JSON.stringify(sessionObject));

  }

//normalisation process method
function sendSlotsToNormalization(slots,callback1){
  console.log('In Normailzation is :)');
// do Something

}
function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return true
    } else {
        return false;
    }
}

function isValid(input) {
    if (input != null && input != '' && input != undefined)
        return true;
    return false;
}
module.exports = botrouter;
