var express = require('express');
var bodyparser = require('body-parser');
var filehandling = require('./filehandling.js');
var BotAuthentication = require('./botAuthentication.js');
var ProcessString = require('./preProcess.js');
var BotRouter = require('./botrouter.js');
var swaggerJSDoc = require('swagger-jsdoc');

var app = express();
////////////////////// CORS config//////////////////////////////////////////////
var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Accept,Content-Type');
    res.header('Access-Control-Allow-Credentials', true);

    next();
}
app.use(allowCrossDomain);
//////////////////////end of CORS config//////////////////////////////////////////////


///////////////////////////// swagger definition////////////////////////////////
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:8000',
    basePath: '/',
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./swaggerDoc.js']
};
var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
/////////////////////// end of swagger definition///////////////////////////////


var responseObject = {};
// for posting nested object if we have set extended true
app.use(bodyparser.urlencoded({
    extended: true
}));
// parsing JSON
app.use(bodyparser.json());
botAuthentication = new BotAuthentication();
processString = new ProcessString();
botrouter = new BotRouter();

console.log('Executing the server port :)');
app.post('/getsbresponse', function(req, res) {
    console.log('request params are :) ' + JSON.stringify(req.body) + '\n');
    try {
        if (!isEmpty(JSON.stringify(req.body))) {
            //check whether the input type is file or not
            if (req.body.inputtype == 'file') {
                var filehandlingresp = sendRequestObjectToFileHandling(req.body.message);
            } else {

                // if not file process here

                if (isValid(req.body.message)) {

                    // do authentication process

                    botAuthentication.authentication(req.body, function(callback) {
                        console.log('success of authentication is :) ' + JSON.stringify(callback));
                        // In success of  authentication ,next we will do pre-processig here
                        if (callback == true) {
                            var preprocessResult = processString.preProcessingString(req.body);
                            console.log('preprocessResult is ' + preprocessResult + '\n');
                            //preparing final json to send bot BotRouter
                            req.body.message = preprocessResult;
                            //method to send json to BotRouter
                            botrouter.sendFinalJSONToBotRouter(req.body, function(callback1) {
                                console.log('response  from botrouter :::: ' + JSON.stringify(callback1) + '\n');
                                res.send(callback1);
                            });

                        } else {

                            responseObject.statusCode = "404";
                            responseObject.messgae = "Authentication failed Please verify credentials";
                            responseObject.status = "Failed";
                            res.send(responseObject);
                        }
                    });
                }
            }
        } else {

            // return some error message  to channel
            console.log('else::::');
            responseObject.statusCode = "202";
            responseObject.messgae = "Something error in request object";
            responseObject.status = "Failed";
            res.send(responseObject);
        }

    } catch (exception) {

        // return some error message  to channel
        console.log('exception is::::' + exception);
        responseObject.statusCode = "400";
        responseObject.messgae = "Something went wrong";
        responseObject.status = "Failed";
        res.send(responseObject);
    }
});


var server = app.listen(8080, function() {
    console.log('Server Listening on port ' + server.address().port);
});

function isValid(input) {
    if (input != null && input != '' && input != undefined)
        return true;
    return false;
}


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
