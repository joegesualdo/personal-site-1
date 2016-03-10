//Lets require/import the HTTP module
var http = require('http');
var fs = require("fs");

//Lets define a port we want to listen to
const PORT=8080; 

function getContentType(path) {
  var ext = path.split(".").pop()
  if (ext === "html") {
    return "text/html";
  }
  if (ext === "js") {
    return "application/javascript";
  }
  if (ext === "json") {
    return "application/json";
  }
  if (ext == "css") {
    return "text/css"
  }
  if (ext == "jpg" || ext === "jpeg") {
    return "image/jpeg"
  }
  if (ext == "svg") {
    return "image/svg+xml"
  }

  return "text/html";
}

function getFile(path){
  return fs.readFileSync(__dirname + "/public" + path)
}

//We need a function which handles requests and send response
function handleRequest(request, response){
  var content = "";

  try {
    content = getFile(request.url)

  } catch (e) {
    content = "404";
  }

  response.setHeader('Content-Type', getContentType(request.url))
  console.log("SERVER: Loaded: " + request.url)
  response.end(content);
}

function createServer() {
  server = http.createServer(handleRequest);
  server.listen(PORT, function(){
      //Callback triggered when server is successfully listening. Hurray!
      console.log("SERVER: Listening on: http://localhost:%s", PORT);
  });
}

module.exports = {
  createServer: createServer
}
