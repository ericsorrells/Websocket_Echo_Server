const serverPort = process.env.PORT || 3001,
  express = require("express"),
  http = require("http"),
  WebSocket = require("ws"),
  app = express(),
  server = http.createServer(app),
  websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
  console.log('CONECTING')

  //when a message is received
  webSocketClient.on('message', (message) => {

    //for each websocket client
    websocketServer
      .clients
      .forEach(client => {
        //send the client the current message
        client.send(message);
      });
  });
});

//start the web server
server.listen(serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
});