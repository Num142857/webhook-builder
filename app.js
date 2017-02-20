const http = require("http");
const spawn =require('child_process').spawn;
const createHandler = require("coding-webhook-handler");
const handler = createHandler({
    path: "/",
    token: "ds231212dsa"
});

http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end("no such location")
    })
    console.log("Hi!")
}).listen(7878);

const runCommand = (cmd, args, callback) => {
    const child = spawn(cmd, args);
    let response = "";
    child.stdout.on("data", buffer => response += buffer.toString());
    child.stdout.on("end", () => {
        callback(response)
    })
}

handler.on("error", (err) => {
    console.error('Error:', err.message)
})


handler.on('*', function (event) {
    console.log(event.event)
    console.log(event.payload)
    console.log(event.protocol)
    console.log(event.host)
    console.log(event.url)
})




handler.on("push", (event) => {
    console.log('event:', event.event);
    
    runCommand('sh', ['./auto_build.sh'], txt => {
        console.log(txt)
    })
})
