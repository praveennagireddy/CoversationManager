/**
 * @swagger
 * /getsbresponse:
 *   post:
 *     tags:
 *       - Get SmartBot Response api
 *     description: give response to channel request
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "message"
 *         in: "path"
 *         description: "message send"
 *         required: true
 *         type: "string"
 *       - name: "botName"
 *         in: "path"
 *         description: "bot name"
 *         required: true
 *         type: "string"
 *       - name: "botAllias"
 *         in: "path"
 *         description: "bot version"
 *         required: true
 *         type: "string"
 *       - name: "userId"
 *         in: "path"
 *         description: "userId"
 *         required: true
 *         type: "string"
 *       - name: "sessionAttributes"
 *         in: "path"
 *         description: "sessionAttributes"
 *         required: true
 *         type: "Object"

 *     responses:
 *       200:
 *         description: An Object is returned
 *       404:
 *         	description: Authentication failed Please verify credentials
 *       202:
 *         	Something error in request object
 *       400:
 *         	description: Something went wrong
 */
